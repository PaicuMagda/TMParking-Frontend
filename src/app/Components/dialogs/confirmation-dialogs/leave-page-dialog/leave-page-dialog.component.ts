import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-leave-page-dialog',
  templateUrl: './leave-page-dialog.component.html',
  styleUrls: ['./leave-page-dialog.component.scss'],
})
export class LeavePageDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<LeavePageDialogComponent>,
    private router: Router
  ) {}

  confirmLeavePageDialog() {
    this.dialogRef.close();
    this.router.navigate(['/home']);
  }

  closeLeavePageDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
