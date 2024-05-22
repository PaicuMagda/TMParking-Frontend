import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TimisoaraAreas } from 'src/app/interfaces/timisoara-areas';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';

@Component({
  selector: 'app-parking-space-search',
  templateUrl: './parking-space-search.component.html',
  styleUrls: ['./parking-space-search.component.scss'],
})
export class ParkingSpaceSearchComponent implements OnInit {
  constructor(
    private parkingSpacesService: ParkingPlacesService,
    private formBuilder: FormBuilder
  ) {
    this.parkingSpacesSearchForm = this.formBuilder.group({
      relatedTags: [''],
      personalVehicle: [],
      agriculturalMachinery: [],
      isCargoVehicleAccepted: [],
      isPublicTransportAccepted: [],
      withPayment: [],
      isFree: [],
      availableParkingSpaces: [],
      selectedDate: [],
    });
  }

  areas: TimisoaraAreas[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  initialParkingSpaces: any[] = [];
  parkingSpacesSearchForm: FormGroup;
  selectedArea: string;
  filters: any;

  ngOnInit(): void {
    this.parkingSpacesService
      .getTimisoaraAreas()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        data.forEach((area) => {
          area.isSelected = false;
        });
        this.areas = data;
      });
    this.parkingSpacesService.getParkingSpaces().subscribe((values) => {
      this.initialParkingSpaces = values;
    });

    this.parkingSpacesSearchForm.valueChanges.subscribe((filters) => {
      this.filters = filters;
    });
  }

  applyFilters() {
    let filteredParkingSpaces = this.initialParkingSpaces;
    if (this.filters.personalVehicle) {
      filteredParkingSpaces = filteredParkingSpaces.filter(
        (parking) =>
          parking.isPersonalVehicleAccepted === this.filters.personalVehicle
      );
    }

    if (this.filters.agriculturalMachinery) {
      filteredParkingSpaces = filteredParkingSpaces.filter(
        (parking) =>
          parking.isAgriculturalMachineryAccepted ===
          this.filters.agriculturalMachinery
      );
    }

    if (this.filters.isCargoVehicleAccepted) {
      filteredParkingSpaces = filteredParkingSpaces.filter(
        (parking) =>
          parking.isCargoVehicleAccepted === this.filters.isCargoVehicleAccepted
      );
    }

    if (this.filters.isPublicTransportAccepted) {
      filteredParkingSpaces = filteredParkingSpaces.filter(
        (parking) =>
          parking.isPublicTransportAccepted ===
          this.filters.isPublicTransportAccepted
      );
    }

    if (this.filters.isFree) {
      filteredParkingSpaces = filteredParkingSpaces.filter(
        (parking) => parking.isFree === this.filters.isFree
      );
    }

    if (this.filters.withPayment) {
      filteredParkingSpaces = filteredParkingSpaces.filter(
        (parking) => parking.date !== this.filters.withPayment
      );
    }

    if (this.filters.selectedDate) {
      filteredParkingSpaces = filteredParkingSpaces.filter(
        (parking) =>
          new Date(parking.startDate).getDate() <=
            new Date(this.filters.selectedDate).getDate() &&
          new Date(parking.endDate).getDate() >=
            new Date(this.filters.selectedDate).getDate()
      );
    }

    if (
      this.filters.availableParkingSpaces &&
      !isNaN(this.filters.availableParkingSpaces)
    ) {
      const availableParkingSpaces = Number(
        this.filters.availableParkingSpaces
      );
      filteredParkingSpaces = filteredParkingSpaces.filter(
        (parkingLot) =>
          parkingLot.availableParkingSpaces >= availableParkingSpaces
      );
    }

    this.parkingSpacesService.sendUpdatedParkingSpace(filteredParkingSpaces);
  }

  isButtonAreaSelected(area: TimisoaraAreas): void {
    area.isSelected = !area.isSelected;
    this.selectedArea = area.name;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
