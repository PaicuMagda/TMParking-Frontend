import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
    private authentication: AuthenticationService,
    private router: Router,
    private toast: NgToastService
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
    this.authentication.login(this.loginForm.value).subscribe({
      next: (resp) => {
        this.toast.success({
          detail: 'Success Message',
          summary: resp.message,
          duration: 5000,
        });

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
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

  showPasswordChange() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {}
}
