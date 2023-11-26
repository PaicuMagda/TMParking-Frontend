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
      firstname: 'John',
      lastname: 'Doe',
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
    },
    {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
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
    },
    {
      id: 2,
      firstname: 'John',
      lastname: 'Doe',
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
    },
    {
      id: 3,
      firstname: 'John',
      lastname: 'Doe',
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
    },
  ];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }
}
