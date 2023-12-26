import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-confirm-close-dialog',
  templateUrl: './confirm-close-dialog.component.html',
  styleUrls: ['./confirm-close-dialog.component.scss'],
})
export class ConfirmCloseDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmCloseDialogComponent>,
    private navbarService: NavbarService
  ) {}

  closeConfirmCloseDialog() {
    this.dialogRef.close();
  }

  closeAddNewVehicleDialog() {
    this.dialogRef.close('yes');
    this.navbarService.toggleSidenav(false);
  }
}
