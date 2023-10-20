import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';

@Component({
  selector: 'app-add-new-parking-space-dialog',
  templateUrl: './add-new-parking-space-dialog.component.html',
  styleUrls: ['./add-new-parking-space-dialog.component.scss'],
})
export class AddNewParkingSpaceDialogComponent implements OnInit {
  constructor() {}
  address: string = '';
  numberOfParkingSpaces: number = 0;
  undergroundParking: string = '';

  changeToggleButtonsUndergroundParking(event: string) {
    this.undergroundParking = event;
    console.log(this.undergroundParking);
  }

  ngOnInit() {}
}
