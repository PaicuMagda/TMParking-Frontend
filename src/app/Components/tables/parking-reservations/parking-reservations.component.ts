import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from 'src/app/interfaces/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-parking-reservations',
  templateUrl: './parking-reservations.component.html',
  styleUrls: ['./parking-reservations.component.scss'],
})
export class ParkingReservationsComponent implements OnInit {
  dataSource = new MatTableDataSource<Reservation>();

  displayedColumns: string[] = [
    'index',
    'customer',
    'provider',
    'parkingLot',
    'parkingSpace',
    'startDate',
    'endDate',
    'vehicleNumber',
  ];

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.getReservations().subscribe((values) => {
      this.dataSource.data = values;
    });
  }
}
