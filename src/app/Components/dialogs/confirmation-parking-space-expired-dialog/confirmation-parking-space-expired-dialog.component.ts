import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-parking-space-expired-dialog',
  templateUrl: './confirmation-parking-space-expired-dialog.component.html',
  styleUrls: ['./confirmation-parking-space-expired-dialog.component.scss'],
})
export class ConfirmationParkingSpaceExpiredDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmationParkingSpaceExpiredDialogComponent>
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
