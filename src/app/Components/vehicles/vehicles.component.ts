import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehiclesService) {}

  editVehicle(vehicle: Vehicle) {
    vehicle.isEdit = !vehicle.isEdit;
  }

  ngOnInit() {
    this.vehicles = this.vehicleService.vehicles;
  }
}
