import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SaveChangesDialogComponent } from '../confirmation-dialogs/save-changes-dialog/save-changes-dialog.component';
import { ConfirmCloseDialogComponent } from '../confirmation-dialogs/confirm-close-dialog/confirm-close-dialog.component';
import { UsersService } from 'src/app/services/users.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  vehicleRegisteredFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  imageUrl: string;
  showIsNotDigitMessage: boolean;
  file: File | null = null;
  imageId = 23;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UsersService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddNewUserDialogComponent>
  ) {}

  ngOnInit() {
    this.downloadImageDisplay();
    this.imageFormGroup = this.formBuilder.group({
      image: [''],
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
    this.vehicleRegisteredFormGroup = this.formBuilder.group({
      vehiclesRegistered: [''],
    });
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;

  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];

  //     if (file.type.match('image.*')) {
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         this.imageUrl = reader.result;
  //       };

  //       reader.readAsDataURL(file);
  //     } else {
  //       console.log('Fișierul încărcat nu este o imagine.');
  //     }
  //   }
  // }

  downloadImage(imageId: number): Observable<Blob> {
    return this.http.get(`https://localhost:7010/api/Files/${imageId}`, {
      responseType: 'blob',
    });
  }

  downloadImageDisplay() {
    this.downloadImage(this.imageId).subscribe((imageData: Blob) => {
      const imageUrl = URL.createObjectURL(imageData);
      this.imageUrl = imageUrl;
    });
  }

  // onFileSelect(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.imageFormGroup.get('image')?.setValue(file);
  //   }
  // }

  onSubmit() {
    const formData = new FormData();

    const selectedFile = this.onFileChange();
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    formData.append('file', this.imageFormGroup.get('image')?.value);
    formData.append('firstname', this.nameFormGroup.get('firstname')?.value);
    formData.append('lastname', this.nameFormGroup.get('lastname')?.value);
    formData.append('address', this.addressFormGroup.get('address')?.value);
    formData.append('username', this.usernameFormGroup.get('username')?.value);
    formData.append('email', this.emailFormGroup.get('email')?.value);
    formData.append('pnc', this.pncFormGroup.get('pnc')?.value);
    formData.append('phone', this.phoneFormGroup.get('phone')?.value);
    formData.append(
      'dateBirth',
      this.dateBirthFormGroup.get('dateBirth')?.value
    );
    formData.append('zip', this.stateZipCodeFormGroup.get('zip')?.value);
    formData.append('state', this.stateZipCodeFormGroup.get('state')?.value);
    formData.append(
      'vehiclesRegistered',
      this.vehicleRegisteredFormGroup.get('vehiclesRegistered')?.value
    );
    formData.append('password', this.passwordFormGroup.get('password')?.value);
    formData.append(
      'confirmPassword',
      this.passwordFormGroup.get('confirmPassword')?.value
    );

    this.http
      .post<any>('https://localhost:7010/api/Files/upload', formData)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }

  onFileChange(): File | null {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      return fileInput.files[0];
    }
    return null;
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
          ...this.imageFormGroup.value,
          ...this.nameFormGroup.value,
          ...this.usernameFormGroup.value,
          ...this.addressFormGroup.value,
          ...this.emailFormGroup.value,
          ...this.pncFormGroup.value,
          ...this.pncFormGroup.value,
          ...this.dateBirthFormGroup.value,
          ...this.stateZipCodeFormGroup.value,
          ...this.vehicleRegisteredFormGroup.value,
          ...this.passwordFormGroup.value,
        },
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
