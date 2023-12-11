import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { DeleteConfirmationDialogComponent } from '../dialogs/confirmation-dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Route, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-parking-spaces',
  templateUrl: './parking-spaces.component.html',
  styleUrls: ['./parking-spaces.component.scss'],
})
export class ParkingSpacesComponent implements OnInit {
  constructor(
    private parkingSpacesService: ParkingPlacesService,
    private dialog: MatDialog,
    private router: Router,
    private navbarService: NavbarService
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

  goToParkingSpaceDetails(id: number) {
    this.router.navigate(['/parking-space-details', id]);
    this.navbarService.openDetailParkingSpace();
  }

  ngOnInit() {
    this.parkingSpaces = this.parkingSpacesService.getParcari();
  }
}
