import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ReservationsService } from 'src/app/services/reservations.service';
import { DeleteConfirmationDialogComponent } from '../delete-vehicle-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-delete-reservation-confirmation-dialog',
  templateUrl: './delete-reservation-confirmation-dialog.component.html',
  styleUrls: ['./delete-reservation-confirmation-dialog.component.scss'],
})
export class DeleteReservationConfirmationDialogComponent implements OnInit {
  constructor(
    private reservationsService: ReservationsService,
    private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {}

  closeDeleteDialogConfirmation() {
    this.dialogRef.close();
  }

  deleteReservationById() {
    this.reservationsService
      .deleteReservation(this.data.reservationId)
      .subscribe({
        next: (resp) => {
          this.toast.info({
            detail: 'Info Message',
            summary: resp.message,
            duration: 3000,
          });
          this.reservationsService.getReservationsByUserId(this.data.userId);
        },
        error: (err) => {
          this.toast.error({
            detail: 'Error Message',
            summary: err.title,
            duration: 3000,
          });
        },
      });
    this.dialogRef.close();
  }
}
