import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from 'src/app/interfaces/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';
import { DeleteParkingSpacesConfirmationDialogComponent } from '../../dialogs/confirmation-dialogs/delete-parking-spaces-confirmation-dialog/delete-parking-spaces-confirmation-dialog/delete-parking-spaces-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../dialogs/confirmation-dialogs/delete-vehicle-confirmation-dialog/delete-confirmation-dialog.component';
import { DeleteReservationConfirmationDialogComponent } from '../../dialogs/confirmation-dialogs/delete-reservation-confirmation-dialog/delete-reservation-confirmation-dialog.component';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss'],
})
export class MyReservationsComponent implements OnInit {
  dataSource = new MatTableDataSource<Reservation>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'index',
    'vehicleOwner',
    'providerParkingSpace',
    'parkingSpaceName',
    'parkingLotName',
    'startTime',
    'endTime',
    'vehicleRegisteredNumber',
    'settings',
  ];

  constructor(
    private reservationsService: ReservationsService,
    private dialog: MatDialog
  ) {}

  openDeleteConfirmDialog(reservationId: number) {
    this.dialog.open(DeleteReservationConfirmationDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
      data: {
        message: 'Are you sure you want to delete this parking spaces ?',
        reservationId: reservationId,
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.reservationsService.reservations$.subscribe((values) => {
      this.dataSource.data = values;
    });
  }
}
