import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-close-dialog',
  templateUrl: './confirm-close-dialog.component.html',
  styleUrls: ['./confirm-close-dialog.component.scss'],
})
export class ConfirmCloseDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmCloseDialogComponent>) {}

  closeConfirmCloseDialog() {
    this.dialogRef.close();
  }

  closeAddNewVehicleDialog() {
    this.dialogRef.close('yes');
  }
}
