import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParkingSpaceBookingService } from 'src/app/services/parking-space-booking.service';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';

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

  constructor(
    private router: ActivatedRoute,
    private parkingSpaceService: ParkingPlacesService,
    private bookingService: ParkingSpaceBookingService
  ) {}

  changeType(value: string) {
    this.bookingType = value;
    console.log(this.bookingType);
  }

  populateHoursArray() {
    this.bookingService.getNumberArray().subscribe((values) => {
      this.hours = values;
    });
  }

  ngOnInit() {
    this.populateHoursArray();
    this.router.paramMap.subscribe((paramMap) => {
      const idString = paramMap.get('id');
      if (idString != null) {
        const id = parseInt(idString, 10);
        this.parkingSpaceService.getParkingPlaceById(id).subscribe((value) => {
          this.parkingPlace = value;
        });
      }
    });
  }
}
