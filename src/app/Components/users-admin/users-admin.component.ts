import { Component, OnInit } from '@angular/core';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss'],
})
export class UsersAdminComponent implements OnInit {
  parkingPlaces: any[] = [];

  constructor(private _parkingPlaces: ParkingPlacesService) {}

  ngOnInit() {
    this.parkingPlaces = this._parkingPlaces.getParcari();
  }
}
