import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ParkingSpace } from 'src/app/interfaces/parking-space';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-reservations-dialog',
  templateUrl: './reservations-dialog.component.html',
  styleUrls: ['./reservations-dialog.component.scss'],
})
export class ReservationsDialogComponent implements OnInit {
  constructor(
    private reservationsService: ReservationsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  parkingSpacesDisplayedColumns: string[] = ['number', 'startTime', 'endDate'];
  dataSource = new MatTableDataSource<ParkingSpace>();
  reservations: any[] = [];

  getReservations() {
    this.reservationsService
      .getReservationsByLotId(this.data.parkingLotId)
      .subscribe((values) => {
        this.dataSource = values;
      });
  }

  ngOnInit(): void {
    this.getReservations();
  }
}
