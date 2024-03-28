import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnumParkingSpacesTable } from 'src/app/enums/enum-parking-spaces-table';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { AddNewParkingSpaceDialogComponent } from '../../dialogs/add-new-parking-space-dialog/add-new-parking-space-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ParkingSpace } from 'src/app/interfaces/parking-space';
import { ParkingSpacesDialogEditComponent } from '../../dialogs/parking-spaces-dialog-edit/parking-spaces-dialog-edit.component';

@Component({
  selector: 'app-parking-space-table',
  templateUrl: './parking-space-table.component.html',
  styleUrls: ['./parking-space-table.component.scss'],
})
export class ParkingSpaceTableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<ParkingSpace>();
  parkingSpacesDisplayedColumns: string[] = Object.values(
    EnumParkingSpacesTable
  );

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('tableRef', { static: false }) tableRef!: ElementRef;

  constructor(
    private parkingSpacesService: ParkingPlacesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.parkingSpacesService.getParkingSpaces().subscribe((values) => {
      this.dataSource.data = values;
    });
  }

  openEditParkingSpace(idParkingSpace: number) {
    this.parkingSpacesService
      .getParkingSpacesById(idParkingSpace)
      .subscribe((values) => {
        this.dialog.open(ParkingSpacesDialogEditComponent, {
          width: '100%',
          height: '85%',
          position: {
            top: '5%',
          },
          data: values,
        });
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
