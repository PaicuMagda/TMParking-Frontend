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
import { MatDialog } from '@angular/material/dialog';
import { ParkingSpace } from 'src/app/interfaces/parking-space';
import { ParkingSpacesDialogEditComponent } from '../../dialogs/parking-spaces-dialog-edit/parking-spaces-dialog-edit.component';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parking-space-table',
  templateUrl: './parking-space-table.component.html',
  styleUrls: ['./parking-space-table.component.scss'],
})
export class ParkingSpaceTableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<ParkingSpace>();
  private destroy$: Subject<void> = new Subject<void>();
  parkingSpacesDisplayedColumns: string[] = Object.values(
    EnumParkingSpacesTable
  );

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('tableRef', { static: false }) tableRef!: ElementRef;

  constructor(
    private parkingSpacesService: ParkingPlacesService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntil(this.destroy$))
      .subscribe((values) => {
        this.dataSource.data = values['parkingSpaces'];
      });
  }

  openEditParkingSpace(idParkingSpace: number) {
    this.parkingSpacesService
      .getParkingSpacesById(idParkingSpace)
      .pipe(takeUntil(this.destroy$))
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
