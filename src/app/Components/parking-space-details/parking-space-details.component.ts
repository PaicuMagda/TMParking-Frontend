import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { ParkingSpaceBookingService } from 'src/app/services/parking-space-booking.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { PaymentMethods } from 'src/app/enums/payment-methods';
import { LeavePageDialogComponent } from '../dialogs/confirmation-dialogs/leave-page-dialog/leave-page-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';
import { ReservationsService } from 'src/app/services/reservations.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { ParkingLotInterface } from 'src/app/interfaces/parking-lot-interface';
import { ReservationsDialogComponent } from './reservations-dialog/reservations-dialog.component';

@Component({
  selector: 'app-parking-space-details',
  templateUrl: './parking-space-details.component.html',
  styleUrls: ['./parking-space-details.component.scss'],
})
export class ParkingSpaceDetailsComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  showSearch: boolean = false;
  parkingPlace: any;
  bookingType: string = 'day';
  startHour: number;
  endHour: number;
  hours: number[] = [];
  endHourIsSmaller: boolean;
  vehicles: Vehicle[] = [];
  vehiclesControl = new FormControl();
  filteredVehicles: Observable<Vehicle[]>;
  paymentMethods: string[] = [];
  calculatedPrice: number;
  months: number[] = [];
  month: number;
  idParkingSpaces: number;
  activatedRouter: any;
  reservations: any[];
  role: string = '';
  allParkingLotsForThisParking: ParkingLotInterface[] = [];

  constructor(
    private router: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private bookingService: ParkingSpaceBookingService,
    private vehicleService: VehiclesService,
    private dialog: MatDialog,
    private reservationsService: ReservationsService,
    private userStore: UserStoreService,
    private auth: AuthenticationService,
    private parkingSpacesService: ParkingPlacesService
  ) {}

  changeType(value: string) {
    this.bookingType = value;
  }

  populateHoursArray() {
    this.bookingService
      .getNumberArray()
      .pipe(takeUntil(this.destroy$))
      .subscribe((values) => {
        this.hours = values;
      });
  }

  openLeavePageDialog() {
    this.dialog.open(LeavePageDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
    });
  }

  openLocationDialog() {
    this.dialog.open(GoogleMapsComponent, {
      width: '50%',
      height: '60%',
    });
  }

  openReservationsDialog(parkingLotId: number) {
    this.dialog.open(ReservationsDialogComponent, {
      width: '30%',
      height: '90%',
      data: { parkingLotId },
    });
  }
  getParkingLots() {
    this.parkingSpacesService.getParkingLotsById(this.idParkingSpaces);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // checkEndHourIsSmaller() {
  //   // return this.endHour <= this.startHour;
  //   console.log(this.startHour);
  //   console.log(this.endHour);
  // }

  ngOnInit() {
    this.idParkingSpaces = this.router.snapshot.params['id'];

    this.activatedRoute.data
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: any) => {
        this.parkingPlace = value.parkingSpacesDetails;
      });

    this.populateHoursArray();
    this.paymentMethods = Object.values(PaymentMethods);
    this.bookingService
      .getNumberOfMonths()
      .pipe(takeUntil(this.destroy$))
      .subscribe((values) => {
        this.months = values;
      });

    this.vehicleService.vehicles$
      .pipe(takeUntil(this.destroy$))
      .subscribe((vehicles) => {
        this.vehicles = vehicles;
      });

    this.reservationsService.reservations$.subscribe((values) => {
      this.reservations = values;
    });

    this.userStore
      .getRoleFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      });

    this.getParkingLots();
    this.parkingSpacesService.parkingLotsForOneParkingSpace$.subscribe(
      (values) => {
        this.allParkingLotsForThisParking = values;
      }
    );
  }
}
