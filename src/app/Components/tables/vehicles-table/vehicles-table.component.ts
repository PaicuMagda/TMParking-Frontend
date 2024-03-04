import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { EnumVehiclesTables } from 'src/app/enums/enum-vehicles-tables';
import { MatTableDataSource } from '@angular/material/table';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.scss'],
})
export class VehiclesTableComponent implements OnInit, AfterViewInit {
  displayedColumnsVehicleTable: string[] = Object.values(EnumVehiclesTables);
  dataSource = new MatTableDataSource<Vehicle>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private vehicleService: VehiclesService) {}

  ngOnInit() {
    this.vehicleService.getAllVehicles().subscribe((values) => {
      const vehicleWithOwnerFullname = values.map((vehicle: Vehicle) => {
        return {
          ...vehicle,
          fullnameOwner:
            vehicle.vehicleOwner.firstName +
            ' ' +
            vehicle.vehicleOwner.lastName,
        };
      });
      this.dataSource.data = vehicleWithOwnerFullname;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
