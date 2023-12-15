import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AddNewParkingSpaceDialogComponent } from '../dialogs/add-new-parking-space-dialog/add-new-parking-space-dialog.component';
import { LoginRequiredDialogComponent } from '../dialogs/confirmation-dialogs/login-required-dialog/login-required-dialog.component';
import { AddNewVehicleDialogComponent } from '../dialogs/add-new-vehicle-dialog/add-new-vehicle-dialog.component';
import { AddNewUserDialogComponent } from '../dialogs/add-new-user-dialog/add-new-user-dialog.component';

@Component({
  selector: 'app-display-cards',
  templateUrl: './display-cards.component.html',
  styleUrls: ['./display-cards.component.scss'],
})
export class DisplayCardsComponent {
  role: string = '';
  toggleButtonValue: string = 'allParkingSpaces';
  isLogin: boolean = false;

  @ViewChild('myProfile') sidenav!: MatSidenav;
  @Input() inputSideNav!: MatSidenav;
  fullName: string = '';

  constructor(
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
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
    });
  }

  openAddNewVehicleDialog() {
    this.dialog.open(AddNewVehicleDialogComponent, {
      width: '40%',
      height: '98%',
    });
  }

  openAddNewUserDialog() {
    this.dialog.open(AddNewUserDialogComponent, {
      width: '40%',
      height: '98%',
    });
  }

  openEndCloseMyProfile() {
    this.sidenav.toggle();
  }

  ngOnInit() {
    this.isLogin = this.auth.isLoggedIn();
    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
}
