import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { ParkingSpaceBookingService } from 'src/app/services/parking-space-booking.service';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { PaymentMethods } from 'src/app/enums/payment-methods';

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

  constructor(
    private router: ActivatedRoute,
    private parkingSpaceService: ParkingPlacesService,
    private bookingService: ParkingSpaceBookingService,
    private vehicleService: VehiclesService
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

  // checkEndHourIsSmaller() {
  //   // return this.endHour <= this.startHour;
  //   console.log(this.startHour);
  //   console.log(this.endHour);
  // }

  ngOnInit() {
    this.populateHoursArray();
    this.paymentMethods = Object.values(PaymentMethods);
    this.bookingService.getMonthNumber().subscribe((values) => {
      this.months = values;
    });

    this.router.paramMap.subscribe((paramMap) => {
      const idString = paramMap.get('id');
      if (idString != null) {
        const id = parseInt(idString, 10);
        this.parkingSpaceService.getParkingPlaceById(id).subscribe((value) => {
          this.parkingPlace = value;
        });
      }
    });

    this.vehicleService.getAllVehicle().subscribe((vehicles) => {
      this.vehicles = vehicles;
    });
  }
}
