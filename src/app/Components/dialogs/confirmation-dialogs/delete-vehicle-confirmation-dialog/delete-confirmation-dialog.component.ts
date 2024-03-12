import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss'],
})
export class DeleteConfirmationDialogComponent implements OnInit {
  constructor(
    private vehicleService: VehiclesService,
    private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: NgToastService
  ) {}

  closeDeleteDialogConfirmation() {
    this.dialogRef.close();
  }

  deleteVehicleById() {
    this.vehicleService.deletVehicleById(this.data.vehicleId).subscribe({
      next: (resp) => {
        this.toast.info({
          detail: 'Info Message',
          summary: resp.message,
          duration: 3000,
        });
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
