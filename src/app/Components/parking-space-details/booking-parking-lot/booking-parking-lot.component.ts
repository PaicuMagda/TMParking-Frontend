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

@Component({
  selector: 'app-booking-parking-lot',
  templateUrl: './booking-parking-lot.component.html',
  styleUrls: ['./booking-parking-lot.component.scss'],
})
export class BookingParkingLotComponent {
  private destroy$: Subject<void> = new Subject<void>();
  showSearch: boolean = false;
  parkingPlace: any;
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
  activatedRouter: any;
  reservations: any[];
  role: string = '';
  oneDayBookingFormGroup: FormGroup;
  manyDaysBookingFormGroup: FormGroup;
  subscriptionBookingForm: FormGroup;
  @Input() allParkingLotsForThisParking: ParkingLotInterface[];
  userId: number;
  startHour: string;
  endHour: string;
  startDate: Date;
  startDateFromPlace: Date;

  constructor(
    private router: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private bookingService: ParkingSpaceBookingService,
    private vehicleService: VehiclesService,
    private dialog: MatDialog,
    private reservationsService: ReservationsService,
    private userStore: UserStoreService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private toast: NgToastService
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
    this.dialog.open(GoogleMapsComponent, {
      width: '50%',
      height: '60%',
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  registerReservationForOneDay() {
    const formData = {
      startDate: this.oneDayBookingFormGroup.get('startDate')?.value,
      endDate: this.oneDayBookingFormGroup.get('startDate')?.value,
      vehicleRegistrationNumber: this.oneDayBookingFormGroup.get(
        'vehicleRegistrationNumber'
      )?.value,
      spaceModelName: this.oneDayBookingFormGroup.get('spaceModelName')?.value,
      paymentMethod: this.oneDayBookingFormGroup.get('paymentMethod')?.value,
      priceToPay: this.oneDayBookingFormGroup.get('totalToPay')?.value,
      reservationType: this.bookingType,
      bigParkingSpacesId: this.idParkingSpaces,
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
      bigParkingSpacesId: this.idParkingSpaces,
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
      bigParkingSpacesId: this.idParkingSpaces,
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

  isIcorectStartDate(): boolean {
    const selectedStartDate = new Date(
      this.oneDayBookingFormGroup.get('startDate')?.value
    );
    const bigParkingEndDate = new Date(this.parkingPlace.endDate);
    const bigParkingStartDate = new Date(this.startDateFromPlace);

    return (
      selectedStartDate.getTime() <= bigParkingStartDate.getTime() ||
      selectedStartDate.getTime() > bigParkingEndDate.getTime()
    );
  }

  errorAppears() {
    this.isIcorectStartDate();
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
    this.idParkingSpaces = this.router.snapshot.params['id'];
    this.activatedRoute.data
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: any) => {
        this.parkingPlace = value.parkingSpacesDetails;
        this.startDateFromPlace = value.parkingSpacesDetails.startDate;
      });
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
      startHour: [''],
      endHour: [''],
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
