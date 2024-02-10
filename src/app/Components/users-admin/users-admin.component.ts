import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { SaveChangesDialogComponent } from '../dialogs/confirmation-dialogs/save-changes-dialog/save-changes-dialog.component';
import { DeleteConfirmationDialogComponent } from '../dialogs/confirmation-dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { Role } from 'src/app/enums/roles';

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

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
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

  openSaveChangesConfirmDialog() {
    this.dialog.open(SaveChangesDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
      },
    });
  }

  openDeleteConfirmDialog() {
    this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '23%',
      height: '20%',
      position: {
        top: '5%',
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

  ngOnInit() {
    this.roles = Object.keys(Role);
    this.usersService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.users.forEach((user) => {
        this.userFormGroup.push(this.createFormGroup(user));
      });
    });
  }
}
