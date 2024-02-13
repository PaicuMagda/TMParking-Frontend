import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { SaveChangesDialogComponent } from '../dialogs/confirmation-dialogs/save-changes-dialog/save-changes-dialog.component';
import { DeleteConfirmationDialogComponent } from '../dialogs/confirmation-dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  vehicleForm: FormGroup[] = [];
  role: string = '';

  constructor(
    private vehicleService: VehiclesService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private userStore: UserStoreService
  ) {}

  editVehicle(index: number) {
    const vehicle = this.vehicles[index];
    vehicle.isEdit = !vehicle.isEdit;
    const vehicleForm = this.vehicleForm[index];
    vehicleForm.patchValue({
      make: vehicle.make,
      model: vehicle.model,
      color: vehicle.color,
      year: vehicle.year,
      ownerId: vehicle.ownerId,
      vehicleIdentificationNumber: vehicle.vehicleIdentificationNumber,
      vehicleRegistrationCertificate: vehicle.vehicleRegistrationCertificate,
    });
  }

  openSaveChangesConfirmDialog() {
    this.dialog.open(SaveChangesDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
    });
  }

  openDeleteConfirmDialog() {
    this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
    });
  }

  createVehicleFormGroup(vehicle: Vehicle): FormGroup {
    return this.formBuilder.group({
      image: [vehicle.imageUrl],
      make: [vehicle.make],
      model: [vehicle.model],
      color: [vehicle.color],
      year: [vehicle.year],
      ownerId: [vehicle.ownerId],
      vehicleIdentificationNumber: [vehicle.vehicleIdentificationNumber],
      vehicleRegistrationCertificate: [vehicle.vehicleRegistrationCertificate],
    });
  }

  isVehicleNew(vehicle: Vehicle): boolean {
    const currentDate = new Date().getDate();
    const dateAddedVehicle = vehicle.dateAdded.getTime();
    const differenceInDays = Math.floor(
      (currentDate - dateAddedVehicle) / (1000 * 60 * 60 * 24)
    );
    return differenceInDays <= 3;
  }

  ngOnInit() {
    this.vehicleService.getAllVehicle().subscribe((vehicles) => {
      this.vehicles = vehicles;
      this.vehicles.forEach((vehicle) => {
        this.vehicleForm.push(this.createVehicleFormGroup(vehicle));
      });
    });
    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.authenticationService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
}
