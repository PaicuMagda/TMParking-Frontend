import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  createAccountForm: FormGroup;

  constructor(private formBuider: FormBuilder) {
    this.createAccountForm = this.formBuider.group({
      email: ['', [Validators.required, Validators.email]],
      username: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]{4,30}$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
