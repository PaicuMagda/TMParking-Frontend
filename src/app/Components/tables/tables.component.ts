import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TabTitle } from 'src/app/enums/tab-title';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { UsersService } from 'src/app/services/users.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { User } from 'src/app/interfaces/user';
import { Vehicle } from 'src/app/interfaces/vehicle';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
  activeTable: string[] = [];
  activeTabIndex: number = 0;

  @ViewChild('matTabGroup') matTabGroup!: ElementRef;

  constructor(
    private parkingSpacesService: ParkingPlacesService,
    private usersService: UsersService,
    private vehiclesService: VehiclesService
  ) {}

  updateTableNumber(activeTabIndex: number) {
    this.activeTabIndex = activeTabIndex;
  }

  parseEnumToArray(enumObj: Object) {
    return Object.values(enumObj);
  }

  exportToCsv(): void {
    switch (this.activeTabIndex) {
      case 0:
        this.exportCsvParkingSpacesFile();
        break;
      case 1:
        this.exportCsvUsersFile();
        break;
      case 2:
        this.exportVehiclesCsvFile();
        break;

      default:
        break;
    }
  }

  private exportCsvParkingSpacesFile() {
    this.parkingSpacesService.getParcari().subscribe((values) => {
      const data: any[] = values;
      const formula: string = 'parking-spaces';

      var options = {
        fieldSeparator: ';',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: false,
        noDownload: false,
        showTitle: false,
        useBom: false,
      };
      const fileInfo = new ngxCsv(data, formula, options);
    });
  }

  private exportCsvUsersFile() {
    this.usersService.getAllUsers().subscribe((values) => {
      const formula: string = 'users';
      const data: User[] = values;
      var options = {
        fieldSeparator: ';',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: false,
        noDownload: false,
        showTitle: false,
        useBom: false,
      };
      const fileInfo = new ngxCsv(data, formula, options);
    });
  }

  private exportVehiclesCsvFile() {
    this.vehiclesService.getAllVehicles().subscribe((values) => {
      const data: Vehicle[] = values;
      const formula: string = 'vehicles';
      var options = {
        fieldSeparator: ';',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: false,
        noDownload: false,
        showTitle: false,
        useBom: false,
      };
      const fileInfo = new ngxCsv(data, formula, options);
    });
  }

  ngOnInit() {
    this.activeTable = this.parseEnumToArray(TabTitle);
  }

  ngAfterViewInit() {}
}
