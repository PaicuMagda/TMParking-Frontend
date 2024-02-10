import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { DeleteConfirmationDialogComponent } from '../dialogs/confirmation-dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Router } from '@angular/router';
import { AddNewParkingSpaceDialogComponent } from '../dialogs/add-new-parking-space-dialog/add-new-parking-space-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ConfirmationParkingSpaceExpiredDialogComponent } from '../dialogs/confirmation-parking-space-expired-dialog/confirmation-parking-space-expired-dialog.component';
import { LoginRequiredDialogComponent } from '../dialogs/confirmation-dialogs/login-required-dialog/login-required-dialog.component';
import { DisplayCardsService } from 'src/app/services/display-cards.service';
import { Subject, takeUntil } from 'rxjs';
import { ParkingSpace } from 'src/app/interfaces/parking-space';

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
    private authenticationService: AuthenticationService,
    private userStore: UserStoreService,
    private displayCardsService: DisplayCardsService
  ) {}

  parkingSpaces: any = [];
  isLogin: boolean;
  role: string = '';
  toggleValue: string;
  private destroy$: Subject<void> = new Subject<void>();

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

  openParkingSpaceExpiredConfirmDialog() {
    if (this.isLogin && this.toggleValue) {
      this.dialog.open(ConfirmationParkingSpaceExpiredDialogComponent, {
        width: '23%',
        height: '20%',
        position: {
          top: '5%',
        },
      });
    } else this.openRequiredLogedInDialog();
  }

  goToParkingSpaceDetails(id: number) {
    if (this.isLogin) {
      this.router.navigate(['/parking-space-details', id]);
    } else {
      this.openRequiredLogedInDialog();
    }
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

  parkingSpaceIsExpired(endDate: Date): boolean {
    const currentDate = new Date();
    return endDate < currentDate;
  }

  getParkingSpaces() {
    this.displayCardsService.toggleValueSubjectObservable
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value === 'myParkingSpaces') {
          this.parkingSpacesService.getMyParkingSpace().subscribe((values) => {
            this.parkingSpaces = values;
          });
          this.toggleValue = value;
        }
        if (value === 'allParkingSpaces') {
          this.parkingSpacesService.getParcari().subscribe((values) => {
            this.parkingSpaces = values;
          });
          this.toggleValue = value;
        }
      });
  }

  isParkingNew(parkingSpace: ParkingSpace): boolean {
    const currentDate = new Date().getDate();
    const dateAddedParkingSpace = parkingSpace.dateAdded.getTime();
    const differenceInDays = Math.floor(
      (currentDate - dateAddedParkingSpace) / (1000 * 60 * 60 * 24)
    );
    return differenceInDays <= 3;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.getParkingSpaces();
    this.isLogin = this.authenticationService.isLoggedIn();
    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.authenticationService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
}
