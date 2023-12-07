import { Injectable } from '@angular/core';
import { Vehicle } from '../interfaces/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor() {}

  vehicles: Vehicle[] = [
    {
      imageUrl: '../../../assets/images/vehicles/bmv.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/vehicles/bmw2.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/vehicles/car-default.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/vehicles/bmw2.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/vehicles/tractor.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/vehicles/bmv.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/vehicles/bmw2.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/vehicles/bmv1.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
  ];
}
