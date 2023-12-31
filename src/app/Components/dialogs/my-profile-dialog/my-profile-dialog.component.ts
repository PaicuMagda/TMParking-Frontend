import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SaveChangesDialogComponent } from '../confirmation-dialogs/save-changes-dialog/save-changes-dialog.component';
import { NavbarService } from 'src/app/services/navbar.service';
import { ConfirmCloseDialogComponent } from '../confirmation-dialogs/confirm-close-dialog/confirm-close-dialog.component';

@Component({
  selector: 'app-my-profile-dialog',
  templateUrl: './my-profile-dialog.component.html',
  styleUrls: ['./my-profile-dialog.component.scss'],
})
export class MyProfileDialogComponent implements OnInit {
  isLinear = false;
  nameFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  pncFormGroup: FormGroup;
  phoneFormGroup: FormGroup;
  dateBirthFormGroup: FormGroup;
  stateZipCode: FormGroup;
  vehicleRegisteredFormGroup: FormGroup;
  changePasswordFormGroup: FormGroup;
  imageProfileFormGroup: FormGroup;
  driverLicenseFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private navbarService: NavbarService
  ) {}

  ngOnInit() {
    this.nameFormGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
    });
    this.addressFormGroup = this.formBuilder.group({
      address: ['', Validators.required],
    });
    this.emailFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
    });
    this.pncFormGroup = this.formBuilder.group({
      pnc: ['', Validators.required],
    });
    this.phoneFormGroup = this.formBuilder.group({
      phone: ['', Validators.required],
    });
    this.dateBirthFormGroup = this.formBuilder.group({
      dateBirth: [''],
    });
    this.stateZipCode = this.formBuilder.group({
      zip: ['', Validators.required],
      state: ['', Validators.required],
    });
    this.vehicleRegisteredFormGroup = this.formBuilder.group({
      vehiclesRegistered: [''],
    });
    this.driverLicenseFormGroup = this.formBuilder.group({
      driverLicense: ['', Validators.required],
    });
    this.imageProfileFormGroup = this.formBuilder.group({
      imageProfile: [''],
    });
    this.changePasswordFormGroup = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required],
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

  openCloseConfirmSidenav() {
    this.dialog.open(ConfirmCloseDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
    });
  }

  closeSidenavMyProfile() {
    this.openCloseConfirmSidenav();
  }
}
