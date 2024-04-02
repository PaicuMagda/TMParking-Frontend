import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TmParkingInfoDialogComponent } from '../dialogs/tm-parking-info-dialog/tm-parking-info-dialog.component';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LogoutDialogComponent } from '../dialogs/confirmation-dialogs/logout-dialog/logout-dialog.component';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UsersService } from 'src/app/services/users.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  isLogin: boolean = false;
  fullName: string = '';
  role: string = '';
  userId: string;
  userLogged: any;
  @Input() showSearch: boolean = false;
  image: string = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private auth: AuthenticationService,
    private userStore: UserStoreService,
    private sidenavService: NavbarService,
    private userService: UsersService
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
    this.sidenavService.showSearch$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.showSearch = val;
      });
  }

  getImage() {
    this.userService
      .getMyAccount(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => (this.image = val.imageUrl));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.changeShowSearch();
    this.isLogin = this.auth.isLoggedIn();
    this.userStore
      .getFullNameFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        let fullNameFromToken = this.auth.getFullNameFromToken();
        this.fullName = val || fullNameFromToken;
      });
    this.userStore
      .getRoleFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      });
    this.userStore
      .getIdUserFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        let userIdFromToken = this.auth.getUserIdFromToken();
        this.userId = userIdFromToken || val;
      });
    this.userService
      .getMyAccount(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((values) => {
        this.userLogged = values;
      });

    this.getImage();
  }
}
