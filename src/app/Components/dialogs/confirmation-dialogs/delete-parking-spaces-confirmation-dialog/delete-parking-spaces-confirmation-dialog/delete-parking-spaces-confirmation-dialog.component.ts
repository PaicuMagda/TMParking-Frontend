import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { UserStoreService } from 'src/app/services/user-store.service';

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
    private toast: NgToastService,
    private userStore: UserStoreService,
    private auth: AuthenticationService
  ) {}

  private destroy$: Subject<void> = new Subject<any>();
  parkingSpacesOwnerId: string;

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
          this.parkingSpacesService.loadMyParkingSpace(
            this.parkingSpacesOwnerId
          );
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

  ngOnInit() {
    this.userStore
      .getIdUserFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        let userIdFromToken = this.auth.getUserIdFromToken();
        this.parkingSpacesOwnerId = userIdFromToken || val;
      });
  }
}
