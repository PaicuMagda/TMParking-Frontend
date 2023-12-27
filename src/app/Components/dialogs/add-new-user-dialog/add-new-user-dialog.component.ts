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

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageFormGroup.get('image')?.setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.imageFormGroup.get('image')?.value);

    this.http
      .post<any>('https://localhost:7010/api/Files/upload', formData)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.http
        .post('https://localhost:7010/api/Files/upload', formData)
        .subscribe((resp: any) => {});
    }
  }

  async uploadFile() {
    try {
      if (this.file) {
        const response = await this.userService.uploadFile(this.file);
        console.log('Răspunsul de la server:', response);
        console.log('Fișierul a fost încărcat cu succes!', response);
        // Continuă cu alte acțiuni după încărcarea cu succes
      } else {
        console.error('Nu există un fișier de încărcat!');
      }
    } catch (error) {
      console.error('Eroare la încărcarea fișierului:', error);
      // Gestionează eroarea aici, afișează un mesaj pentru utilizator sau iei alte măsuri
    }
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
