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
  disabled: boolean = true;

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
      firstname: user.firstname,
      lastname: user.lastname,
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
      firstname: [user.firstname],
      lastname: [user.lastname],
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
