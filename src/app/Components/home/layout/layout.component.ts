import { Input } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { MatSidenav } from '@angular/material/sidenav';
import { AddNewParkingSpaceDialogComponent } from 'src/app/Components/dialogs/add-new-parking-space-dialog/add-new-parking-space-dialog.component';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginRequiredDialogComponent } from '../../dialogs/login-required-dialog/login-required-dialog.component';
import { AddNewVehicleDialogComponent } from '../../dialogs/add-new-vehicle-dialog/add-new-vehicle-dialog.component';
import { AddNewUserDialogComponent } from '../../dialogs/add-new-user-dialog/add-new-user-dialog.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  parkingPlaces: any[] = [];
  role: string = '';
  allParkingSpaces: string = 'allParkingSpaces';
  isLogin: boolean = false;

  @ViewChild('myProfile') sidenav!: MatSidenav;
  @Input() inputSideNav!: MatSidenav;
  fullName: string = '';

  constructor(
    private _parkingPlaces: ParkingPlacesService,
    private dialog: MatDialog,
    private userStore: UserStoreService,
    private auth: AuthenticationService
  ) {}

  openAddNewParkingDialogFunction() {
    if (this.isLogin) {
      this.openAddNewParkingDialog();
    } else {
      this.openRequiredLogedInDialog();
    }
  }

  openAddNewVehicleDialogFunction() {
    if (this.isLogin) {
      this.openAddNewVehicleDialog();
    } else {
      this.openRequiredLogedInDialog();
    }
  }

  openAddNewParkingDialog() {
    this.dialog.open(AddNewParkingSpaceDialogComponent, {
      width: '100%',
      height: '85%',
    });
  }

  openRequiredLogedInDialog() {
    this.dialog.open(LoginRequiredDialogComponent, {
      width: '30%',
      height: '40%',
      position: { top: '5%' },
    });
  }

  openAddNewVehicleDialog() {
    this.dialog.open(AddNewVehicleDialogComponent, {
      width: '45%',
      height: '98%',
    });
  }

  openAddNewUserDialog() {
    this.dialog.open(AddNewUserDialogComponent, {
      width: '45%',
      height: '98%',
    });
  }

  openEndCloseMyProfile() {
    this.sidenav.toggle();
  }

  ngOnInit() {
    this.isLogin = this.auth.isLoggedIn();
    this.parkingPlaces = this._parkingPlaces.getParcari();

    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
}
