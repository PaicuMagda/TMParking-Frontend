import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TmParkingInfoDialogComponent } from '../dialogs/tm-parking-info-dialog/tm-parking-info-dialog.component';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LogoutDialogComponent } from '../dialogs/confirmation-dialogs/logout-dialog/logout-dialog.component';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isLogin: boolean = false;
  fullName: string = '';
  role: string = '';
  @Input() showSearch: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private auth: AuthenticationService,
    private userStore: UserStoreService,
    private sidenavService: NavbarService
  ) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/create-account']);
  }

  openTmParkingInfoDialog() {
    this.dialog.open(TmParkingInfoDialogComponent, {
      width: '80%',
      height: '80%',
    });
  }

  openMyProfileSidenav() {
    this.sidenavService.toggleSidenav(true);
  }

  logout() {
    this.dialog.open(LogoutDialogComponent, {
      width: '23%',
      height: '20%',
      position: { top: '5%' },
    });
  }

  changeShowSearch() {
    this.sidenavService.showSearch$.subscribe((val) => {
      this.showSearch = val;
    });
  }

  ngOnInit() {
    this.changeShowSearch();
    this.isLogin = this.auth.isLoggedIn();
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
