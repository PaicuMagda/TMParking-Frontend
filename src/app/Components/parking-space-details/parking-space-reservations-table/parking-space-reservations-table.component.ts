import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from 'src/app/interfaces/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-parking-space-reservations-table',
  templateUrl: './parking-space-reservations-table.component.html',
  styleUrls: ['./parking-space-reservations-table.component.scss'],
})
export class ParkingSpaceReservationsTableComponent implements OnInit {
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
  ];

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.getReservations().subscribe((values) => {
      this.dataSource.data = values;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
