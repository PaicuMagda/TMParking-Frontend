import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private authentication: AuthenticationService
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
    if (this.createAccountForm.valid) {
      this.authentication.registerUser(this.createAccountForm.value).subscribe({
        next: (resp) => {
          alert(resp.message);
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
      console.log(this.createAccountForm.value);
    } else {
      console.log(this.createAccountForm.value);
    }
  }
}
