import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { EnumVehiclesTables } from 'src/app/enums/enum-vehicles-tables';
import { MatTableDataSource } from '@angular/material/table';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VehicleEditDialogComponent } from '../../dialogs/vehicle-edit-dialog/vehicle-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.scss'],
})
export class VehiclesTableComponent implements OnInit, AfterViewInit {
  displayedColumnsVehicleTable: string[] = Object.values(EnumVehiclesTables);
  dataSource = new MatTableDataSource<Vehicle>();
  private destroy$: Subject<void> = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private vehicleService: VehiclesService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((values: any) => {
      console.log(values);
    });
    this.activatedRoute.data
      .pipe(takeUntil(this.destroy$))
      .subscribe((values: any) => {
        const vehicleWithOwnerFullname = values.vehicles.map(
          (vehicle: Vehicle) => {
            return {
              ...vehicle,
              fullnameOwner:
                vehicle.vehicleOwner.firstName +
                ' ' +
                vehicle.vehicleOwner.lastName,
            };
          }
        );
        this.dataSource.data = vehicleWithOwnerFullname;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openEditVehicle(idVehicle: number) {
    this.vehicleService
      .getVehicleById(idVehicle)
      .pipe(takeUntil(this.destroy$))
      .subscribe((values) => {
        this.dialog.open(VehicleEditDialogComponent, {
          width: '40%',
          height: '98%',
          data: values,
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
