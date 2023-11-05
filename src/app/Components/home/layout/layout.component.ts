import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { AddNewParkingSpaceDialogComponent } from 'src/app/Components/dialogs/add-new-parking-space-dialog/add-new-parking-space-dialog.component';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginRequiredDialogComponent } from '../../dialogs/login-required-dialog/login-required-dialog.component';

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

  ngOnInit() {
    this.isLogin = this.auth.isLoggedIn();
    this.parkingPlaces = this._parkingPlaces.getParcari();

    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
}
