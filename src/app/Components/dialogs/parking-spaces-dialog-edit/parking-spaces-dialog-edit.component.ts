import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AddNewParkingSpaceDialogComponent } from '../add-new-parking-space-dialog/add-new-parking-space-dialog.component';
import { ConfirmCloseDialogComponent } from '../confirmation-dialogs/confirm-close-dialog/confirm-close-dialog.component';

@Component({
  selector: 'app-parking-spaces-dialog-edit',
  templateUrl: './parking-spaces-dialog-edit.component.html',
  styleUrls: ['./parking-spaces-dialog-edit.component.scss'],
})
export class ParkingSpacesDialogEditComponent {
  constructor(
    private dialogRef: MatDialogRef<AddNewParkingSpaceDialogComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private userStore: UserStoreService,
    private auth: AuthenticationService,
    private parkingSpacesService: ParkingPlacesService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  imageUrl: string | ArrayBuffer | null = null;
  userLoggedFullName: string;
  addNewParkingSpaceFormGroup: FormGroup;
  imageProfile: string;
  leasePermitFile: string;
  imageProfileFileName: string | undefined;
  leasePermitFileName: string | undefined;
  parkingSpacesOwnerId: string;

  changeVideoSurveillanceToggleButtonValue(event: boolean) {
    this.data.isVideoSurveilance = event;
    this.cdr.detectChanges();
  }

  changeMultistoreyCarParkToggleButtonValue(event: boolean) {
    this.data.multistoreyCarPark = event;
    this.cdr.detectChanges();
  }

  changePaidParkingToggleButtonValue(event: boolean) {
    this.data.paidParking = event;
    this.cdr.detectChanges();
  }

  changeUndergroundParkingLotsToggleButtonValue(event: boolean) {
    this.data.undergroundParkingLots = event;
    this.cdr.detectChanges();
  }

  hasPersonalVehicleAccept() {
    this.data.isPersonalVehicleAccepted = !this.data.isPersonalVehicleAccepted;
  }

  hasCargoVehicleAccept() {
    this.data.isCargoVehicleAccepted = !this.data.isCargoVehicleAccepted;
  }

  hasAgriculturalMachineryAccept() {
    this.data.isAgriculturalMachinery = !this.data.isAgriculturalMachinery;
  }

  hasPublicVehicleAccept() {
    this.data.isPublicTransportAccepted = !this.data.isPublicTransportAccepted;
  }

  onFileSelectedImageProfile(event: any) {
    const file: File = event.target.files[0];
    this.imageProfileFileName = file.name;
    const reader = new FileReader();
    this.imageProfileFileName = file.name;
    reader.onload = () => {
      const base64String = reader.result as string;
      this.imageProfile = base64String;
    };
    reader.readAsDataURL(file);
  }

  onFileSelectedLeasePermit(event: any) {
    const file: File = event.target.files[0];
    this.leasePermitFileName = file.name;
    const reader = new FileReader();
    this.leasePermitFileName = file.name;
    reader.onload = () => {
      const leasePermitBase64 = reader.result as string;
      this.leasePermitFile = leasePermitBase64;
    };
    reader.readAsDataURL(file);
  }

  closeAddNewParkingSpaceDialog(): void {
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

  registerParkingSpace() {
    const formData = {
      name: this.addNewParkingSpaceFormGroup.get('name')?.value,
      address: this.addNewParkingSpaceFormGroup.get('address')?.value,
      availableParkingSpaces: this.addNewParkingSpaceFormGroup.get(
        'availableParkingSpaces'
      )?.value,
      isCargoVehicleAccepted: this.data.isCargoVehicleAccepted,
      isPersonalVehicleAccepted: this.data.isPersonalVehicleAccepted,
      isPublicTransportAccepted: this.data.isCargoVehicleAccepted,
      isAgriculturalMachineryAccepted:
        this.data.isAgriculturalMachineryAccepted,
      isVideoSurveilance: this.data.isVideoSurveillance,
      imageProfile: this.imageProfile,
      leasePermit: this.leasePermitFile,
      startDate: this.addNewParkingSpaceFormGroup.get('startDate')?.value,
      endDate: this.addNewParkingSpaceFormGroup.get('endDate')?.value,
      addedDate: new Date(),
      isFree: this.addNewParkingSpaceFormGroup.get('videoSurveillance')?.value,
      descriptionParking:
        this.addNewParkingSpaceFormGroup.get('descriptionParking')?.value,
      isDraft: false,
      paymentPerHour:
        this.addNewParkingSpaceFormGroup.get('paymentPerHour')?.value,
      paymentPerDay:
        this.addNewParkingSpaceFormGroup.get('paymentPerDay')?.value,
      paymentForSubscription: this.addNewParkingSpaceFormGroup.get(
        'paymentForSubscription'
      )?.value,
      isVerifiedByAdmin: false,
      somethingIsWrong: false,
      parkingSpacesOwnerId: this.parkingSpacesOwnerId,
      multistoreyCarPark: this.data.multistoreyCarPark,
      undergroundParkingLots: this.data.undergroundParkingLots,
    };

    this.parkingSpacesService.registerParkingSpaces(formData).subscribe({
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
      error: (err) => {
        this.toast.error({
          detail: 'Error Message',
          summary: err.error.message,
          duration: 5000,
        });
      },
    });
  }

  ngOnInit() {
    this.addNewParkingSpaceFormGroup = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      address: [this.data.address, Validators.required],
      descriptionParking: [this.data.description],
      availableParkingSpaces: [
        this.data.availableParkingSpaces,
        [Validators.required, Validators.maxLength(3)],
      ],
      startDate: [this.data.startDate, Validators.required],
      endDate: [this.data.endDate, Validators.required],
      undergroundParkingLots: [
        this.data.undergroundParkingLots,
        Validators.required,
      ],
      multistoreyCarPark: [this.data.multistoreyCarPark, Validators.required],
      isVideoSurveillance: [this.data.isVideoSurveilance, Validators.required],
      paidParking: [this.data.paidParking, Validators.required],
      isPersonalVehicleAccepted: [this.data.isPersonalVehicleAccepted],
      isCargoVehicleAccepted: [this.data.isCargoVehicleAccepted],
      isPublicTransportAccepted: [this.data.isPublicTransportAccepted],
      isAgriculturalMachineryAccepted: [
        this.data.isAgriculturalMachineryAccepted,
      ],
      imageFileUpload: ['', Validators.required],
      leasePermit: ['', Validators.required],
      paymentPerDay: ['', Validators.required],
      paymentPerHour: ['', Validators.required],
      paymentForSubscription: ['', Validators.required],
    });
    console.log(this.data);
    this.userStore.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.userLoggedFullName = fullNameFromToken || val;
    });

    this.userStore.getIdUserFromStore().subscribe((val) => {
      let userIdFromToken = this.auth.getUserIdFromToken();
      this.parkingSpacesOwnerId = userIdFromToken || val;
    });
  }
}
