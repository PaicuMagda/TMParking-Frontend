import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmCloseDialogComponent } from '../confirmation-dialogs/confirm-close-dialog/confirm-close-dialog.component';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgToastService } from 'ng-angular-popup';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-new-vehicle-dialog',
  templateUrl: './add-new-vehicle-dialog.component.html',
  styleUrls: ['./add-new-vehicle-dialog.component.scss'],
})
export class AddNewVehicleDialogComponent {
  addNewVehicleFormGroup: FormGroup;
  image: string;
  vehicleRegistrationCertificateBase64: string;
  isLinear = false;
  certificateFileName: string | undefined;
  imageProfileFileName: string | undefined;
  idUserLogged: string = '';
  userLoggedFullName: string = '';
  private destroy$: Subject<void> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddNewVehicleDialogComponent>,
    private dialog: MatDialog,
    private vehicleService: VehiclesService,
    private userStore: UserStoreService,
    private auth: AuthenticationService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.userStore
      .getIdUserFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        let userIdFromToken = this.auth.getUserIdFromToken();
        this.idUserLogged = val || userIdFromToken;
      });

    this.userStore
      .getFullNameFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.userLoggedFullName = val;
      });

    this.addNewVehicleFormGroup = this.formBuilder.group({
      image: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      year: ['', Validators.required],
      owner: ['', Validators.required],
      vin: ['', Validators.required],
      vehicleRegistrationCertificate: ['', Validators.required],
    });
  }

  onFileSelectedImageProfile(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    this.imageProfileFileName = file.name;
    reader.onload = () => {
      const base64String = reader.result as string;
      this.image = base64String;
    };
    reader.readAsDataURL(file);
  }

  onFileSelectedCertificate(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    this.certificateFileName = file.name;
    reader.onload = () => {
      const vehicleRegistrationCertificateBase64 = reader.result as string;
      this.vehicleRegistrationCertificateBase64 =
        vehicleRegistrationCertificateBase64;
    };
    reader.readAsDataURL(file);
  }

  registerVehicle() {
    const formData = {
      color: this.addNewVehicleFormGroup.get('color')?.value,
      dateAdded: new Date(),
      imageProfileBase64: this.image,
      isVerifiedByAdmin: false,
      make: this.addNewVehicleFormGroup.get('make')?.value,
      model: this.addNewVehicleFormGroup.get('model')?.value,
      somethingIsWrong: false,
      vehicleIdentificationNumber:
        this.addNewVehicleFormGroup.get('vin')?.value,
      vehicleOwnerId: this.idUserLogged,
      vehicleRegistrationCertificateBase64:
        this.vehicleRegistrationCertificateBase64,
      year: this.addNewVehicleFormGroup.get('year')?.value,
    };

    this.vehicleService
      .registerVehicle(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp) => {
          this.toast.info({
            detail: 'Info Message',
            summary: resp.message,
            duration: 3000,
          });
          setTimeout(() => {
            this.dialogRef.close();
          }, 1000);
          this.vehicleService.loadVehicles();
        },
        error: (err) => ({
          summary: err.message,
          duration: 3000,
          detail: 'Error Message',
        }),
      });
  }

  registerMyVehicle() {
    const formData = {
      color: this.addNewVehicleFormGroup.get('color')?.value,
      dateAdded: new Date(),
      imageProfileBase64: this.image,
      isVerifiedByAdmin: false,
      make: this.addNewVehicleFormGroup.get('make')?.value,
      model: this.addNewVehicleFormGroup.get('model')?.value,
      somethingIsWrong: false,
      vehicleIdentificationNumber:
        this.addNewVehicleFormGroup.get('vin')?.value,
      vehicleOwnerId: this.idUserLogged,
      vehicleRegistrationCertificateBase64:
        this.vehicleRegistrationCertificateBase64,
      year: this.addNewVehicleFormGroup.get('year')?.value,
    };

    this.vehicleService
      .registerMyVehicle(formData, this.idUserLogged)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp) => {
          this.toast.info({
            detail: 'Info Message',
            summary: resp.message,
            duration: 3000,
          });
          setTimeout(() => {
            this.dialogRef.close();
          }, 1000);

          this.vehicleService.loadMyVehicles(this.idUserLogged);
        },
        error: (err) => ({
          summary: err.message,
          duration: 3000,
          detail: 'Error Message',
        }),
      });
  }

  closeAddNewVehicleDialogComponent() {
    this.dialog
      .open(ConfirmCloseDialogComponent, {
        width: '23%',
        height: '20%',
        position: {
          top: '5%',
        },
      })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result === 'yes') {
          setTimeout(() => {
            this.dialogRef.close();
          }, 300);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
