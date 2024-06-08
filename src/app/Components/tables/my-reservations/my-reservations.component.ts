import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from 'src/app/interfaces/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteReservationConfirmationDialogComponent } from '../../dialogs/confirmation-dialogs/delete-reservation-confirmation-dialog/delete-reservation-confirmation-dialog.component';
import { Subject, takeUntil } from 'rxjs';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss'],
})
export class MyReservationsComponent implements OnInit {
  dataSource = new MatTableDataSource<Reservation>();
  userId: number;
  private destroy$: Subject<void> = new Subject<void>();
  values: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'index',
    'vehicleOwner',
    'providerParkingSpace',
    'parkingSpaceName',
    'parkingLotName',
    'startDate',
    'endDate',
    'vehicleRegisteredNumber',
    'settings',
  ];

  constructor(
    private reservationsService: ReservationsService,
    private dialog: MatDialog,
    private userStore: UserStoreService,
    private auth: AuthenticationService
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
        userId: this.userId,
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.userStore
      .getIdUserFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        let userIdFromToken = this.auth.getUserIdFromToken();
        this.userId = userIdFromToken || val;
      });

    this.reservationsService
      .getReservationsByUserId(this.userId)
      .subscribe((values) => {
        this.reservationsService.updateMyReservations(values);
      });
    this.reservationsService.myReservations$.subscribe(
      (values) => (this.dataSource.data = values)
    );
  }
}
