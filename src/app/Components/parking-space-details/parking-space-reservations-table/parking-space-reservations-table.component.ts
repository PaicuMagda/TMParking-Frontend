import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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
  parkingSpaceId: number;
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

  constructor(
    private reservationsService: ReservationsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.parkingSpaceId = this.router.snapshot.params['id'];

    this.reservationsService.getReservationsByParkingId(this.parkingSpaceId);
    this.reservationsService.reservationsForOneParking$.subscribe(
      (parkingForOneParkingSpace) => {
        this.dataSource.data = parkingForOneParkingSpace;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
