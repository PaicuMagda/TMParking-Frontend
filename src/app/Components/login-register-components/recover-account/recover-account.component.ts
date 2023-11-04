import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.scss'],
})
export class RecoverAccountComponent {
  email: string = '';

  constructor(
    private resetPassword: ResetPasswordService,
    private toast: NgToastService
  ) {}

  sendEmail() {
    this.resetPassword.sendResetPasswordLink(this.email).subscribe({
      next: (resp) => {
        this.toast.success({
          detail: 'Success Message',
          summary: resp.message,
          duration: 3000,
        });
      },
    });
  }
}
