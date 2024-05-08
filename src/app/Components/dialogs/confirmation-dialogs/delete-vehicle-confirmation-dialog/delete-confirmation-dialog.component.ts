import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DisplayCardsService } from 'src/app/services/display-cards.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss'],
})
export class DeleteConfirmationDialogComponent implements OnInit {
  toggleValue: string = '';
  idUserLogged: string = '';
  private destroy$: Subject<void> = new Subject();

  constructor(
    private vehicleService: VehiclesService,
    private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: NgToastService,
    private displayCardService: DisplayCardsService,
    private userStore: UserStoreService,
    private auth: AuthenticationService
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
        this.vehicleService.loadVehicles();
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

  deleteVehicleMyVehicle() {
    this.vehicleService.deletVehicleById(this.data.vehicleId).subscribe({
      next: (resp) => {
        this.toast.info({
          detail: 'Info Message',
          summary: resp.message,
          duration: 3000,
        });
        this.vehicleService.loadMyVehicles(this.idUserLogged);
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

  deleteVehicle() {
    if (this.toggleValue === 'myVehicles') this.deleteVehicleMyVehicle();
    else this.deleteVehicleById();
  }

  ngOnInit() {
    this.userStore
      .getIdUserFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        let userIdFromToken = this.auth.getUserIdFromToken();
        this.idUserLogged = val || userIdFromToken;
      });

    this.displayCardService.toggleValueSubjectObservable.subscribe(
      (value) => (this.toggleValue = value)
    );
  }
}
