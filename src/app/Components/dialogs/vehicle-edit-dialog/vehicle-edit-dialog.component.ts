import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddNewVehicleDialogComponent } from '../add-new-vehicle-dialog/add-new-vehicle-dialog.component';
import { VehiclesService } from 'src/app/services/vehicles.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmCloseDialogComponent } from '../confirmation-dialogs/confirm-close-dialog/confirm-close-dialog.component';

@Component({
  selector: 'app-vehicle-edit-dialog',
  templateUrl: './vehicle-edit-dialog.component.html',
  styleUrls: ['./vehicle-edit-dialog.component.scss'],
})
export class VehicleEditDialogComponent {
  addNewVehicleFormGroup: FormGroup;
  image: string = this.data.imageProfileBase64;
  vehicleRegistrationCertificateBase64: string =
    this.data.vehicleRegistrationCertificateBase64;
  isLinear = false;
  certificateFileName: string | undefined;
  imageProfileFileName: string | undefined;
  idUserLogged: string = '';
  userLoggedFullName: string = '';
  showPdfViewer: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddNewVehicleDialogComponent>,
    private dialog: MatDialog,
    private vehicleService: VehiclesService,
    private userStore: UserStoreService,
    private auth: AuthenticationService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.userStore.getIdUserFromStore().subscribe((val) => {
      let userIdFromToken = this.auth.getUserIdFromToken();
      this.idUserLogged = val || userIdFromToken;
    });
    this.userStore.getFullNameFromStore().subscribe((val) => {
      this.userLoggedFullName = val;
    });

    this.addNewVehicleFormGroup = this.formBuilder.group({
      image: ['', Validators.required],
      make: [this.data.make, Validators.required],
      model: [this.data.model, Validators.required],
      color: [this.data.color, Validators.required],
      year: [this.data.year, Validators.required],
      vin: [this.data.vehicleIdentificationNumber, Validators.required],
      vehicleRegistrationCertificate: ['', Validators.required],
    });
  }

  showPdf() {
    this.showPdfViewer = !this.showPdfViewer;
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

  updateVehicle(idVehicle: number) {
    const formData = {
      color: this.addNewVehicleFormGroup.get('color')?.value,
      imageProfileBase64: this.image,
      isVerifiedByAdmin: false,
      make: this.addNewVehicleFormGroup.get('make')?.value,
      model: this.addNewVehicleFormGroup.get('model')?.value,
      somethingIsWrong: false,
      vehicleIdentificationNumber:
        this.addNewVehicleFormGroup.get('vin')?.value,
      vehicleRegistrationCertificateBase64:
        this.vehicleRegistrationCertificateBase64,
      year: this.addNewVehicleFormGroup.get('year')?.value,
    };

    this.vehicleService.updateVehicle(idVehicle, formData).subscribe({
      next: (resp) => {
        this.toast.info({
          detail: 'Info Message',
          summary: resp.message,
          duration: 3000,
        });
        setTimeout(() => {
          this.dialogRef.close();
        }, 1000);
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
      .subscribe((result) => {
        if (result === 'yes') {
          setTimeout(() => {
            this.dialogRef.close();
          }, 300);
        }
      });
  }
}
