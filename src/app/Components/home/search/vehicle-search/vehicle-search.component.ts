import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.scss'],
})
export class VehicleSearchComponent implements OnInit {
  filterVehicleForm: FormGroup;
  initialVehicles: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehiclesService
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
    this.vehicleService.getVehicles().subscribe((values) => {
      this.initialVehicles = values;
    });

    this.filterVehicleForm.valueChanges.subscribe((filters) => {
      this.applyFilters(filters);
    });
  }

  applyFilters(filters: any) {
    let filteredVehicles = this.initialVehicles;
    if (filters.make) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.make?.toLowerCase().includes(filters.make.toLowerCase())
      );
    }
    if (filters.model) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.model?.toLowerCase().includes(filters.model.toLowerCase())
      );
    }
    if (filters.color) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.color?.toLowerCase().includes(filters.color.toLowerCase())
      );
    }

    if (filters.year && !isNaN(filters.year)) {
      const year = Number(filters.year);
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.year === year
      );
    }

    if (filters.owner) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.vehicleOwner
          ?.toLowerCase()
          .includes(filters.owner.toLowerCase())
      );
    }

    if (filters.vehicleIdentificationNumber) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.vehicleIdentificationNumber
          ?.toLowerCase()
          .includes(filters.vehicleIdentificationNumber.toLowerCase())
      );
    }
    this.vehicleService.updateVehicles(filteredVehicles);
  }
}
