import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { SaveChangesDialogComponent } from '../dialogs/confirmation-dialogs/save-changes-dialog-vehicle/save-changes-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { Role } from 'src/app/enums/roles';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { DeleteUserAccountConfirmationDialogComponent } from '../dialogs/confirmation-dialogs/delete-user-account-confirmation-dialog/delete-user-account-confirmation-dialog.component';
import { NgToastService } from 'ng-angular-popup';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss'],
})
export class UsersAdminComponent implements OnInit {
  parkingPlaces: any[] = [];
  users: User[] = [];
  userId: number | null = null;
  userFormGroup: FormGroup[] = [];
  vehicles: Vehicle[] = [];
  roles: any[];
  role: string = '';
  isLoading: boolean = true;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private userStore: UserStoreService,
    private toast: NgToastService
  ) {}

  editUser(index: number) {
    const user = this.users[index];
    user.isEdit = !user.isEdit;

    const userForm = this.userFormGroup[index];
    userForm.patchValue({
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      address: user.address,
      role: user.role,
      zipCode: user.zipCode,
      state: user.state,
      isActive: user.isActive,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
    });
  }

  openSaveChangesConfirmDialog(idUser: number, index: number) {
    const userData = this.userFormGroup[index].value;
    const dialogRef = this.dialog.open(SaveChangesDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
      data: { userData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'save') {
        this.usersService
          .updateUser(idUser, userData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (resp) => {
              this.toast.info({
                detail: 'Info Message',
                summary: resp.message,
                duration: 3000,
              });
            },
            error: (err) => {
              this.toast.error({
                detail: 'Error Message',
                summary: err.error.message,
                duration: 5000,
              });
            },
          });
        this.users[index].isEdit = false;
      } else if (result === 'close') {
        this.users[index].isEdit = false;
        dialogRef.close();
      }
    });
  }

  openDeleteConfirmDialog(idUser: number) {
    this.dialog.open(DeleteUserAccountConfirmationDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
      data: {
        message: 'Are you sure you want to delete this user account ?',
        idUser: idUser,
      },
    });
  }

  createFormGroup(user: User): FormGroup {
    return this.formBuilder.group({
      firstname: [user.firstName],
      lastname: [user.lastName],
      email: [user.email],
      address: [user.address],
      validDriverLicense: [user.licenseValid],
      role: [user.role],
      zipCode: [user.zipCode],
      state: [user.state],
      isActive: [user.isActive],
      phone: [user.phone],
      dateOfBirth: [user.dateOfBirth],
      pnc: [user.pnc],
      numberVehiclesRegistered: [[]],
      imageUrl: [user.imageUrl],
    });
  }

  isUserNew(user: User): boolean {
    // const currentDate = new Date().getDate();
    // const dateAddedUser = user.dateAdded.getTime();
    // const differenceInDays = Math.floor(
    //   (currentDate - dateAddedUser) / (1000 * 60 * 60 * 24)
    // );
    // return differenceInDays <= 3;
    return true;
  }

  ngOnInit() {
    this.roles = Object.keys(Role);

    this.usersService
      .getUsersForAdminPage()
      .pipe(
        takeUntil(this.destroy$),
        map((users) => {
          users.forEach((user) => {
            user.isEdit = false;
            this.isLoading = false;
          });
          return users;
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: User[]) => {
        this.users = users;
        this.users.forEach((user) => {
          this.userFormGroup.push(this.createFormGroup(user));
        });
      });
    this.userStore
      .getRoleFromStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        const roleFromToken = this.authenticationService.getRoleFromToken();
        this.role = val || roleFromToken;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
