import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
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
    if (this.loginForm.valid) {
      this.authentication.login(this.loginForm.value).subscribe(
        // next: (resp) => {
        //   alert(resp.message);
        //   this.loginForm.reset();
        //   this.router.navigate(['/home']);
        //   console.log(resp);
        // },
        // error: (err) => {
        //   alert(err?.error.message);
        // },
        (resp) => console.log(resp)
      );
    }
  }

  showPasswordChange() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {}
}
