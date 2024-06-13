import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TimisoaraAreas } from 'src/app/interfaces/timisoara-areas';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DisplayCardsService } from 'src/app/services/display-cards.service';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-parking-space-search',
  templateUrl: './parking-space-search.component.html',
  styleUrls: ['./parking-space-search.component.scss'],
})
export class ParkingSpaceSearchComponent implements OnInit {
  constructor(
    private parkingSpacesService: ParkingPlacesService,
    private formBuilder: FormBuilder,
    private displayCardsService: DisplayCardsService,
    private authenticationService: AuthenticationService,
    private userStore: UserStoreService
  ) {
    this.parkingSpacesSearchForm = this.formBuilder.group({
      relatedTags: [[]],
      personalVehicle: [],
      agriculturalMachinery: [],
      isCargoVehicleAccepted: [],
      isPublicTransportAccepted: [],
      withPayment: [],
      paidParking: [],
      availableParkingSpaces: [],
      selectedDate: [],
    });
  }

  areas: TimisoaraAreas[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  initialAllParkingSpaces: any[] = [];
  initialMyParkingSpaces: any[] = [];
  parkingSpacesSearchForm: FormGroup;
  filters: any;
  toggleValue = '';
  idUserLogged: string = '';

  ngOnInit(): void {
    this.userStore.getIdUserFromStore().subscribe((val) => {
      let userIdFromToken = this.authenticationService.getUserIdFromToken();
      this.idUserLogged = val || userIdFromToken;
    });

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
      this.initialAllParkingSpaces = values;
    });

    this.parkingSpacesService
      .getMyParkingSpaces(this.idUserLogged)
      .subscribe((values) => {
        this.initialMyParkingSpaces = values;
      });

    this.parkingSpacesSearchForm.valueChanges.subscribe((filters) => {
      this.filters = filters;
    });
    this.displayCardsService.toggleValueSubjectObservable.subscribe((value) => {
      this.toggleValue = value;
    });
  }

  applyFiltersAllParkingSpaces() {
    let filteredParkingSpaces = this.initialAllParkingSpaces;

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

    if (this.filters.paidParking) {
      filteredParkingSpaces = filteredParkingSpaces.filter(
        (parking) => parking.paidParking !== this.filters.paidParking
      );
    }

    if (this.filters.withPayment) {
      filteredParkingSpaces = filteredParkingSpaces.filter(
        (parking) => parking.paidParking === this.filters.withPayment
      );
    }

    if (this.filters.selectedDate) {
      filteredParkingSpaces = filteredParkingSpaces.filter(
        (parking) =>
          new Date(parking.startDate).getTime() <=
            new Date(this.filters.selectedDate).getTime() &&
          new Date(parking.endDate).getTime() >=
            new Date(this.filters.selectedDate).getTime()
      );
    }

    if (this.filters.relatedTags.length > 0) {
      filteredParkingSpaces = filteredParkingSpaces.filter((parking) =>
        this.filters.relatedTags.includes(parking.area)
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

  applyFiltersMyParkingSpaces() {
    let filteredParkingSpaces = this.initialMyParkingSpaces;
    console.log(this.filters);
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

    if (this.filters.paidParking) {
      filteredParkingSpaces = filteredParkingSpaces.filter(
        (parking) => parking.paidParking !== this.filters.paidParking
      );
    }

    if (this.filters.withPayment) {
      filteredParkingSpaces = filteredParkingSpaces.filter(
        (parking) => parking.paidParking === this.filters.withPayment
      );
    }

    if (this.filters.selectedDate) {
      filteredParkingSpaces = filteredParkingSpaces.filter(
        (parking) =>
          new Date(parking.startDate).getTime() <=
            new Date(this.filters.selectedDate).getTime() &&
          new Date(parking.endDate).getTime() >=
            new Date(this.filters.selectedDate).getTime()
      );
    }

    if (this.filters.relatedTags.length > 0) {
      filteredParkingSpaces = filteredParkingSpaces.filter((parking) =>
        this.filters.relatedTags.includes(parking.area)
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
    this.parkingSpacesService.sendUpdateMydParkingSpace(filteredParkingSpaces);
  }

  isButtonAreaSelected(area: TimisoaraAreas): void {
    area.isSelected = !area.isSelected;
    const relatedTags = this.parkingSpacesSearchForm.value.relatedTags;
    if (area.isSelected) {
      if (!relatedTags.includes(area.name)) {
        relatedTags.push(area.name);
      }
    } else {
      const index = relatedTags.indexOf(area.name);
      if (index !== -1) {
        relatedTags.splice(index, 1);
      }
    }
    this.parkingSpacesSearchForm.patchValue({ relatedTags: relatedTags });
    if (this.toggleValue === 'allParkingSpaces')
      this.applyFiltersAllParkingSpaces();
    else this.applyFiltersMyParkingSpaces();
  }

  applyFilters() {
    this.displayCardsService.toggleValueSubjectObservable.subscribe((value) => {
      if (value === 'allParkingSpaces') {
        this.applyFiltersAllParkingSpaces();
      } else {
        this.applyFiltersMyParkingSpaces();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
