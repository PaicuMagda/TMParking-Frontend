import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SaveChangesDialogComponent } from '../confirmation-dialogs/save-changes-dialog-vehicle/save-changes-dialog.component';
import { ConfirmCloseDialogComponent } from '../confirmation-dialogs/confirm-close-dialog/confirm-close-dialog.component';
import { UsersService } from 'src/app/services/users.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgToastService } from 'ng-angular-popup';

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
  usernameFormGroup: FormGroup;
  changePasswordFormGroup: FormGroup;
  imageProfileFormGroup: FormGroup;
  userId: any;
  imageProfile: string = '';
  imageProfileFileName: string | undefined;
  showIsNotDigitMessage: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userService: UsersService,
    private userStore: UserStoreService,
    private auth: AuthenticationService,
    private toast: NgToastService
  ) {}

  getMyAccount(userId: number) {
    this.userService.getMyAccount(userId).subscribe((user) => {
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
      this.imageProfile = user.imageUrl;
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

  onFileSelectedImageProfile(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    this.imageProfileFileName = file.name;
    reader.onload = () => {
      const base64String = reader.result as string;
      this.imageProfile = base64String;
    };
    reader.readAsDataURL(file);
  }

  openSaveChangesConfirmDialog(idUser: number) {
    const formData = {
      firstName: this.nameFormGroup.get('firstname')?.value,
      lastName: this.nameFormGroup.get('lastname')?.value,
      address: this.addressFormGroup.get('address')?.value,
      email: this.emailFormGroup.get('email')?.value,
      pnc: this.pncFormGroup.get('pnc')?.value,
      phone: this.phoneFormGroup.get('phone')?.value,
      password: this.changePasswordFormGroup.get('repeatPassword')?.value,
      zipCode: this.stateZipCode.get('zip')?.value,
      state: this.stateZipCode.get('state')?.value,
      dateOfBirth: this.dateBirthFormGroup.get('dateBirth')?.value,
      imageUrl: this.imageProfile,
      username: this.usernameFormGroup.get('username')?.value,
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
        this.userService.updateUser(this.userId, formData).subscribe({
          next: (resp) => {
            this.toast.info({
              detail: 'Info Message',
              summary: resp.message,
              duration: 3000,
            });
            console.log(formData);
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
        dialogRef.close();
      }
    });
  }

  onKeyPress(event: KeyboardEvent) {
    const char = event.key;
    const pattern = /^[0-9]*$/;
    if (!pattern.test(char)) {
      event.preventDefault();
      this.showIsNotDigitMessage = true;
    } else {
      this.showIsNotDigitMessage = false;
    }
  }

  matchPassword(): boolean {
    return (
      this.changePasswordFormGroup.get('newPassword')?.value ===
      this.changePasswordFormGroup.get('repeatPassword')?.value
    );
  }

  ngOnInit() {
    this.userStore.getIdUserFromStore().subscribe((val) => {
      let userIdFromToken = this.auth.getUserIdFromToken();
      this.userId = userIdFromToken || val;
      this.getMyAccount(this.userId);
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
    this.usernameFormGroup = this.formBuilder.group({
      username: [''],
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
}
