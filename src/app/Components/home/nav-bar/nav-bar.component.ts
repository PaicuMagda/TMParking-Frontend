import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TmParkingInfoDialogComponent } from '../../dialogs/tm-parking-info-dialog/tm-parking-info-dialog.component';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LogoutDialogComponent } from '../../dialogs/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private sidenavService: NavbarService,
    private auth: AuthenticationService
  ) {}

  isLogin: boolean = false;

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

  toggleSidenav() {
    this.sidenavService.openClose();
    console.log('S-a deschis!');
  }

  logout() {
    this.dialog.open(LogoutDialogComponent, {
      width: '30%',
      height: '20%',
      position: { top: '5%' },
    });
  }

  ngOnInit() {
    this.isLogin = this.auth.isLoggedIn();
  }
}
