import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmCloseDialogComponent } from '../confirmation-dialogs/confirm-close-dialog/confirm-close-dialog.component';

@Component({
  selector: 'app-add-new-parking-space-dialog',
  templateUrl: './add-new-parking-space-dialog.component.html',
  styleUrls: ['./add-new-parking-space-dialog.component.scss'],
})
export class AddNewParkingSpaceDialogComponent implements OnInit {
  addNewParkingSpaceFormGroup: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddNewParkingSpaceDialogComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef
  ) {}

  toggleButtonValue: boolean = false;
  address: string = '';
  numberOfParkingSpaces: number = 0;
  paidParking: string = '';
  videoSurveillance: string = '';
  automobile: boolean = false;
  truck: boolean = false;
  agricultural: boolean = false;
  publicTransportationVehicle = false;
  startDate: Date | null = null;
  endDate: Date | null = null;
  userAuthenticated: string = 'MAGDA PAICU';
  imageUrl: string | ArrayBuffer | null = null;

  changeToggleButtonValue(event: boolean) {
    this.toggleButtonValue = event;
    console.log(this.toggleButtonValue);
    this.cdr.detectChanges();
  }

  isAutomobile() {
    this.automobile = !this.automobile;
  }

  isTruck() {
    this.truck = !this.truck;
  }

  isAgricultural() {
    this.agricultural = !this.agricultural;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type.match('image.*')) {
        const reader = new FileReader();

        reader.onload = () => {
          this.imageUrl = reader.result;
        };

        reader.readAsDataURL(file);
      } else {
        console.log('Fișierul încărcat nu este o imagine.');
      }
    }
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

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

  ngOnInit() {
    this.addNewParkingSpaceFormGroup = this.formBuilder.group({
      address: ['', Validators.required],
      descriptionParking: [''],
      numberSpaces: ['', [Validators.required, Validators.maxLength(3)]],
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
    });
  }
}
