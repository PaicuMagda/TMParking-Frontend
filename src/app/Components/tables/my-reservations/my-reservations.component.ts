import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from 'src/app/interfaces/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss'],
})
export class MyReservationsComponent implements OnInit {
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
