import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  ngOnInit() {
    this.emailFormGroup = this.formBuilder.group({
      email: [''],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
