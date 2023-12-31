import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { Role } from '../enums/roles';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = 'https://localhost:7010/api/User';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  users: User[] = [
    {
      id: 0,
      firstname: 'Magda',
      lastname: 'Paicu',
      email: 'john@example.com',
      role: Role.ADMIN,
      address: '123 Main St',
      zipCode: 12345,
      state: 'California',
      isActive: true,
      phone: 1234567890,
      dateOfBirth: new Date('1990-01-01'),
      pnc: 58623332,
      vehiclesRegistered: 'Car, Truck',
      licenseValid: true,
      imageUrl: '../../../assets/images/users/user1.jpg',
    },
    {
      id: 1,
      firstname: 'Ana',
      lastname: 'Dinica',
      email: 'john@example.com',
      role: Role.ADMIN,
      address: '123 Main St',
      zipCode: 12345,
      state: 'USA',
      isActive: true,
      phone: 2465863,
      dateOfBirth: new Date('1990-01-01'),
      pnc: 1234567890123,
      vehiclesRegistered: 'Car, Truck',
      licenseValid: true,
      imageUrl: '../../../assets/images/users/user2.jpg',
    },
    {
      id: 2,
      firstname: 'Dan',
      lastname: 'Ionescu',
      email: 'john@example.com',
      role: Role.ADMIN,
      address: '123 Main St',
      zipCode: 12345,
      state: 'Belgia',
      isActive: true,
      phone: 1234567890,
      dateOfBirth: new Date('1990-01-01'),
      pnc: 1234567890123,
      vehiclesRegistered: 'Car, Truck',
      licenseValid: false,
      imageUrl: '../../../assets/images/users/user3.jpg',
    },
    {
      id: 3,
      firstname: 'Andrei',
      lastname: 'Vasilescu',
      email: 'john@example.com',
      role: Role.ADMIN,
      address: '123 Main St',
      zipCode: 12345,
      state: 'California',
      isActive: true,
      phone: 1234567890,
      dateOfBirth: new Date('1990-01-01'),
      pnc: 1234567890123,
      vehiclesRegistered: 'Car, Truck',
      licenseValid: true,
      imageUrl: '../../../assets/images/users/user4.jpg',
    },
    {
      id: 4,
      firstname: 'Magda',
      lastname: 'Paicu',
      email: 'john@example.com',
      role: Role.ADMIN,
      address: '123 Main St',
      zipCode: 12345,
      state: 'germania',
      isActive: true,
      phone: 2359773,
      dateOfBirth: new Date('1990-01-01'),
      pnc: 1234567890123,
      vehiclesRegistered: 'Car, Truck',
      licenseValid: false,
      imageUrl: '../../../assets/images/users/user1.jpg',
    },
    {
      id: 5,
      firstname: 'Ana',
      lastname: 'Dinica',
      email: 'john@example.com',
      role: Role.ADMIN,
      address: '123 Main St',
      zipCode: 12345,
      state: 'California',
      isActive: true,
      phone: 36659548,
      dateOfBirth: new Date('1990-01-01'),
      pnc: 1234567890123,
      vehiclesRegistered: 'Car, Truck',
      licenseValid: true,
      imageUrl: '../../../assets/images/users/user2.jpg',
    },
    {
      id: 6,
      firstname: 'Dan',
      lastname: 'Ionescu',
      email: 'john@example.com',
      role: Role.ADMIN,
      address: '123 Main St',
      zipCode: 12345,
      state: 'Romania',
      isActive: true,
      phone: 1234567890,
      dateOfBirth: new Date('1990-01-01'),
      pnc: 1234567890123,
      vehiclesRegistered: 'Car, Truck',
      licenseValid: false,
      imageUrl: '../../../assets/images/users/user3.jpg',
    },
    {
      id: 7,
      firstname: 'Andrei',
      lastname: 'Vasilescu',
      email: 'magda@example.com',
      role: Role.ADMIN,
      address: '123 Main St',
      zipCode: 12345,
      state: 'Franta',
      isActive: true,
      phone: 99568472,
      dateOfBirth: new Date('1990-01-01'),
      pnc: 1234567890123,
      vehiclesRegistered: 'Car, Truck',
      licenseValid: true,
      imageUrl: '../../../assets/images/users/user4.jpg',
    },
  ];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }
}
