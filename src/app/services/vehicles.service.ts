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
      imageUrl: '../../../assets/images/vehicles/bmv.jpg',
      make: 'Toyota',
      model: 'Audi',
      color: 'Silver',
      year: 2001,
      owner: 'John Doe',
      vehicleIdentificationNumber: 1234543789,
    },
    {
      imageUrl: '../../../assets/images/vehicles/bmw2.jpg',
      make: 'kwgffetg',
      model: 'Corolla',
      color: 'Golden',
      year: 1874,
      owner: 'Ionescu Alex',
      vehicleIdentificationNumber: 4253659,
    },
    {
      imageUrl: '../../../assets/images/vehicles/car-default.jpg',
      make: 'jfyuj',
      model: 'BMW',
      color: 'Silver',
      year: 2019,
      owner: 'Paicu Lidia',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/vehicles/bmw2.jpg',
      make: 'afdf',
      model: 'Corolla',
      color: 'Red',
      year: 2019,
      owner: 'Dinica Ana',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/vehicles/tractor.jpg',
      make: 'mymngch',
      model: 'ghdkh',
      color: 'White',
      year: 2005,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/vehicles/bmv.jpg',
      make: 'Toyota',
      model: 'pmbdgc',
      color: 'Silver',
      year: 2019,
      owner: 'Vasilescu Vlad',
      vehicleIdentificationNumber: 425345,
    },
    {
      imageUrl: '../../../assets/images/vehicles/bmw2.jpg',
      make: 'Toyota',
      model: 'mbfih',
      color: 'Black',
      year: 1996,
      owner: 'John Doe',
      vehicleIdentificationNumber: 542524,
    },
    {
      imageUrl: '../../../assets/images/vehicles/bmv1.jpg',
      make: 'Toyota',
      model: 'oyrfh',
      color: 'Blue',
      year: 2023,
      owner: 'Magda',
      vehicleIdentificationNumber: 96988963,
    },
  ];

  getAllVehicle(): Observable<Vehicle[]> {
    return of(this.vehicles);
  }
}
