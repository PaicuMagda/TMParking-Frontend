import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { DeleteConfirmationDialogComponent } from '../dialogs/confirmation-dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { AddNewParkingSpaceDialogComponent } from '../dialogs/add-new-parking-space-dialog/add-new-parking-space-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserStoreService } from 'src/app/services/user-store.service';

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
    private navbarService: NavbarService,
    private authenticationService: AuthenticationService,
    private userStore: UserStoreService
  ) {}

  parkingSpaces: any = [];
  myParkingSpace: any = [];
  isLogin: boolean;
  role: string = '';

  openDeleteConfirmDialog() {
    this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
    });
  }

  openEditParkingSpaceDialog() {
    this.dialog.open(AddNewParkingSpaceDialogComponent, {
      width: '100%',
      height: '85%',
    });
  }

  goToParkingSpaceDetails(id: number) {
    this.router.navigate(['/parking-space-details', id]);
    this.navbarService.openDetailParkingSpace();
  }

  parkingSpaceIsExpired(endDate: Date): boolean {
    const currentDate = new Date();
    return endDate < currentDate;
  }

  ngOnInit() {
    this.parkingSpaces = this.parkingSpacesService.getParcari();
    this.myParkingSpace = this.parkingSpacesService.getMyParkingSpace();
    this.isLogin = this.authenticationService.isLoggedIn();
    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.authenticationService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
}
