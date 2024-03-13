import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { SaveChangesDialogComponent } from '../dialogs/confirmation-dialogs/save-changes-dialog/save-changes-dialog.component';
import { DeleteConfirmationDialogComponent } from '../dialogs/confirmation-dialogs/delete-vehicle-confirmation-dialog/delete-confirmation-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { Role } from 'src/app/enums/roles';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { DeleteUserAccountConfirmationDialogComponent } from '../dialogs/confirmation-dialogs/delete-user-account-confirmation-dialog/delete-user-account-confirmation-dialog.component';

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

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private userStore: UserStoreService
  ) {}

  editUser(index: number) {
    const user = this.users[index];
    user.isEdit = !user.isEdit;
    const userForm = this.userFormGroup[index];
    userForm.patchValue({
      firstname: user.firstName,
      lastname: user.lastName,
      emailAddress: user.email,
      address: user.address,
      role: user.role,
      zipCode: user.zipCode,
      state: user.state,
      isActive: user.isActive,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      numberVehiclesRegistered: user.vehicles,
    });
  }

  // updateUser(index: number) {
  //   const user = this.users[index];
  //   const userForm = this.userFormGroup[index];

  //   const updatedUser: User = {
  //     id: index,
  //     firstName: userForm.value.firstname,
  //     lastName: userForm.value.lastname,
  //     email: userForm.value.emailAddress,
  //     address: userForm.value.address,
  //     role: userForm.value.role,
  //     zipCode: userForm.value.zipCode,
  //     state: userForm.value.state,
  //     isActive: userForm.value.isActive,
  //     phone: userForm.value.phone,
  //     dateOfBirth: userForm.value.dateOfBirth,
  //     vehiclesRegistered: userForm.value.numberVehiclesRegistered,
  //   };

  //   this.usersService.updateUser(user.id, updatedUser).subscribe(
  //     (response) => {
  //       console.log('Utilizatorul a fost actualizat cu succes:', response);
  //     },
  //     (error) => {
  //       console.error('Eroare la actualizarea utilizatorului:', error);
  //     }
  //   );
  // }

  openSaveChangesConfirmDialog(idUser: number) {
    const userData = this.userFormGroup[idUser].value;
    const dialogRef = this.dialog.open(SaveChangesDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
      data: { userData },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'save' || result === 'close') {
        this.users[idUser].isEdit = false;
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
      emailAddress: [user.email],
      address: [user.address],
      validDriverLicense: [user.licenseValid],
      role: [user.role],
      zipCode: [user.zipCode],
      state: [user.state],
      isActive: [user.isActive],
      phone: [user.phone],
      dateOfBirth: [user.dateOfBirth],
      personalNumericalCode: [user.pnc],
      numberVehiclesRegistered: [[]],
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
    this.usersService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      this.users.forEach((user) => {
        this.userFormGroup.push(this.createFormGroup(user));
      });
    });
    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.authenticationService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
}
