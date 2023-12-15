import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { EnumVehiclesTables } from 'src/app/enums/enum-vehicles-tables';
import { MatTableDataSource } from '@angular/material/table';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.scss'],
})
export class VehiclesTableComponent implements OnInit {
  displayedColumnsVehicleTable: string[] = Object.values(EnumVehiclesTables);
  dataSource = new MatTableDataSource<Vehicle>([]);

  constructor(private vehicleService: VehiclesService) {}

  ngOnInit() {
    this.dataSource.data = this.vehicleService.vehicles;
  }
}
