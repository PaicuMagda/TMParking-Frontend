import { Component } from '@angular/core';
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
  ) {
    // this.filteredVehicles = this.vehiclesControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this.filter(value))
    // );
  }

  // filter(value: string): Vehicle[] {
  //   const filterValue = value.toLowerCase();
  //   return this.vehicles.filter(
  //     (vehicle) =>
  //       vehicle.vehicleIdentificationNumber !== undefined &&
  //       vehicle.vehicleIdentificationNumber.toString().includes(filterValue)
  //   );
  // }

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
      vehicleRegistrationNumber: this.oneDayBookingFormGroup.get(
        'vehicleRegistrationNumber'
      )?.value,
      spaceModelName: this.oneDayBookingFormGroup.get('spaceModelName')?.value,
      paymentMethod: this.oneDayBookingFormGroup.get('paymentMethod')?.value,
      priceToPay: this.oneDayBookingFormGroup.get('totalToPay')?.value,
      reservationType: this.bookingType,
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
  }

  registerReservationForManyDay() {
    const formData = {
      startDate: this.manyDaysBookingFormGroup.get('startDate')?.value,
      vehicleRegistrationNumber: this.manyDaysBookingFormGroup.get(
        'vehicleRegistrationNumber'
      )?.value,
      spaceModelName:
        this.manyDaysBookingFormGroup.get('spaceModelName')?.value,
      paymentMethod: this.manyDaysBookingFormGroup.get('paymentMethod')?.value,
      priceToPay: this.manyDaysBookingFormGroup.get('totalToPay')?.value,
      reservationType: this.bookingType,
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
  }

  registerSubscriptionReservation() {
    const formData = {
      startDate: this.subscriptionBookingForm.get('startDate')?.value,
      spaceModelName: this.subscriptionBookingForm.get('spaceModelName')?.value,
      priceToPay: this.subscriptionBookingForm.get('totalToPay')?.value,
      reservationType: this.bookingType,
      numberOfMonths: this.subscriptionBookingForm.get('numberOfMonths')?.value,
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

    this.reservationsService.getReservations().subscribe((values) => {
      this.reservations = values;
    });

    this.userStore
      .getRoleFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      });

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
    });
  }
}
