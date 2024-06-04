import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TabTitle } from 'src/app/enums/tab-title';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';
import { UsersService } from 'src/app/services/users.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { User } from 'src/app/interfaces/user';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { Subject, takeUntil } from 'rxjs';
import { Reservation } from 'src/app/interfaces/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  activeTable: string[] = [];
  activeTabIndex: number = 0;
  @ViewChild('matTabGroup') matTabGroup!: ElementRef;

  constructor(
    private parkingSpacesService: ParkingPlacesService,
    private usersService: UsersService,
    private vehiclesService: VehiclesService,
    private reservationsService: ReservationsService
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
      case 3:
        this.exportReservationsCsvFile();
        break;
      default:
        break;
    }
  }

  private exportCsvParkingSpacesFile() {
    this.parkingSpacesService
      .getParkingSpaces()
      .pipe(takeUntil(this.destroy$))
      .subscribe((values) => {
        const data: any[] = values;
        const formula: string = 'parking-spaces';

        const dataForCSVFile = data.map((parkingSpaces) => ({
          name: parkingSpaces.name,
          address: parkingSpaces.address,
          availableParkingSpaces: parkingSpaces.availableParkingSpaces,
          startDate: parkingSpaces.startDate,
          endDate: parkingSpaces.endDate,
          withPayment: !parkingSpaces.isFree,
          VideoSurveilance: parkingSpaces.isVideoSurveilance,
          cargoVehicle: parkingSpaces.isCargoVehicleAccepted,
          personalVehicle: parkingSpaces.isPersonalVehicleAccepted,
          agriculturalMachinery: parkingSpaces.isAgriculturalMachineryAccepted,
          publicTransport: parkingSpaces.isPublicTransportAccepted,
        }));

        var options = {
          fieldSeparator: ';',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: false,
          noDownload: false,
          showTitle: false,
          useBom: false,
        };
        const fileInfo = new ngxCsv(dataForCSVFile, formula, options);
      });
  }

  private exportCsvUsersFile() {
    this.usersService
      .getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((values) => {
        const formula: string = 'users';
        const data: User[] = values;

        const dataForCSVFile = data.map((user) => ({
          firstname: user.firstName,
          lastname: user.lastName,
          address: user.email,
          phone: user.phone,
          numberOfVehicleResgistered: user.vehiclesRegistered.length,
        }));
        var options = {
          fieldSeparator: ';',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: false,
          noDownload: false,
          showTitle: false,
          useBom: false,
        };
        const fileInfo = new ngxCsv(dataForCSVFile, formula, options);
      });
  }

  private exportVehiclesCsvFile() {
    this.vehiclesService.vehicles$
      .pipe(takeUntil(this.destroy$))
      .subscribe((values) => {
        const data: Vehicle[] = values;

        const dataForCSVFile = data.map((vehicle) => ({
          vehicleIdentificationNumber: vehicle.vehicleIdentificationNumber,
          owner: vehicle.vehicleOwner,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          color: vehicle.color,
        }));

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
        const fileInfo = new ngxCsv(dataForCSVFile, formula, options);
      });
  }

  private exportReservationsCsvFile() {
    this.reservationsService.reservations$
      .pipe(takeUntil(this.destroy$))
      .subscribe((values) => {
        const data: any[] = values;

        const dataForCSVFile = data.map((reservation) => ({
          parkingSpaceName: reservation.parkingSpaceName,
          parkingLotName: reservation.parkingLotName,
          vehicleOwner: reservation.vehicleOwner,
          owner: reservation.providerParkingSpace,
          startDate: reservation.startTime,
          endDate: reservation.endTime,
        }));

        const formula: string = 'reservations';
        var options = {
          fieldSeparator: ';',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: false,
          noDownload: false,
          showTitle: false,
          useBom: false,
        };
        const fileInfo = new ngxCsv(dataForCSVFile, formula, options);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.activeTable = this.parseEnumToArray(TabTitle);
  }
}
