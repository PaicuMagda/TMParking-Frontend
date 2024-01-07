import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  createAccountForm: FormGroup;
  isPasswordValid: boolean = false;
  isMinLengthValid: boolean = false;
  isLowerCaseValid: boolean = false;
  isUpperCaseValid: boolean = false;
  isSpecialCharValid: boolean = false;

  constructor(
    private formBuider: FormBuilder,
    private authentication: AuthenticationService,
    private toast: NgToastService
  ) {
    this.createAccountForm = this.formBuider.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9@#$%^&+=]).*$'),
        ],
      ],
    });
  }

  checkPassword() {
    const passwordValue = this.createAccountForm.get('password')?.value;
    this.isMinLengthValid = passwordValue.length >= 8;
    this.isLowerCaseValid = /[a-z]/.test(passwordValue);
    this.isUpperCaseValid = /[A-Z]/.test(passwordValue);
    this.isSpecialCharValid = /[0-9@#$%^&+=]/.test(passwordValue);
  }

  register() {
    this.authentication.registerUser(this.createAccountForm.value).subscribe({
      next: (resp) => {
        this.toast.info({
          detail: 'Info Message',
          summary: resp.message,
          duration: 5000,
        });
        console.log(resp);
      },
      error: (err) => {
        this.toast.error({
          detail: 'Error Message',
          summary: err?.error.message,
          duration: 5000,
        });
        console.log(err.message);
      },
    });
  }
}
