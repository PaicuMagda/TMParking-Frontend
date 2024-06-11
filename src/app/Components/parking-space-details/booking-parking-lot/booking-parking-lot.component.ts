import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
  @Input() allParkingLotsForThisParking: ParkingLotInterface[];
  parkingPlace: any;
  bookingType: string = 'oneDay';
  vehicles: Vehicle[] = [];
  paymentMethods: string[] = [];
  months: number[] = [];
  idParkingSpaces: number;
  reservations: any[];
  role: string = '';
  oneDayBookingFormGroup: FormGroup;
  manyDaysBookingFormGroup: FormGroup;
  subscriptionBookingForm: FormGroup;
  userId: number;
  startHour: string;
  endHour: string;
  startDate: Date;
  startDateFromPlace: Date;
  address: string = '';
  totalPayment: number;
  paymentMethod: string = '';
  paymentForSubscription: number;
  paymentPerDay: number;
  paymentPerHour: number;
  numberOfMonths: number;
  subscriptionEndDate: Date;

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
    private parkingSpacesService: ParkingPlacesService
  ) {}

  changeType(value: string) {
    this.bookingType = value;
  }

  calculateTotalToPayForSubscription(month: number): void {
    if (month) {
      this.totalPayment = month * this.paymentForSubscription;
    } else {
      this.totalPayment = 0;
    }
  }

  isLastDate() {
    const currentDate = new Date();
    const startDateForOneDay = new Date(
      this.oneDayBookingFormGroup.get('startDate')?.value
    );
    const startDateForManyDays = new Date(
      this.manyDaysBookingFormGroup.get('startDate')?.value
    );
    const startDateForSubscription = new Date(
      this.subscriptionBookingForm.get('startDate')?.value
    );
    return (
      startDateForOneDay < currentDate ||
      startDateForManyDays < currentDate ||
      startDateForSubscription < currentDate
    );
  }

  getParkingLots() {
    this.parkingSpacesService.getParkingLotsById(this.idParkingSpaces);
  }

  openLocationDialog() {
    this.parkingSpacesService
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
    const startDate = this.oneDayBookingFormGroup.get('startDate')?.value;
    const startTime = this.oneDayBookingFormGroup.get('startHour')?.value;
    const endTime = this.oneDayBookingFormGroup.get('endHour')?.value;
    const endDate = this.oneDayBookingFormGroup.get('startDate')?.value;

    const [startHours, startMinutes] = startTime.split(':');
    const startDateToSend = new Date(startDate);
    startDateToSend.setHours(
      parseInt(startHours, 10),
      parseInt(startMinutes, 10)
    );
    const startTimezoneOffset = startDateToSend.getTimezoneOffset() * 60000;
    const localStartDate = new Date(
      startDateToSend.getTime() - startTimezoneOffset
    );

    const [endHours, endMinutes] = endTime.split(':');
    const endDateToSend = new Date(endDate);
    endDateToSend.setHours(parseInt(endHours, 10), parseInt(endMinutes, 10));
    const endTimezoneOffset = endDateToSend.getTimezoneOffset() * 60000;
    const localEndDate = new Date(endDateToSend.getTime() - endTimezoneOffset);

    const formData = {
      startDate: localStartDate,
      endDate: localEndDate,
      vehicleRegistrationNumber: this.oneDayBookingFormGroup.get(
        'vehicleRegistrationNumber'
      )?.value,
      spaceModelName: this.oneDayBookingFormGroup.get('spaceModelName')?.value,
      paymentMethod: this.oneDayBookingFormGroup.get('paymentMethod')?.value,
      priceToPay: this.oneDayBookingFormGroup.get('totalToPay')?.value,
      reservationType: this.bookingType,
      bigParkingSpacesId: this.idParkingSpaces,
      userId: this.userId,
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
          this.getParkingLots();
          this.reservationsService
            .getReservationsByUserId(this.userId)
            .subscribe((values) => {
              this.reservationsService.updateMyReservations(values);
            });
        },
        error: (error) => {
          this.toast.warning({
            detail: 'Warning',
            summary: 'This time slot is already booked.',
            duration: 3000,
          });
        },
      });
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
      userId: this.userId,
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
          this.getParkingLots();
          this.reservationsService
            .getReservationsByUserId(this.userId)
            .subscribe((values) => {
              this.reservationsService.updateMyReservations(values);
            });
        },
        error: (error) => {
          this.toast.warning({
            detail: 'Warning',
            summary: 'This time slot is already booked.',
            duration: 3000,
          });
        },
      });

    this.reservationsService.loadReservations();
  }

  registerSubscriptionReservation() {
    const formData = {
      priceToPay: this.subscriptionBookingForm.get('totalToPay')?.value,
      reservationType: this.bookingType,
      spaceModelName: this.subscriptionBookingForm.get('spaceModelName')?.value,
      startDate: this.subscriptionBookingForm.get('startDate')?.value,
      endDate: this.subscriptionEndDate,
      vehicleRegistrationNumber: this.subscriptionBookingForm.get(
        'vehicleRegistrationNumber'
      )?.value,
      numberOfMonths: this.subscriptionBookingForm.get('numberOfMonths')?.value,
      bigParkingSpacesId: this.idParkingSpaces,
      userId: this.userId,
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
          this.getParkingLots();
          this.reservationsService
            .getReservationsByUserId(this.userId)
            .subscribe((values) => {
              this.reservationsService.updateMyReservations(values);
            });
        },
        error: (error) => {
          this.toast.warning({
            detail: 'Warning',
            summary: 'This time slot is already booked.',
            duration: 3000,
          });
        },
      });
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

  isIcorectSelectedDateOneDay(): boolean {
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

  isIcorectSelectedDateManyDays(): boolean {
    const selectedStartDate = new Date(
      this.manyDaysBookingFormGroup.get('startDate')?.value
    );
    const selectedEndDate = new Date(this.subscriptionEndDate);
    const bigParkingEndDate = new Date(this.parkingPlace.endDate);
    const bigParkingStartDate = new Date(this.startDateFromPlace);

    return (
      selectedStartDate.getTime() < bigParkingStartDate.getTime() ||
      selectedStartDate.getTime() > bigParkingEndDate.getTime() ||
      selectedEndDate.getTime() <= bigParkingStartDate.getTime() ||
      selectedEndDate.getTime() > bigParkingEndDate.getTime()
    );
  }

  isIcorectSelectedDateSubscription(): boolean {
    const selectedStartDate = new Date(
      this.subscriptionBookingForm.get('startDate')?.value
    );
    const subscriptionEndDate = new Date(this.subscriptionEndDate);
    const bigParkingEndDate = new Date(this.parkingPlace.endDate);
    const bigParkingStartDate = new Date(this.startDateFromPlace);

    return (
      selectedStartDate.getTime() <= bigParkingStartDate.getTime() ||
      selectedStartDate.getTime() > bigParkingEndDate.getTime() ||
      subscriptionEndDate.getTime() > bigParkingEndDate.getTime()
    );
  }

  startDateGraterThanEndDate(): boolean {
    const selectedStartDate = new Date(
      this.manyDaysBookingFormGroup.get('startDate')?.value
    );
    const selectedEndDate = new Date(
      this.manyDaysBookingFormGroup.get('endDate')?.value
    );
    return selectedStartDate < selectedEndDate;
  }

  errorAppears() {
    if (this.bookingType === 'oneDay') {
      this.isIcorectSelectedDateOneDay();
    }
    if (this.bookingType === 'manyDays') {
      this.isIcorectSelectedDateManyDays();
      this.startDateGraterThanEndDate();
    }
    if (this.bookingType === 'subscription') {
      this.isIcorectSelectedDateSubscription();
    }
  }

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
    this.paymentMethods = Object.values(PaymentMethods);
    this.activatedRouter.data
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: any) => {
        this.parkingPlace = value.parkingSpacesDetails;
        this.startDateFromPlace = value.parkingSpacesDetails.startDate;
        this.paymentForSubscription =
          value.parkingSpacesDetails.paymentForSubscription;
        this.paymentPerDay = value.parkingSpacesDetails.paymentPerDay;
        this.paymentPerHour = value.parkingSpacesDetails.paymentPerHour;
      });

    this.idParkingSpaces = this.activatedRouter.snapshot.params['id'];

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
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      vehicleRegistrationNumber: [''],
      spaceModelName: [''],
      paymentMethod: [''],
      totalToPay: [''],
    });

    this.subscriptionBookingForm = this.formBuilder.group({
      startDate: [''],
      endDate: [this.subscriptionEndDate],
      numberOfMonths: [''],
      spaceModelName: [''],
      totalToPay: [this.paymentForSubscription],
      vehicleRegistrationNumber: [''],
    });

    this.subscriptionBookingForm
      .get('numberOfMonths')
      ?.valueChanges.subscribe((value) => {
        this.calculateTotalToPayForSubscription(value);
        let startDate = new Date(
          this.subscriptionBookingForm.get('startDate')?.value
        );
        this.subscriptionEndDate = new Date(
          startDate.setMonth(startDate.getMonth() + value)
        );
      });

    this.oneDayBookingFormGroup
      .get('paymentMethod')
      ?.valueChanges.subscribe((value) => {
        if (value === 'Payment by the hour') {
          const startDate = this.oneDayBookingFormGroup.get('startDate')?.value;
          const startTime = this.oneDayBookingFormGroup.get('startHour')?.value;
          const endTime = this.oneDayBookingFormGroup.get('endHour')?.value;
          const endDate = this.oneDayBookingFormGroup.get('startDate')?.value;

          const [startHours, startMinutes] = startTime.split(':');
          const startDateToSend = new Date(startDate);
          startDateToSend.setHours(
            parseInt(startHours, 10),
            parseInt(startMinutes, 10)
          );
          const startTimezoneOffset =
            startDateToSend.getTimezoneOffset() * 60000;
          const localStartDate = new Date(
            startDateToSend.getTime() - startTimezoneOffset
          );

          const [endHours, endMinutes] = endTime.split(':');
          const endDateToSend = new Date(endDate);
          endDateToSend.setHours(
            parseInt(endHours, 10),
            parseInt(endMinutes, 10)
          );
          const endTimezoneOffset = endDateToSend.getTimezoneOffset() * 60000;
          const localEndDate = new Date(
            endDateToSend.getTime() - endTimezoneOffset
          );
          const numberOfMiliseconds =
            localEndDate.getTime() - localStartDate.getTime();
          const numberOfHours = numberOfMiliseconds / (1000 * 60 * 60);
          this.totalPayment = this.paymentPerHour * numberOfHours;
        }

        if (value === 'Payment by the day') {
          this.totalPayment = this.paymentPerDay;
        }
      });

    this.manyDaysBookingFormGroup
      .get('paymentMethod')
      ?.valueChanges.subscribe((value) => {
        if (value === 'Payment by the hour') {
          let startDate = new Date(
            this.manyDaysBookingFormGroup.get('startDate')?.value
          );
          let endDate = this.manyDaysBookingFormGroup.get('endDate')?.value;

          let differenceInMiliseconds = endDate.getTime() - startDate.getTime();
          let differenceInHours = differenceInMiliseconds / (1000 * 3600);
          this.totalPayment = this.paymentPerDay * differenceInHours;
        }
        if (value === 'Payment by the day') {
          let startDate = new Date(
            this.manyDaysBookingFormGroup.get('startDate')?.value
          );
          let endDate = this.manyDaysBookingFormGroup.get('endDate')?.value;
          let differenceInMiliseconds = endDate.getTime() - startDate.getTime();
          let differenceInDays = differenceInMiliseconds / (1000 * 3600 * 24);
          this.totalPayment = this.paymentPerDay * differenceInDays;
        }
      });
  }
}
