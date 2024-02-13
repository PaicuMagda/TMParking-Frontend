import { Injectable } from '@angular/core';
import { Vehicle } from '../interfaces/vehicle';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor() {}

  vehicles: Vehicle[] = [
    {
      idVehicle: 0,
      imageUrl: '../../../assets/images/vehicles/bmv.jpg',
      make: 'Toyota',
      model: 'Audi',
      color: 'Silver',
      year: 2001,
      ownerId: 0,
      vehicleIdentificationNumber: 1234543789,
      isVerifiedByAdmin: false,
      dateAdded: new Date('2024-02-11'),
      somethingIsWrong: true,
    },
    {
      idVehicle: 1,
      imageUrl: '../../../assets/images/vehicles/bmw2.jpg',
      make: 'kwgffetg',
      model: 'Corolla',
      color: 'Golden',
      year: 1874,
      ownerId: 1,
      vehicleIdentificationNumber: 4253659,
      isVerifiedByAdmin: true,
      dateAdded: new Date('1990-01-01'),
      somethingIsWrong: true,
    },
    {
      idVehicle: 2,
      imageUrl: '../../../assets/images/vehicles/car-default.jpg',
      make: 'jfyuj',
      model: 'BMW',
      color: 'Silver',
      year: 2019,
      ownerId: 2,
      vehicleIdentificationNumber: 123456789,
      isVerifiedByAdmin: true,
      dateAdded: new Date('1990-01-01'),
      somethingIsWrong: true,
    },
    {
      idVehicle: 3,
      imageUrl: '../../../assets/images/vehicles/bmw2.jpg',
      make: 'afdf',
      model: 'Corolla',
      color: 'Red',
      year: 2019,
      ownerId: 3,
      vehicleIdentificationNumber: 123456789,
      isVerifiedByAdmin: false,
      dateAdded: new Date('2024-02-11'),
      somethingIsWrong: false,
    },
    {
      idVehicle: 4,
      imageUrl: '../../../assets/images/vehicles/tractor.jpg',
      make: 'mymngch',
      model: 'ghdkh',
      color: 'White',
      year: 2005,
      ownerId: 4,
      vehicleIdentificationNumber: 123456789,
      isVerifiedByAdmin: false,
      dateAdded: new Date('2024-02-11'),
      somethingIsWrong: false,
    },
    {
      idVehicle: 5,
      imageUrl: '../../../assets/images/vehicles/bmv.jpg',
      make: 'Toyota',
      model: 'pmbdgc',
      color: 'Silver',
      year: 2019,
      ownerId: 5,
      vehicleIdentificationNumber: 425345,
      isVerifiedByAdmin: false,
      dateAdded: new Date('2024-02-11'),
      somethingIsWrong: false,
    },
    {
      idVehicle: 6,
      imageUrl: '../../../assets/images/vehicles/bmw2.jpg',
      make: 'Toyota',
      model: 'mbfih',
      color: 'Black',
      year: 1996,
      ownerId: 6,
      vehicleIdentificationNumber: 542524,
      isVerifiedByAdmin: true,
      dateAdded: new Date('1990-01-01'),
      somethingIsWrong: false,
    },
    {
      idVehicle: 7,
      imageUrl: '../../../assets/images/vehicles/bmv1.jpg',
      make: 'Toyota',
      model: 'oyrfh',
      color: 'Blue',
      year: 2023,
      ownerId: 7,
      vehicleIdentificationNumber: 96988963,
      isVerifiedByAdmin: false,
      dateAdded: new Date('2024-02-11'),
      somethingIsWrong: false,
    },
  ];

  getAllVehicle(): Observable<Vehicle[]> {
    return of(this.vehicles);
  }
}
