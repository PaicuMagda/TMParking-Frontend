import { Component, Inject } from '@angular/core';
import { ConfirmCloseDialogComponent } from '../confirmation-dialogs/confirm-close-dialog/confirm-close-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { NgToastService } from 'ng-angular-popup';
import { SaveChangesDialogComponent } from '../confirmation-dialogs/save-changes-dialog-vehicle/save-changes-dialog.component';
import { Subject, from, switchMap, takeUntil } from 'rxjs';
@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss'],
})
export class UserEditDialogComponent {
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
  imageProfile: string = '';
  imageProfileFileName: string | undefined;
  showIsNotDigitMessage: boolean;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userService: UsersService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserEditDialogComponent>
  ) {}

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

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result: string) => {
          console.log(result);
          if (result === 'save') {
            return this.userService.updateUser(idUser, formData);
          } else {
            return from([]);
          }
        })
      )
      .subscribe({
        next: (resp) => {
          this.toast.info({
            detail: 'Info Message',
            summary: resp.message,
            duration: 3000,
          });
          this.dialogRef.close();
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

  closeEditDialogComponent() {
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
          }),
            300;
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.nameFormGroup = this.formBuilder.group({
      firstname: [this.data.firstName, Validators.required],
      lastname: [this.data.lastName, Validators.required],
    });
    this.addressFormGroup = this.formBuilder.group({
      address: [this.data.address, Validators.required],
    });
    this.emailFormGroup = this.formBuilder.group({
      email: [this.data.email, Validators.required],
    });
    this.pncFormGroup = this.formBuilder.group({
      pnc: [this.data.pnc, Validators.required],
    });
    this.phoneFormGroup = this.formBuilder.group({
      phone: [this.data.phone, Validators.required],
    });
    this.dateBirthFormGroup = this.formBuilder.group({
      dateBirth: [this.data.dateOfBirth],
    });
    this.stateZipCode = this.formBuilder.group({
      zip: [this.data.zipCode, Validators.required],
      state: [this.data.state, Validators.required],
    });
    this.usernameFormGroup = this.formBuilder.group({
      username: [this.data.username],
    });
    this.imageProfileFormGroup = this.formBuilder.group({
      imageProfile: [''],
    });
    this.imageProfile = this.data.imageUrl;
    this.changePasswordFormGroup = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }
}
