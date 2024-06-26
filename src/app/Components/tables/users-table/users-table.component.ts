import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EnumUsersTable } from 'src/app/enums/enum-users-table';
import { User } from 'src/app/interfaces/user';
import { UserEditDialogComponent } from '../../dialogs/user-edit-dialog/user-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { Subject, takeUntil } from 'rxjs';
import { DeleteUserAccountConfirmationDialogComponent } from '../../dialogs/confirmation-dialogs/delete-user-account-confirmation-dialog/delete-user-account-confirmation-dialog.component';

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
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.activatedRoute.data
      .pipe(takeUntil(this.destroy$))
      .subscribe((values: any) => {
        const usersWithFullName = values.users.map((user: any) => {
          return {
            ...user,
            fullname: user.lastName + ' ' + user.firstName,
            numberOfVehciles: user.vehiclesRegistered.length,
          };
        });
        this.dataSource.data = usersWithFullName;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openEditUserDialog(userId: number) {
    this.usersService
      .getMyAccount(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.dialog.open(UserEditDialogComponent, {
          width: '40%',
          height: '98%',
          data: user,
        });
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
