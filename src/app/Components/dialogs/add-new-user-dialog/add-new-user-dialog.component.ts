import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SaveChangesDialogComponent } from '../confirmation-dialogs/save-changes-dialog/save-changes-dialog.component';
import { ConfirmCloseDialogComponent } from '../confirmation-dialogs/confirm-close-dialog/confirm-close-dialog.component';
import { UsersService } from 'src/app/services/users.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-new-user-dialog',
  templateUrl: './add-new-user-dialog.component.html',
  styleUrls: ['./add-new-user-dialog.component.scss'],
})
export class AddNewUserDialogComponent {
  isLinear = false;
  imageFormGroup: FormGroup;
  nameFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  usernameFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  pncFormGroup: FormGroup;
  phoneFormGroup: FormGroup;
  dateBirthFormGroup: FormGroup;
  stateZipCodeFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  imageUrl: string | ArrayBuffer | null = null;
  showIsNotDigitMessage: boolean;
  imageProfileFileName: string | undefined;
  imageProfile: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userService: UsersService,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<AddNewUserDialogComponent>
  ) {}

  ngOnInit() {
    this.imageFormGroup = this.formBuilder.group({
      imageFileUpload: [''],
    });
    this.nameFormGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
    });
    this.addressFormGroup = this.formBuilder.group({
      address: ['', Validators.required],
    });
    this.usernameFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
    });
    this.emailFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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
    this.stateZipCodeFormGroup = this.formBuilder.group({
      zip: ['', Validators.required],
      state: ['', Validators.required],
    });
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
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

  openSaveChangesConfirmDialog() {
    this.dialog.open(SaveChangesDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
      data: {
        formData: {
          email: this.emailFormGroup.get('email')?.value,
          username: this.usernameFormGroup.get('username')?.value,
          firstName: this.nameFormGroup.get('firstname')?.value,
          lastName: this.nameFormGroup.get('lastname')?.value,
          password: this.passwordFormGroup.get('password')?.value,
          address: this.addressFormGroup.get('address')?.value,
          zipCode: this.stateZipCodeFormGroup.get('zip')?.value,
          state: this.stateZipCodeFormGroup.get('state')?.value,
          isActive: true,
          phone: this.phoneFormGroup.get('phone')?.value,
          dateOfBirth: this.dateBirthFormGroup.get('dateBirth')?.value,
          pnc: this.pncFormGroup.get('pnc')?.value,
          licenseValid: true,
          imageUrl: this.imageProfile,
        },
      },
    });
  }

  registerNewUser() {
    const formData = {
      email: this.emailFormGroup.get('email')?.value,
      username: this.usernameFormGroup.get('username')?.value,
      firstName: this.nameFormGroup.get('firstname')?.value,
      lastName: this.nameFormGroup.get('lastname')?.value,
      password: this.passwordFormGroup.get('password')?.value,
      address: this.addressFormGroup.get('address')?.value,
      zipCode: this.stateZipCodeFormGroup.get('zip')?.value,
      state: this.stateZipCodeFormGroup.get('state')?.value,
      isActive: true,
      phone: this.phoneFormGroup.get('phone')?.value,
      dateOfBirth: this.dateBirthFormGroup.get('dateBirth')?.value,
      pnc: this.pncFormGroup.get('pnc')?.value,
      licenseValid: true,
      imageUrl: this.imageProfile,
    };

    this.userService.registerNewUser(formData).subscribe({
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

  closeAddNewUserDialog() {
    this.dialogRef.close();
  }

  openConfirmCloseDialog() {
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
      this.passwordFormGroup.get('password')?.value ===
      this.passwordFormGroup.get('confirmPassword')?.value
    );
  }
}
