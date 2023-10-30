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

  constructor(
    private formBuider: FormBuilder,
    private authentication: AuthenticationService,
    private toast: NgToastService
  ) {
    this.createAccountForm = this.formBuider.group({
      email: ['', [Validators.required, Validators.email]],
      username: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]{4,30}$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  register() {
    this.authentication.registerUser(this.createAccountForm.value).subscribe({
      next: (resp) => {
        this.toast.info({
          detail: 'Info Message',
          summary: resp.message,
          duration: 5000,
        });
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
