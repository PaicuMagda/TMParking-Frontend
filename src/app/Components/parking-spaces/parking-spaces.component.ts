import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ConfirmationParkingSpaceExpiredDialogComponent } from '../dialogs/confirmation-parking-space-expired-dialog/confirmation-parking-space-expired-dialog.component';
import { LoginRequiredDialogComponent } from '../dialogs/confirmation-dialogs/login-required-dialog/login-required-dialog.component';
import { DisplayCardsService } from 'src/app/services/display-cards.service';
import { Subject, map, takeUntil } from 'rxjs';
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
  myParkingSpaces: any = [];
  isLogin: boolean;
  role: string = '';
  toggleValue: string;
  private destroy$: Subject<void> = new Subject<void>();
  idUserLogged: string = '';
  isLoading: boolean = true;

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
      .pipe(takeUntil(this.destroy$))
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
    return new Date(endDate) < currentDate;
  }

  getParkingSpaces() {
    this.displayCardsService.toggleValueSubjectObservable
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value === 'myParkingSpaces') {
          this.parkingSpacesService.loadMyParkingSpace(this.idUserLogged);
          this.parkingSpacesService.myParkingSpaceSubject$.subscribe(
            (values) => {
              this.myParkingSpaces = values;
              this.isLoading = false;
            }
          );
          this.toggleValue = value;
        }
        if (value === 'allParkingSpaces' && this.role == 'User') {
          this.parkingSpacesService.loadParkingSpaces();
          this.parkingSpacesService.parkingSpaces$
            .pipe(
              map((spaces) =>
                spaces.filter(
                  (space) =>
                    space.somethingIsWrong == false &&
                    space.isVerifiedByAdmin == true
                )
              )
            )
            .subscribe((values) => {
              this.parkingSpaces = values;
            });
          this.toggleValue = value;
          this.isLoading = false;
        } else {
          this.parkingSpacesService.parkingSpaces$.subscribe((values) => {
            this.parkingSpaces = values;
          });
          this.toggleValue = value;
          this.isLoading = false;
        }
      });
  }

  isParkingNew(parkingSpace: ParkingSpace): boolean {
    const currentDate = new Date().getDate();
    const dateAddedParkingSpace = new Date(parkingSpace.dateAdded).getTime();
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
    this.isLogin = this.authenticationService.isLoggedIn();
    this.userStore
      .getRoleFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        const roleFromToken = this.authenticationService.getRoleFromToken();
        this.role = val || roleFromToken;
      });

    this.userStore
      .getIdUserFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        let userIdFromToken = this.authenticationService.getUserIdFromToken();
        this.idUserLogged = val || userIdFromToken;
      });
    this.getParkingSpaces();
  }
}
