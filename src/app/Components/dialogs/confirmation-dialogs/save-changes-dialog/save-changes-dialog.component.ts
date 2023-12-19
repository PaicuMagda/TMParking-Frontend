import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-save-changes-dialog',
  templateUrl: './save-changes-dialog.component.html',
  styleUrls: ['./save-changes-dialog.component.scss'],
})
export class SaveChangesDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<SaveChangesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  closeSaveChangesDialog() {
    this.dialogRef.close();
  }

  saveData() {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
