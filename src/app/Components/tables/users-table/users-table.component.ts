import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
export class UsersTableComponent implements OnInit, AfterViewInit {
  displayedColumnsUsersTable: string[] = Object.values(EnumUsersTable);
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe((values) => {
      const usersWithFullName = values.map((user) => {
        return {
          ...user,
          fullname: user.lastname + ' ' + user.firstname,
        };
      });
      this.dataSource.data = usersWithFullName;
    });
    console.log(this.dataSource.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
