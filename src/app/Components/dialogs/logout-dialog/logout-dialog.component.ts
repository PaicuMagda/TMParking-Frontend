import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss'],
})
export class LogoutDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<LogoutDialogComponent>,
    private auth: AuthenticationService
  ) {}

  close() {
    this.dialogRef.close();
  }

  logout() {
    this.auth.logout();
    this.close();
  }
}
