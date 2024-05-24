import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ParkingSpaceBookingService } from 'src/app/services/parking-space-booking.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { GoogleMapsComponent } from '../../google-maps/google-maps.component';
import { PaymentMethods } from 'src/app/enums/payment-methods';
import { NgToastService } from 'ng-angular-popup';
import { ParkingLotInterface } from 'src/app/interfaces/parking-lot-interface';
import { PaymentDialogComponent } from '../../dialogs/payment-dialog/payment-dialog.component';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';

@Component({
  selector: 'app-booking-parking-lot',
  templateUrl: './booking-parking-lot.component.html',
  styleUrls: ['./booking-parking-lot.component.scss'],
})
export class BookingParkingLotComponent {
  private destroy$: Subject<void> = new Subject<void>();
  showSearch: boolean = false;
  bookingType: string = 'oneDay';
  hours: number[] = [];
  endHourIsSmaller: boolean;
  vehicles: Vehicle[] = [];
  vehiclesControl = new FormControl();
  filteredVehicles: Observable<Vehicle[]>;
  paymentMethods: string[] = [];
  calculatedPrice: number;
  months: number[] = [];
  idParkingSpaces: number;
  reservations: any[];
  role: string = '';
  oneDayBookingFormGroup: FormGroup;
  manyDaysBookingFormGroup: FormGroup;
  subscriptionBookingForm: FormGroup;
  @Input() allParkingLotsForThisParking: ParkingLotInterface[];
  userId: number;
  address: string = '';

  constructor(
    private activatedRouter: ActivatedRoute,
    private bookingService: ParkingSpaceBookingService,
    private vehicleService: VehiclesService,
    private dialog: MatDialog,
    private reservationsService: ReservationsService,
    private userStore: UserStoreService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private parkingSpaces: ParkingPlacesService
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

  openLocationDialog() {
    this.parkingSpaces
      .getParkingSpacesById(this.idParkingSpaces)
      .subscribe((result) => {
        this.address = result.address;

        this.dialog.open(GoogleMapsComponent, {
          width: '80%',
          height: '100%',
          data: {
            address: this.address,
          },
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  registerReservationForOneDay() {
    const formData = {
      startDate: this.oneDayBookingFormGroup.get('startDate')?.value,
      vehicleRegistrationNumber: this.oneDayBookingFormGroup.get(
        'vehicleRegistrationNumber'
      )?.value,
      spaceModelName: this.oneDayBookingFormGroup.get('spaceModelName')?.value,
      paymentMethod: this.oneDayBookingFormGroup.get('paymentMethod')?.value,
      priceToPay: this.oneDayBookingFormGroup.get('totalToPay')?.value,
      reservationType: this.bookingType,
      parkingSpacesId: this.idParkingSpaces,
    };

    this.reservationsService
      .registerReservation(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp) => {
          this.toast.info({
            detail: 'Info Message',
            summary: resp.message,
            duration: 3000,
          });
        },
        error: (err) => ({
          summary: err.message,
          duration: 3000,
          detail: 'Error Message',
        }),
      });
    this.oneDayBookingFormGroup.reset();
    this.reservationsService.loadReservations();
  }

  registerReservationForManyDay() {
    const formData = {
      startDate: this.manyDaysBookingFormGroup.get('startDate')?.value,
      endDate: this.manyDaysBookingFormGroup.get('endDate')?.value,
      vehicleRegistrationNumber: this.manyDaysBookingFormGroup.get(
        'vehicleRegistrationNumber'
      )?.value,
      spaceModelName:
        this.manyDaysBookingFormGroup.get('spaceModelName')?.value,
      paymentMethod: this.manyDaysBookingFormGroup.get('paymentMethod')?.value,
      priceToPay: this.manyDaysBookingFormGroup.get('totalToPay')?.value,
      reservationType: this.bookingType,
      parkingSpacesId: this.idParkingSpaces,
    };

    this.reservationsService
      .registerReservation(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp) => {
          this.toast.info({
            detail: 'Info Message',
            summary: resp.message,
            duration: 3000,
          });
        },
        error: (err) => ({
          summary: err.message,
          duration: 3000,
          detail: 'Error Message',
        }),
      });
    this.manyDaysBookingFormGroup.reset();
    this.reservationsService.loadReservations();
  }

  registerSubscriptionReservation() {
    const formData = {
      priceToPay: this.subscriptionBookingForm.get('totalToPay')?.value,
      reservationType: this.bookingType,
      spaceModelName: this.subscriptionBookingForm.get('spaceModelName')?.value,
      startDate: this.subscriptionBookingForm.get('startDate')?.value,
      vehicleRegistrationNumber: this.subscriptionBookingForm.get(
        'vehicleRegistrationNumber'
      )?.value,
      numberOfMonths: this.subscriptionBookingForm.get('numberOfMonths')?.value,
      parkingSpacesId: this.idParkingSpaces,
    };

    this.reservationsService
      .registerReservation(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp) => {
          this.toast.info({
            detail: 'Info Message',
            summary: resp.message,
            duration: 3000,
          });
        },
        error: (err) => ({
          summary: err.message,
          duration: 3000,
          detail: 'Error Message',
        }),
      });
    this.subscriptionBookingForm.reset();
    this.reservationsService.loadReservations();
  }

  registerReservation(bookingType: string) {
    if (bookingType == 'oneDay') {
      this.registerReservationForOneDay();
    } else if (bookingType == 'subscription') {
      this.registerSubscriptionReservation();
    } else {
      this.registerReservationForManyDay();
    }
  }

  // checkEndHourIsSmaller() {
  //   // return this.endHour <= this.startHour;
  //   console.log(this.startHour);
  //   console.log(this.endHour);
  // }

  openPaymentDialog() {
    this.dialog.open(PaymentDialogComponent, {
      width: '40%',
      height: '98%',
      data: this.returnValueToPay(),
    });
  }

  returnValueToPay(): number {
    if (this.bookingType === 'oneDay') {
      return this.oneDayBookingFormGroup.get('totalToPay')?.value;
    } else if (this.bookingType === 'manyDays') {
      return this.manyDaysBookingFormGroup.get('totalToPay')?.value;
    } else return this.subscriptionBookingForm.get('totalToPay')?.value;
  }

  ngOnInit() {
    this.idParkingSpaces = this.activatedRouter.snapshot.params['id'];
    this.populateHoursArray();
    this.paymentMethods = Object.values(PaymentMethods);
    this.bookingService
      .getNumberOfMonths()
      .pipe(takeUntil(this.destroy$))
      .subscribe((values) => {
        this.months = values;
      });

    this.userStore
      .getRoleFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      });

    this.userStore
      .getIdUserFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        let userIdFromToken = this.auth.getUserIdFromToken();
        this.userId = userIdFromToken || val;
      });

    this.vehicleService.getVehicleByUserId(this.userId);
    this.vehicleService.myVehicles$.subscribe(
      (vehicles) => (this.vehicles = vehicles)
    );

    this.oneDayBookingFormGroup = this.formBuilder.group({
      startDate: ['', Validators.required],
      vehicleRegistrationNumber: [''],
      spaceModelName: [''],
      paymentMethod: [''],
      totalToPay: [''],
    });

    this.manyDaysBookingFormGroup = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      vehicleRegistrationNumber: [''],
      spaceModelName: [''],
      paymentMethod: [''],
      totalToPay: [''],
    });

    this.subscriptionBookingForm = this.formBuilder.group({
      startDate: [''],
      numberOfMonths: [''],
      spaceModelName: [''],
      totalToPay: [''],
      vehicleRegistrationNumber: [''],
    });
  }
}
