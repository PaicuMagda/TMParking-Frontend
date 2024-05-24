import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Subject, takeUntil } from 'rxjs';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.scss'],
})
export class RecoverAccountComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  email: string = '';
  emailFormGroup: FormGroup;
  isValidEmail: boolean;
  resetPasswordEmail: string = '';

  constructor(
    private resetPassword: ResetPasswordService,
    private toast: NgToastService,
    private formBuilder: FormBuilder
  ) {}

  sendEmail() {
    this.resetPassword
      .sendResetPasswordLink(this.emailFormGroup.get('email')?.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp) => {
          this.toast.success({
            detail: 'Success Message',
            summary: resp.message,
            duration: 3000,
          });
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

  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend() {
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      this.resetPasswordEmail = '';
    }
  }

  ngOnInit() {
    this.emailFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
