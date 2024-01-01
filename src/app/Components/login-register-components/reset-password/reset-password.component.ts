import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  resetPassword: FormGroup;
  isPasswordValid: boolean = false;
  isMinLengthValid: boolean = false;
  isLowerCaseValid: boolean = false;
  isUpperCaseValid: boolean = false;
  isSpecialCharValid: boolean = false;

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
  }
}
