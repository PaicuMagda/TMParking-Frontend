import { Component, OnInit } from '@angular/core';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';

@Component({
  selector: 'app-parking-spaces',
  templateUrl: './parking-spaces.component.html',
  styleUrls: ['./parking-spaces.component.scss'],
})
export class ParkingSpacesComponent implements OnInit {
  constructor(private parkingSpacesService: ParkingPlacesService) {}

  parkingSpaces: any = [];

  ngOnInit() {
    this.parkingSpaces = this.parkingSpacesService.getParcari();
    console.log(this.parkingSpaces);
  }
}
