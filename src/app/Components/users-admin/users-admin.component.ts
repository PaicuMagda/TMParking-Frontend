import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss'],
})
export class UsersAdminComponent implements OnInit {
  parkingPlaces: any[] = [];
  users: User[] = [];
  userId: number | null = null;

  constructor(
    private _parkingPlaces: ParkingPlacesService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.parkingPlaces = this._parkingPlaces.getParcari();
  }

  editUser(user: User) {
    user.isEdit = !user.isEdit;
  }
}
