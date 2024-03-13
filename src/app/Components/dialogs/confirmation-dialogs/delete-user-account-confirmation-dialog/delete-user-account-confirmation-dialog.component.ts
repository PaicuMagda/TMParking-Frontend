import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-delete-user-account-confirmation-dialog',
  templateUrl: './delete-user-account-confirmation-dialog.component.html',
  styleUrls: ['./delete-user-account-confirmation-dialog.component.scss'],
})
export class DeleteUserAccountConfirmationDialogComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private dialogRef: MatDialogRef<DeleteUserAccountConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: NgToastService
  ) {}

  closeDeleteDialogConfirmation() {
    this.dialogRef.close();
  }

  deleteUserAccountById() {
    this.userService.deleteUser(this.data.idUser).subscribe({
      next: (resp) => {
        this.toast.info({
          detail: 'Info Message',
          summary: resp.message,
          duration: 3000,
        });
        this.dialogRef.close();
      },
      error: (err) => {
        this.toast.error({
          detail: 'Error Message',
          summary: err.title,
          duration: 3000,
        });
        this.dialogRef.close();
      },
    });
  }

  ngOnInit() {}
}
