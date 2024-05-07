import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';

@Component({
  selector: 'app-delete-parking-spaces-confirmation-dialog',
  templateUrl: './delete-parking-spaces-confirmation-dialog.component.html',
  styleUrls: ['./delete-parking-spaces-confirmation-dialog.component.scss'],
})
export class DeleteParkingSpacesConfirmationDialogComponent implements OnInit {
  constructor(
    private parkingSpacesService: ParkingPlacesService,
    private dialogRef: MatDialogRef<DeleteParkingSpacesConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: NgToastService
  ) {}

  closeDeleteDialogConfirmation() {
    this.dialogRef.close();
  }

  deleteParkingSpacesById() {
    this.parkingSpacesService
      .deleteParkingSpacesById(this.data.parkingSpacesId)
      .subscribe({
        next: (resp) => {
          this.toast.info({
            detail: 'Info Message',
            summary: resp.message,
            duration: 3000,
          });
          this.parkingSpacesService.loadParkingSpaces();
          this.dialogRef.close();
        },
        error: (err) => {
          this.toast.error({
            detail: 'Error Message',
            summary: err.title,
            duration: 3000,
          });
          this.dialogRef.close();
        },
      });
  }

  ngOnInit() {}
}
