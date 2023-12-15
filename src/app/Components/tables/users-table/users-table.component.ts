import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnumUsersTable } from 'src/app/enums/enum-users-table';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  displayedColumnsUsersTable: string[] = Object.values(EnumUsersTable);
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe((values) => {
      this.dataSource.data = values;
      this.dataSource.sort = this.sort;
    });
  }
}
