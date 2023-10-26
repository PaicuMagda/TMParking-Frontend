import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  isFormValid() {
    return this.loginForm.valid;
  }

  login() {
    this.authentication.login(this.loginForm.value).subscribe();
  }

  showPasswordChange() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {}
}
