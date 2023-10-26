import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { AddNewParkingSpaceDialogComponent } from 'src/app/Components/home/add-new-parking-space-dialog/add-new-parking-space-dialog.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  parkingPlaces: any[] = [];
  role: string = 'Administrator';
  allParkingSpaces: string = 'allParkingSpaces';

  constructor(
    private _parkingPlaces: ParkingPlacesService,
    private dialog: MatDialog
  ) {}

  openAddNewParkingDialog() {
    this.dialog.open(AddNewParkingSpaceDialogComponent, {
      width: '100%',
      height: '85%',
    });
  }

  ngOnInit() {
    this.parkingPlaces = this._parkingPlaces.getParcari();
    console.log(this.parkingPlaces);
  }
}
