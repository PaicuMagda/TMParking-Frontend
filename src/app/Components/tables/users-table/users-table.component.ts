import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EnumUsersTable } from 'src/app/enums/enum-users-table';
import { User } from 'src/app/interfaces/user';
import { UserEditDialogComponent } from '../../dialogs/user-edit-dialog/user-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  data: User[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((values: any) => {
      const usersWithFullName = values.users.map((user: any) => {
        return {
          ...user,
          fullname: user.lastName + ' ' + user.firstName,
          numberOfVehciles: user.vehicles.length,
        };
      });
      this.dataSource.data = usersWithFullName;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openEditUserDialog() {
    this.dialog.open(UserEditDialogComponent, {
      width: '40%',
      height: '98%',
    });
  }
}
