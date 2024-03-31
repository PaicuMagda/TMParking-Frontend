import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ConfirmationParkingSpaceExpiredDialogComponent } from '../dialogs/confirmation-parking-space-expired-dialog/confirmation-parking-space-expired-dialog.component';
import { LoginRequiredDialogComponent } from '../dialogs/confirmation-dialogs/login-required-dialog/login-required-dialog.component';
import { DisplayCardsService } from 'src/app/services/display-cards.service';
import { Subject, takeUntil } from 'rxjs';
import { ParkingSpace } from 'src/app/interfaces/parking-space';
import { DeleteParkingSpacesConfirmationDialogComponent } from '../dialogs/confirmation-dialogs/delete-parking-spaces-confirmation-dialog/delete-parking-spaces-confirmation-dialog/delete-parking-spaces-confirmation-dialog.component';
import { ParkingSpacesDialogEditComponent } from '../dialogs/parking-spaces-dialog-edit/parking-spaces-dialog-edit.component';

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
  idUserLogged: string = '';

  openDeleteConfirmDialog(parkingSpacesId: number) {
    this.dialog.open(DeleteParkingSpacesConfirmationDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
      data: {
        message: 'Are you sure you want to delete this parking spaces ?',
        parkingSpacesId: parkingSpacesId,
      },
    });
  }

  openEditDialog(idParkingSpace: number) {
    this.parkingSpacesService
      .getParkingSpacesById(idParkingSpace)
      .subscribe((values) => {
        this.dialog.open(ParkingSpacesDialogEditComponent, {
          width: '100%',
          height: '85%',
          position: {
            top: '5%',
          },
          data: values,
        });
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
          this.parkingSpacesService
            .getMyParkingSpaces(this.idUserLogged)
            .subscribe((values) => {
              this.parkingSpaces = values;
            });
          this.toggleValue = value;
        }
        if (value === 'allParkingSpaces') {
          this.parkingSpacesService.getParkingSpaces().subscribe((values) => {
            this.parkingSpaces = values;
          });
          this.toggleValue = value;
        }
      });
  }

  isParkingNew(parkingSpace: ParkingSpace): boolean {
    // const currentDate = new Date().getDate();
    // const dateAddedParkingSpace = parkingSpace.dateAdded.getTime();
    // const differenceInDays = Math.floor(
    //   (currentDate - dateAddedParkingSpace) / (1000 * 60 * 60 * 24)
    // );
    // return differenceInDays <= 3;
    return true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.isLogin = this.authenticationService.isLoggedIn();
    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.authenticationService.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    this.userStore.getIdUserFromStore().subscribe((val) => {
      let userIdFromToken = this.authenticationService.getUserIdFromToken();
      this.idUserLogged = val || userIdFromToken;
    });
    this.getParkingSpaces();
  }
}
