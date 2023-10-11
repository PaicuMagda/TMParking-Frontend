import { Component, OnInit } from '@angular/core';
import { ParkingPlacesService } from 'src/app/services/parking-spaces/parking-spaces.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private _parkingPlaces: ParkingPlacesService) {}
  parkingPlaces: any[] = [];
  role: string = 'Administrator';

  ngOnInit() {
    this.parkingPlaces = this._parkingPlaces.getParcari();
    console.log(this.parkingPlaces);
  }
}
