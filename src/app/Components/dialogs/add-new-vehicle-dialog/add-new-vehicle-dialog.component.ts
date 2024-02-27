import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmCloseDialogComponent } from '../confirmation-dialogs/confirm-close-dialog/confirm-close-dialog.component';
import { VehiclesService } from 'src/app/services/vehicles.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddNewVehicleDialogComponent>,
    private dialog: MatDialog,
    private vehicleService: VehiclesService
  ) {}

  ngOnInit() {
    this.addNewVehicleFormGroup = this.formBuilder.group({
      image: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      year: ['', Validators.required],
      owner: ['', Validators.required],
      vin: ['', Validators.required],
      licensePlate: ['', Validators.required],
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
      vehicleOwnerId: this.addNewVehicleFormGroup.get('owner')?.value,
      vehicleRegistrationCertificateBase64:
        this.vehicleRegistrationCertificateBase64,
      year: this.addNewVehicleFormGroup.get('year')?.value,
    };

    this.vehicleService.registerVehicle(formData).subscribe(
      (response) => {
        console.log('Vehicul adaugat cu succes !');
      },
      (error) => {
        console.log('Eroare la incarcarea vehiculului');
      }
    );
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
