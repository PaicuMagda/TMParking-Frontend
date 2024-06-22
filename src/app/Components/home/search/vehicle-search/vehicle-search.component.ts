import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DisplayCardsService } from 'src/app/services/display-cards.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.scss'],
})
export class VehicleSearchComponent implements OnInit {
  filterVehicleForm: FormGroup;
  initialVehicles: any[] = [];
  initialMyVehicles: any[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  role: string = '';
  idUserLogged: string = '';
  toggleValue = '';
  filters: any;

  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehiclesService,
    private displayCardsService: DisplayCardsService,
    private userStore: UserStoreService,
    private authenticationService: AuthenticationService
  ) {
    this.filterVehicleForm = this.formBuilder.group({
      model: [''],
      make: [''],
      color: [''],
      year: [''],
      owner: [''],
      vehicleIdentificationNumber: [''],
    });
  }

  ngOnInit(): void {
    this.userStore
      .getIdUserFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        let userIdFromToken = this.authenticationService.getUserIdFromToken();
        this.idUserLogged = val || userIdFromToken;
      });

    this.userStore
      .getRoleFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        const roleFromToken = this.authenticationService.getRoleFromToken();
        this.role = val || roleFromToken;
      });

    this.vehicleService.getVehicles().subscribe((values) => {
      this.initialVehicles = values;
    });

    this.vehicleService
      .getVehicleByUserId(this.idUserLogged)
      .subscribe((values) => {
        this.initialMyVehicles = values;
      });

    this.displayCardsService.toggleValueSubjectObservable.subscribe((value) => {
      this.toggleValue = value;
    });

    this.filterVehicleForm.valueChanges.subscribe((filters) => {
      this.filters = filters;
    });
  }

  applyFiltersAllVehicles() {
    let filteredVehicles = this.initialVehicles;
    if (this.filters.make) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.make?.toLowerCase().includes(this.filters.make.toLowerCase())
      );
    }
    if (this.filters.model) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.model?.toLowerCase().includes(this.filters.model.toLowerCase())
      );
    }
    if (this.filters.color) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.color?.toLowerCase().includes(this.filters.color.toLowerCase())
      );
    }

    if (this.filters.year && !isNaN(this.filters.year)) {
      const year = Number(this.filters.year);
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.year === year
      );
    }

    if (this.filters.owner) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.vehicleOwner
          ?.toLowerCase()
          .includes(this.filters.owner.toLowerCase())
      );
    }

    if (this.filters.vehicleIdentificationNumber) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.vehicleIdentificationNumber
          ?.toLowerCase()
          .includes(this.filters.vehicleIdentificationNumber.toLowerCase())
      );
    }
    this.vehicleService.updateVehicles(filteredVehicles);
  }

  applyFiltersMyVehicles() {
    let filteredVehicles = this.initialMyVehicles;
    if (this.filters.make) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.make?.toLowerCase().includes(this.filters.make.toLowerCase())
      );
    }
    if (this.filters.model) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.model?.toLowerCase().includes(this.filters.model.toLowerCase())
      );
    }
    if (this.filters.color) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.color?.toLowerCase().includes(this.filters.color.toLowerCase())
      );
    }

    if (this.filters.year && !isNaN(this.filters.year)) {
      const year = Number(this.filters.year);
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.year === year
      );
    }

    if (this.filters.owner) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.vehicleOwner
          ?.toLowerCase()
          .includes(this.filters.owner.toLowerCase())
      );
    }

    if (this.filters.vehicleIdentificationNumber) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.vehicleIdentificationNumber
          ?.toLowerCase()
          .includes(this.filters.vehicleIdentificationNumber.toLowerCase())
      );
    }
    this.vehicleService.updateMyVehicles(filteredVehicles);
  }

  applyFilters() {
    this.displayCardsService.toggleValueSubjectObservable.subscribe((value) => {
      if (value === 'allVehicles') {
        this.applyFiltersAllVehicles();
      } else {
        this.applyFiltersMyVehicles();
      }
    });
  }
}
