import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { SaveChangesDialogComponent } from '../dialogs/confirmation-dialogs/save-changes-dialog-vehicle/save-changes-dialog.component';
import { DeleteConfirmationDialogComponent } from '../dialogs/confirmation-dialogs/delete-vehicle-confirmation-dialog/delete-confirmation-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { DisplayCardsService } from 'src/app/services/display-cards.service';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  vehicles$: Observable<any[]>;
  vehicles: any[] = [];
  vehicleForm: FormGroup[] = [];
  role: string = '';
  idUserLogged: string = '';
  imageProfileFileName: string | undefined;
  imageProfile: string;
  vehicleRegistrationCertificate: string;
  showPdfViewer: boolean = false;
  isLoading: boolean = true;

  constructor(
    private vehicleService: VehiclesService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private userStore: UserStoreService,
    private displayCardsService: DisplayCardsService,
    private toast: NgToastService
  ) {}

  showPdf(index: number) {
    const vehicle = this.vehicles[index];
    vehicle.showPdfViewer = !vehicle.showPdfViewer;
  }

  editVehicle(index: number) {
    const vehicle = this.vehicles[index];
    vehicle.isEdit = !vehicle.isEdit;

    const vehicleForm = this.vehicleForm[index];
    vehicleForm.patchValue({
      make: vehicle.make,
      model: vehicle.model,
      color: vehicle.color,
      year: vehicle.year,
      vehicleIdentificationNumber: vehicle.vehicleIdentificationNumber,
      ownerName: vehicle.vehicleOwnerFullName,
    });
  }

  onFileSelectedVehicleRegistrationCertificate(event: any, index: number) {
    const vehicle = this.vehicles[index];
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      vehicle.vehicleRegistrationCertificate = base64String;
    };
    reader.readAsDataURL(file);
  }

  openSaveChangesConfirmDialog(idVehicle: number, index: number) {
    const vehicleData = this.vehicleForm[index].value;
    const vehicleUpdated = {
      addedDate: new Date(),
      ...vehicleData,
    };
    const dialogRef = this.dialog.open(SaveChangesDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'save') {
        this.vehicleService
          .updateVehicle(idVehicle, vehicleUpdated)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (resp) => {
              this.toast.info({
                detail: 'Info Message',
                summary: resp.message,
                duration: 3000,
              });
              this.vehicleService.getVehicles().subscribe((values) => {
                this.vehicleService.updateVehicles(values);
              });
              this.vehicleService
                .getVehicleByUserId(this.idUserLogged)
                .subscribe((values) => {
                  this.vehicleService.updateMyVehicles(values);
                });
            },
            error: (err) => {
              this.toast.error({
                detail: 'Error Message',
                summary: err.error.message,
                duration: 5000,
              });
            },
          });
      } else if (result === 'close') {
        this.vehicles[index].isEdit = false;
        dialogRef.close();
      }
    });
  }

  isVerifiedByAdminFunction(idVehicle: number, index: number) {
    const vehicle = this.vehicles[idVehicle];
    const vehicleData = this.vehicleForm[index].value;
    const vehicleVerified = {
      ...vehicleData,
      isVerifiedByAdmin: true,
    };
    this.vehicleService
      .updateVehicle(idVehicle, vehicleVerified)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp) => {
          this.toast.info({
            detail: 'Info Message',
            summary: resp.message,
            duration: 3000,
          });
          this.vehicleService.getVehicles().subscribe((values) => {
            this.vehicleService.updateVehicles(values);
          });
          this.vehicleService
            .getVehicleByUserId(this.idUserLogged)
            .subscribe((values) => {
              this.vehicleService.updateMyVehicles(values);
            });
        },
        error: (err) => {
          this.toast.error({
            detail: 'Error Message',
            summary: err.error.message,
            duration: 5000,
          });
        },
      });
  }

  isSomethingWrongFunction(idVehicle: number, index: number) {
    const vehicle = this.vehicles[idVehicle];
    const vehicleData = this.vehicleForm[index].value;
    const vehicleVerified = {
      ...vehicleData,
      somethingIsWrong: true,
      // addedDate: vehicle.addedDate,
    };
    this.vehicleService
      .updateVehicle(idVehicle, vehicleVerified)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp) => {
          this.toast.info({
            detail: 'Info Message',
            summary: resp.message,
            duration: 3000,
          });
          this.vehicleService.getVehicles().subscribe((values) => {
            this.vehicleService.updateVehicles(values);
          });
        },
        error: (err) => {
          this.toast.error({
            detail: 'Error Message',
            summary: err.error.message,
            duration: 5000,
          });
        },
      });
  }

  openDeleteConfirmDialog(idVehicle: number) {
    this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
      data: {
        message: 'Are you sure you want to delete this vehicle ?',
        vehicleId: idVehicle,
      },
    });
  }

  createVehicleFormGroup(vehicle: Vehicle): FormGroup {
    return this.formBuilder.group({
      make: [vehicle.make],
      model: [vehicle.model],
      color: [vehicle.color],
      year: [vehicle.year],
      vehicleIdentificationNumber: [vehicle.vehicleIdentificationNumber],
      ownerName: [vehicle.vehicleOwner],
      imageProfileBase64: vehicle.imageProfileBase64,
      vehicleRegistrationCertificateBase64:
        vehicle.vehicleRegistrationCertificateBase64,
    });
  }

  isVehicleNew(vehicle: Vehicle): boolean {
    const currentDate = new Date().getDate();
    const dateAddedVehicle = new Date(vehicle.addedDate).getTime();
    const differenceInDays = Math.floor(
      (currentDate - dateAddedVehicle) / (1000 * 60 * 60 * 24)
    );
    return differenceInDays <= 3;
  }

  getVehicles() {
    this.displayCardsService.toggleValueSubjectObservable.subscribe((value) => {
      if (value === 'allVehicles') {
        this.vehicleService.vehicles$
          .pipe(
            takeUntil(this.destroy$),
            map((vehicles) => {
              vehicles.forEach((vehicle) => {
                vehicle.isEdit = false;
                this.isLoading = false;
              });
              return vehicles;
            })
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe((vehicles) => {
            this.vehicles = vehicles;
            this.vehicles.forEach((vehicle) => {
              this.vehicleForm.push(this.createVehicleFormGroup(vehicle));
            });
          });
      } else {
        this.vehicleService.myVehicles$
          .pipe(
            takeUntil(this.destroy$),
            map((vehicles) => {
              vehicles.forEach((vehicle) => {
                vehicle.isEdit = false;
                this.isLoading = false;
              });
              return vehicles;
            })
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe((vehicles) => {
            this.vehicles = vehicles;
            this.vehicles.forEach((vehicle) => {
              this.vehicleForm.push(this.createVehicleFormGroup(vehicle));
            });
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.userStore
      .getRoleFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        const roleFromToken = this.authenticationService.getRoleFromToken();
        this.role = val || roleFromToken;
      });
    this.userStore
      .getIdUserFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        let userIdFromToken = this.authenticationService.getUserIdFromToken();
        this.idUserLogged = val || userIdFromToken;
      });
    this.getVehicles();
  }
}
