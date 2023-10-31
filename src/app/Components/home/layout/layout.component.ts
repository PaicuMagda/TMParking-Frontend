import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { AddNewParkingSpaceDialogComponent } from 'src/app/Components/home/add-new-parking-space-dialog/add-new-parking-space-dialog.component';
import { MatSidenav } from '@angular/material/sidenav';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  @Input() inputSideNav!: MatSidenav;
  fullName: string = '';

  openAddNewParkingDialog() {
    this.dialog.open(AddNewParkingSpaceDialogComponent, {
      width: '100%',
      height: '85%',
    });
  }

  ngOnInit() {
    this.isLogin = this.auth.isLoggedIn();
    this.parkingPlaces = this._parkingPlaces.getParcari();
    this.userStore.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
}
