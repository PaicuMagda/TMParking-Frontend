import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-save-changes-dialog',
  templateUrl: './save-changes-dialog.component.html',
  styleUrls: ['./save-changes-dialog.component.scss'],
})
export class SaveChangesDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<SaveChangesDialogComponent>,
    private userService: UsersService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  closeSaveChangesDialog() {
    this.dialogRef.close('close');
  }

  saveData() {
    this.userService.registerNewUser(this.data).subscribe({
      next: (resp) => {
        this.toast.info({
          detail: 'Info Message',
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
    this.dialogRef.close('save');
  }

  ngOnInit() {
    console.log(this.data);
  }
}
