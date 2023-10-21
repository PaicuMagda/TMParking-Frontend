import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-parking-space-dialog',
  templateUrl: './add-new-parking-space-dialog.component.html',
  styleUrls: ['./add-new-parking-space-dialog.component.scss'],
})
export class AddNewParkingSpaceDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddNewParkingSpaceDialogComponent>
  ) {}
  address: string = '';
  numberOfParkingSpaces: number = 0;
  undergroundParking: string = '';
  automobile: boolean = false;
  truck: boolean = false;
  agricultural: boolean = false;
  dateStart: Date = new Date();
  dateEnd: Date = new Date();
  userAuthenticated: string = 'MAGDA PAICU';

  changeToggleButtonsUndergroundParking(event: string) {
    this.undergroundParking = event;
  }

  isAutomobile() {
    this.automobile = !this.automobile;
    console.log(this.automobile);
  }

  isTruck() {
    this.truck = !this.truck;
    console.log(this.truck);
  }

  isAgricultural() {
    this.agricultural = !this.agricultural;
    console.log(this.agricultural);
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
