import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmCloseDialogComponent } from '../confirmation-dialogs/confirm-close-dialog/confirm-close-dialog.component';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { NgToastService } from 'ng-angular-popup';
import { Subject, takeUntil } from 'rxjs';
import { DisplayCardsService } from 'src/app/services/display-cards.service';

@Component({
  selector: 'app-add-new-parking-space-dialog',
  templateUrl: './add-new-parking-space-dialog.component.html',
  styleUrls: ['./add-new-parking-space-dialog.component.scss'],
})
export class AddNewParkingSpaceDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddNewParkingSpaceDialogComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private userStore: UserStoreService,
    private auth: AuthenticationService,
    private parkingSpacesService: ParkingPlacesService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private displayCardsService: DisplayCardsService
  ) {}

  private destroy$: Subject<void> = new Subject<any>();
  toggleButtonValue: boolean = false;
  name: string = '';
  addressParkingSpace: string = '';
  numberOfParkingSpaces: number = 0;
  paidParking: boolean = false;
  videoSurveillance: string = '';
  isPersonalVehicleAccepted: boolean = false;
  isPublicTransportAccepted: boolean = false;
  isCargoVehicleAccepted: boolean = false;
  isAgriculturalMachineryAccepted: boolean = false;
  agricultural: boolean = false;
  startDate: Date | null = null;
  endDate: Date | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  userLoggedFullName: string;
  addNewParkingSpaceFormGroup: FormGroup;
  imageProfile: string;
  leasePermitFile: string;
  imageProfileFileName: string | undefined;
  leasePermitFileName: string | undefined;
  parkingSpacesOwnerId: string;
  toggleValue: string = '';

  changeToggleButtonValue(event: boolean) {
    this.toggleButtonValue = event;
    this.cdr.detectChanges();
  }

  hasPersonalVehicleAccept() {
    this.isPersonalVehicleAccepted = !this.isPersonalVehicleAccepted;
  }

  hasCargoVehicleAccept() {
    this.isCargoVehicleAccepted = !this.isCargoVehicleAccepted;
  }

  hasAgriculturalMachineryAccept() {
    this.agricultural = !this.agricultural;
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
      .pipe(takeUntil(this.destroy$))
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
      isCargoVehicleAccepted: this.isCargoVehicleAccepted,
      isPersonalVehicleAccepted: this.isPersonalVehicleAccepted,
      isPublicTransportAccepted: this.isCargoVehicleAccepted,
      isAgriculturalMachineryAccepted: this.agricultural,
      isVideoSurveilance: this.videoSurveillance,
      imageProfile: this.imageProfile,
      leasePermit: this.leasePermitFile,
      startDate: this.addNewParkingSpaceFormGroup.get('startDate')?.value,
      endDate: this.addNewParkingSpaceFormGroup.get('endDate')?.value,
      addedDate: new Date(),
      isFree: this.addNewParkingSpaceFormGroup.get('videoSurveillance')?.value,
      description:
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
    };

    this.parkingSpacesService
      .registerParkingSpaces(formData)
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
          this.parkingSpacesService.loadParkingSpaces();
          this.parkingSpacesService.loadMyParkingSpace(
            this.parkingSpacesOwnerId
          );
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
      name: ['', Validators.required],
      address: ['', Validators.required],
      descriptionParking: [''],
      availableParkingSpaces: [
        '',
        [Validators.required, Validators.maxLength(3)],
      ],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      undergroundParkingLots: ['', Validators.required],
      multistoreyCarPark: ['', Validators.required],
      videoSurveillance: ['', Validators.required],
      paidParking: ['', Validators.required],
      isAutomobile: [''],
      isTruck: [''],
      isPublicTransportationVehicle: [''],
      isAgriculturalMachinery: [''],
      imageFileUpload: [null, Validators.required],
      leasePermit: [null, Validators.required],
      paymentPerHour: [0, Validators.required],
      paymentPerDay: [0, Validators.required],
      paymentForSubscription: [0, Validators.required],
      nameParkingLot: [null],
    });

    this.userStore
      .getFullNameFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        let fullNameFromToken = this.auth.getFullNameFromToken();
        this.userLoggedFullName = fullNameFromToken || val;
      });

    this.userStore
      .getIdUserFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        let userIdFromToken = this.auth.getUserIdFromToken();
        this.parkingSpacesOwnerId = userIdFromToken || val;
      });

    this.displayCardsService.toggleValueSubjectObservable.subscribe(
      (values) => {
        this.toggleValue = values;
        console.log(this.toggleValue);
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
