import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetPassword } from 'src/app/interfaces/ResetPassword';
import { UsersService } from 'src/app/services/users.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private toast: NgToastService
  ) {}

  resetPassword: FormGroup;
  isPasswordValid: boolean = false;
  isMinLengthValid: boolean = false;
  isLowerCaseValid: boolean = false;
  isUpperCaseValid: boolean = false;
  isSpecialCharValid: boolean = false;
  showNewPassword: boolean = false;
  showNewPasswordConfirm: boolean = false;
  emailToReset: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();
  newPassword: string = '';

  checkPassword() {
    const passwordValue = this.resetPassword.get('newPassword')?.value;
    this.isMinLengthValid = passwordValue.length >= 8;
    this.isLowerCaseValid = /[a-z]/.test(passwordValue);
    this.isUpperCaseValid = /[A-Z]/.test(passwordValue);
    this.isSpecialCharValid = /[0-9@#$%^&+=]/.test(passwordValue);
  }

  matchPassword(): boolean {
    return (
      this.resetPassword.get('newPassword')?.value ===
      this.resetPassword.get('confirmNewPassword')?.value
    );
  }

  showNewPasswordChange() {
    this.showNewPassword = !this.showNewPassword;
  }

  showNewPasswordConfirmChange() {
    this.showNewPasswordConfirm = !this.showNewPasswordConfirm;
  }

  reset() {
    if (this.resetPassword.valid) {
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPassword.value.newPassword;
      this.resetPasswordObj.confirmPassword =
        this.resetPassword.value.confirmNewPassword;
      this.resetPasswordObj.emailToken = this.emailToken;
      const newPassword = this.resetPassword.value.newPassword;

      this.usersService
        .resetPassword(this.emailToReset, newPassword)
        .subscribe({
          next: (resp) => {
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Password Reset Successfully',
              duration: 3000,
            });
          },
          error: () => {
            this.toast.warning({
              detail: 'ERROR',
              summary: 'Something went wrong!',
              duration: 3000,
            });
          },
        });
    } else {
    }
  }

  ngOnInit(): void {
    this.resetPassword = this.formBuilder.group({
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9@#$%^&+=]).*$'),
        ],
      ],
      confirmNewPassword: [''],
    });

    this.activatedRoute.queryParams.subscribe((val) => {
      this.emailToReset = val['email'];
      let uriToken = val['code'];
      this.emailToken = uriToken.replace(/ /g, '+');
      this.emailToken = val['code'];
    });
  }
}
