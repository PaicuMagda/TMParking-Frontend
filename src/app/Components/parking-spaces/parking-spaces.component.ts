import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { DeleteConfirmationDialogComponent } from '../dialogs/confirmation-dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-parking-spaces',
  templateUrl: './parking-spaces.component.html',
  styleUrls: ['./parking-spaces.component.scss'],
})
export class ParkingSpacesComponent implements OnInit {
  constructor(
    private parkingSpacesService: ParkingPlacesService,
    private dialog: MatDialog
  ) {}

  parkingSpaces: any = [];

  openDeleteConfirmDialog() {
    this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '20%',
      height: '20%',
      position: {
        top: '5%',
      },
    });
  }

  ngOnInit() {
    this.parkingSpaces = this.parkingSpacesService.getParcari();
    console.log(this.parkingSpaces);
  }
}
