import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { ParkingSpaceBookingService } from 'src/app/services/parking-space-booking.service';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { PaymentMethods } from 'src/app/enums/payment-methods';
import { LeavePageDialogComponent } from '../dialogs/confirmation-dialogs/leave-page-dialog/leave-page-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-parking-space-details',
  templateUrl: './parking-space-details.component.html',
  styleUrls: ['./parking-space-details.component.scss'],
})
export class ParkingSpaceDetailsComponent implements OnInit {
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

  constructor(
    private router: ActivatedRoute,
    private parkingSpaceService: ParkingPlacesService,
    private bookingService: ParkingSpaceBookingService,
    private vehicleService: VehiclesService,
    private dialog: MatDialog
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
    this.bookingService.getNumberArray().subscribe((values) => {
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

  // checkEndHourIsSmaller() {
  //   // return this.endHour <= this.startHour;
  //   console.log(this.startHour);
  //   console.log(this.endHour);
  // }

  ngOnInit() {
    this.idParkingSpaces = this.router.snapshot.params['id'];
    this.parkingSpaceService
      .getParkingSpacesById(this.idParkingSpaces)
      .subscribe((value) => {
        this.parkingPlace = value;
      });
    this.populateHoursArray();
    this.paymentMethods = Object.values(PaymentMethods);
    this.bookingService.getMonthNumber().subscribe((values) => {
      this.months = values;
    });
    this.vehicleService.getAllVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
    });
  }
}
