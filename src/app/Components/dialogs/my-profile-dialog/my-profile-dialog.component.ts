import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SaveChangesDialogComponent } from '../confirmation-dialogs/save-changes-dialog/save-changes-dialog.component';
import { ConfirmCloseDialogComponent } from '../confirmation-dialogs/confirm-close-dialog/confirm-close-dialog.component';
import { UsersService } from 'src/app/services/users.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  userId: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userService: UsersService,
    private userStore: UserStoreService,
    private auth: AuthenticationService
  ) {}

  getMyAccount() {
    this.userService.getMyAccount(this.userId).subscribe((user) => {
      console.log(user);
      this.nameFormGroup.patchValue({
        firstname: user.firstName,
        lastname: user.lastName,
      });
      this.addressFormGroup.patchValue({
        address: user.address,
      });
      this.emailFormGroup.patchValue({
        email: user.email,
      });
      this.pncFormGroup.patchValue({
        pnc: user.pnc,
      });
      this.phoneFormGroup.patchValue({
        phone: user.phone,
      });
      this.dateBirthFormGroup.patchValue({
        dateBirth: user.dateOfBirth,
      });
      this.stateZipCode.patchValue({
        zip: user.zipCode,
        state: user.state,
      });
      this.imageProfileFormGroup.patchValue({
        imageProfile: user.imageUrl,
      });
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

  ngOnInit() {
    this.userStore.getIdUserFromStore().subscribe((val) => {
      let userIdFromToken = this.auth.getUserIdFromToken();
      this.userId = userIdFromToken || val;
    });

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
    this.imageProfileFormGroup = this.formBuilder.group({
      imageProfile: [''],
    });
    this.changePasswordFormGroup = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });

    this.getMyAccount();
  }
}
