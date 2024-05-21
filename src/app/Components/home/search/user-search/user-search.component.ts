import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent implements OnInit {
  roles: string[] = ['Administrator', 'User'];

  filteredUserForm: FormGroup;
  initialUsers: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {
    this.filteredUserForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      registeredVehicle: [''],
      pnc: [''],
      phone: [''],
      numberOfVehicleRegistered: [''],
      state: [''],
      role: [''],
      zipCode: [''],
    });
  }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe((users) => {
      this.initialUsers = users;
    });

    this.filteredUserForm.valueChanges.subscribe((filters) => {
      this.applyFilters(filters);
    });
  }

  applyFilters(filters: any) {
    console.log(filters);
    let filteredUsers = this.initialUsers;
    if (filters.firstname) {
      filteredUsers = filteredUsers.filter((user) =>
        user.firstName?.toLowerCase().includes(filters.firstname.toLowerCase())
      );
    }
    if (filters.lastname) {
      filteredUsers = filteredUsers.filter((user) =>
        user.lastName?.toLowerCase().includes(filters.lastname.toLowerCase())
      );
    }
    if (filters.email) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    if (filters.pnc) {
      filteredUsers = filteredUsers.filter((user) =>
        user.pnc?.toLowerCase().includes(filters.pnc.toLowerCase())
      );
    }
    if (filters.phone) {
      filteredUsers = filteredUsers.filter((user) =>
        user.phone?.toLowerCase().includes(filters.phone.toLowerCase())
      );
    }
    if (filters.state) {
      filteredUsers = filteredUsers.filter((user) =>
        user.state?.toLowerCase().includes(filters.state.toLowerCase())
      );
    }
    if (filters.role) {
      filteredUsers = filteredUsers.filter((user) =>
        user.role?.toLowerCase().includes(filters.role.toLowerCase())
      );
    }

    if (filters.zipCode && !isNaN(filters.zipCode)) {
      const zipCode = Number(filters.zipCode);
      filteredUsers = filteredUsers.filter((user) => user.zipCode === zipCode);
    }

    if (filters.registeredVehicle) {
      filteredUsers = filteredUsers.filter((user) =>
        user.vehiclesRegistered.includes(filters.registeredVehicle)
      );
      console.log(filteredUsers);
    }

    if (
      filters.numberOfVehicleRegistered &&
      !isNaN(filters.numberOfVehicleRegistered)
    ) {
      const numberOfVehicleRegistered = Number(
        filters.numberOfVehicleRegistered
      );
      filteredUsers = filteredUsers.filter(
        (user) => user.vehiclesRegistered.length === numberOfVehicleRegistered
      );
    }
    this.usersService.updateUsers(filteredUsers);
  }
}
