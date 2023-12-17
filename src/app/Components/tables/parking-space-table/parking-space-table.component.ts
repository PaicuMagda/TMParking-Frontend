import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnumParkingSpacesTable } from 'src/app/enums/enum-parking-spaces-table';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';

@Component({
  selector: 'app-parking-space-table',
  templateUrl: './parking-space-table.component.html',
  styleUrls: ['./parking-space-table.component.scss'],
})
export class ParkingSpaceTableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  parkingSpacesDisplayedColumns: string[] = Object.values(
    EnumParkingSpacesTable
  );

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private parkingSpaceService: ParkingPlacesService) {}

  ngOnInit(): void {
    this.dataSource.data = this.parkingSpaceService.getParcari();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
