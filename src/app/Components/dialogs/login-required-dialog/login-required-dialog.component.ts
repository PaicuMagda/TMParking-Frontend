import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-required-dialog',
  templateUrl: './login-required-dialog.component.html',
  styleUrls: ['./login-required-dialog.component.scss'],
})
export class LoginRequiredDialogComponent {
  constructor(private dialogRef: MatDialogRef<LoginRequiredDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
