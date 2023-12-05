import { Injectable } from '@angular/core';
import { Vehicle } from '../interfaces/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor() {}

  vehicles: Vehicle[] = [
    {
      imageUrl: '../../../assets/images/car.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/car.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/car.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/car.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/car.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/car.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/car.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
    {
      imageUrl: '../../../assets/images/car.jpg',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2019,
      owner: 'John Doe',
      vehicleIdentificationNumber: 123456789,
    },
  ];
}
