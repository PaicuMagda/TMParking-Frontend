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

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update-user/${id}`, user);
  }

  users: User[] = [
    {
      id: 0,
      firstName: 'Magda',
      lastName: 'Paicu',
      email: 'john@example.com',
      role: Role.USER,
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
      isVerifiedByAdmin: true,
      dateAdded: new Date('2024-02-11'),
      vehicles: [
        {
          vehicleId: 0,
          imageProfileBase64: '../../../assets/images/vehicles/bmv.jpg',
          make: 'Toyota',
          model: 'Audi',
          color: 'Silver',
          year: 2001,
          vehicleOwner: {
            id: 0,
            firstName: 'Magda',
            lastName: 'Paicu',
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
            isVerifiedByAdmin: false,
            dateAdded: new Date('2024-02-11'),
            vehicles: [],
          },
          vehicleIdentificationNumber: 1234543789,
          isVerifiedByAdmin: true,
          somethingIsWrong: true,
          dateAdded: new Date('1990-01-01'),
        },
        {
          vehicleId: 1,
          imageProfileBase64: '../../../assets/images/vehicles/bmw2.jpg',
          make: 'kwgffetg',
          model: 'Corolla',
          color: 'Golden',
          year: 1874,
          vehicleOwner: {
            id: 0,
            firstName: 'Magda',
            lastName: 'Paicu',
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
            isVerifiedByAdmin: false,
            dateAdded: new Date('2024-02-11'),
            vehicles: [],
          },
          vehicleIdentificationNumber: 4253659,
          isVerifiedByAdmin: true,
          dateAdded: new Date('1990-01-01'),
          somethingIsWrong: false,
        },
        {
          vehicleId: 2,
          imageProfileBase64: '../../../assets/images/vehicles/car-default.jpg',
          make: 'jfyuj',
          model: 'BMW',
          color: 'Silver',
          year: 2019,
          vehicleOwner: {
            id: 0,
            firstName: 'Magda',
            lastName: 'Paicu',
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
            isVerifiedByAdmin: false,
            dateAdded: new Date('2024-02-11'),
            vehicles: [],
          },
          vehicleIdentificationNumber: 123456789,
          isVerifiedByAdmin: true,
          dateAdded: new Date('1990-01-01'),
          somethingIsWrong: false,
        },
      ],
    },
    {
      id: 1,
      firstName: 'Ana',
      lastName: 'Dinica',
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
      isVerifiedByAdmin: false,
      dateAdded: new Date('2024-02-11'),
      vehicles: [
        {
          imageProfileBase64: '../../../assets/images/vehicles/bmw2.jpg',
          make: 'afdf',
          model: 'Corolla',
          color: 'Red',
          year: 2019,
          vehicleOwner: {
            id: 0,
            firstName: 'Magda',
            lastName: 'Paicu',
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
            isVerifiedByAdmin: false,
            dateAdded: new Date('2024-02-11'),
            vehicles: [],
          },
          vehicleIdentificationNumber: 123456789,
          isVerifiedByAdmin: true,
          dateAdded: new Date('1990-01-01'),
          somethingIsWrong: false,
          vehicleId: 5,
        },
        {
          imageProfileBase64: '../../../assets/images/vehicles/tractor.jpg',
          make: 'mymngch',
          model: 'ghdkh',
          color: 'White',
          year: 2005,
          vehicleOwner: {
            id: 0,
            firstName: 'Magda',
            lastName: 'Paicu',
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
            isVerifiedByAdmin: false,
            dateAdded: new Date('2024-02-11'),
            vehicles: [],
          },
          vehicleIdentificationNumber: 123456789,
          isVerifiedByAdmin: true,
          dateAdded: new Date('1990-01-01'),
          somethingIsWrong: false,
          vehicleId: 6,
        },
      ],
    },
    {
      id: 2,
      firstName: 'Dan',
      lastName: 'Ionescu',
      email: 'john@example.com',
      role: Role.USER,
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
      isVerifiedByAdmin: true,
      dateAdded: new Date('2024-02-11'),
      vehicles: [
        {
          imageProfileBase64: '../../../assets/images/vehicles/bmv.jpg',
          make: 'Toyota',
          model: 'pmbdgc',
          color: 'Silver',
          year: 2019,
          vehicleOwner: {
            id: 0,
            firstName: 'Magda',
            lastName: 'Paicu',
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
            isVerifiedByAdmin: false,
            dateAdded: new Date('2024-02-11'),
            vehicles: [],
          },
          vehicleIdentificationNumber: 425345,
          isVerifiedByAdmin: true,
          dateAdded: new Date('1990-01-01'),
          somethingIsWrong: false,
          vehicleId: 6,
        },
        {
          imageProfileBase64: '../../../assets/images/vehicles/bmw2.jpg',
          make: 'Toyota',
          model: 'mbfih',
          color: 'Black',
          year: 1996,
          vehicleOwner: {
            id: 0,
            firstName: 'Magda',
            lastName: 'Paicu',
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
            isVerifiedByAdmin: false,
            dateAdded: new Date('2024-02-11'),
            vehicles: [],
          },
          vehicleIdentificationNumber: 542524,
          isVerifiedByAdmin: true,
          dateAdded: new Date('1990-01-01'),
          somethingIsWrong: false,
          vehicleId: 7,
        },
      ],
    },
    {
      id: 3,
      firstName: 'Andrei',
      lastName: 'Vasilescu',
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
      isVerifiedByAdmin: false,
      dateAdded: new Date('2024-02-11'),
      vehicles: [
        {
          imageProfileBase64: '../../../assets/images/vehicles/bmv1.jpg',
          make: 'Toyota',
          model: 'oyrfh',
          color: 'Blue',
          year: 2023,
          vehicleOwner: {
            id: 0,
            firstName: 'Magda',
            lastName: 'Paicu',
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
            isVerifiedByAdmin: false,
            dateAdded: new Date('2024-02-11'),
            vehicles: [],
          },
          vehicleIdentificationNumber: 96988963,
          isVerifiedByAdmin: true,
          dateAdded: new Date('1990-01-01'),
          somethingIsWrong: false,
          vehicleId: 8,
        },
      ],
    },
    {
      id: 4,
      firstName: 'Magda',
      lastName: 'Paicu',
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
      isVerifiedByAdmin: true,
      dateAdded: new Date('2024-02-11'),
      vehicles: [
        {
          imageProfileBase64: '../../../assets/images/vehicles/bmv1.jpg',
          make: 'Toyota',
          model: 'oyrfh',
          color: 'Blue',
          year: 2023,
          vehicleOwner: {
            id: 0,
            firstName: 'Magda',
            lastName: 'Paicu',
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
            isVerifiedByAdmin: false,
            dateAdded: new Date('2024-02-11'),
            vehicles: [],
          },
          vehicleIdentificationNumber: 96988963,
          isVerifiedByAdmin: true,
          dateAdded: new Date('1990-01-01'),
          somethingIsWrong: false,
          vehicleId: 9,
        },
      ],
    },
    {
      id: 5,
      firstName: 'Ana',
      lastName: 'Dinica',
      email: 'john@example.com',
      role: Role.ADMIN,
      address: '123 Main St',
      zipCode: 12345,
      state: 'California',
      isActive: false,
      phone: 36659548,
      dateOfBirth: new Date('1990-01-01'),
      pnc: 1234567890123,
      vehiclesRegistered: 'Car, Truck',
      licenseValid: true,
      imageUrl: '../../../assets/images/users/user2.jpg',
      isVerifiedByAdmin: true,
      dateAdded: new Date('2024-02-11'),
      vehicles: [
        {
          imageProfileBase64: '../../../assets/images/vehicles/bmv1.jpg',
          make: 'Toyota',
          model: 'oyrfh',
          color: 'Blue',
          year: 2023,
          vehicleOwner: {
            id: 0,
            firstName: 'Magda',
            lastName: 'Paicu',
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
            isVerifiedByAdmin: false,
            dateAdded: new Date('2024-02-11'),
            vehicles: [],
          },
          vehicleIdentificationNumber: 96988963,
          isVerifiedByAdmin: true,
          dateAdded: new Date('1990-01-01'),
          somethingIsWrong: false,
          vehicleId: 10,
        },
      ],
    },
    {
      id: 6,
      firstName: 'Dan',
      lastName: 'Ionescu',
      email: 'john@example.com',
      role: Role.ADMIN,
      address: '123 Main St',
      zipCode: 12345,
      state: 'Romania',
      isActive: false,
      phone: 1234567890,
      dateOfBirth: new Date('1990-01-01'),
      pnc: 1234567890123,
      vehiclesRegistered: 'Car, Truck',
      licenseValid: false,
      imageUrl: '../../../assets/images/users/user3.jpg',
      isVerifiedByAdmin: false,
      dateAdded: new Date('2024-02-11'),
      vehicles: [
        {
          imageProfileBase64: '../../../assets/images/vehicles/bmv1.jpg',
          make: 'Toyota',
          model: 'oyrfh',
          color: 'Blue',
          year: 2023,
          vehicleOwner: {
            id: 0,
            firstName: 'Magda',
            lastName: 'Paicu',
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
            isVerifiedByAdmin: false,
            dateAdded: new Date('2024-02-11'),
            vehicles: [],
          },
          vehicleIdentificationNumber: 96988963,
          isVerifiedByAdmin: true,
          dateAdded: new Date('1990-01-01'),
          somethingIsWrong: false,
          vehicleId: 11,
        },
      ],
    },
    {
      id: 7,
      firstName: 'Andrei',
      lastName: 'Vasilescu',
      email: 'magda@example.com',
      role: Role.ADMIN,
      address: '123 Main St',
      zipCode: 12345,
      state: 'Franta',
      isActive: false,
      phone: 99568472,
      dateOfBirth: new Date('1990-01-01'),
      pnc: 1234567890123,
      vehiclesRegistered: 'Car, Truck',
      licenseValid: true,
      imageUrl: '../../../assets/images/users/user4.jpg',
      isVerifiedByAdmin: false,
      dateAdded: new Date('2024-02-11'),
      vehicles: [
        {
          imageProfileBase64: '../../../assets/images/vehicles/bmv1.jpg',
          make: 'Toyota',
          model: 'oyrfh',
          color: 'Blue',
          year: 2023,
          vehicleOwner: {
            id: 0,
            firstName: 'Magda',
            lastName: 'Paicu',
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
            isVerifiedByAdmin: false,
            dateAdded: new Date('2024-02-11'),
            vehicles: [],
          },
          vehicleIdentificationNumber: 96988963,
          isVerifiedByAdmin: true,
          dateAdded: new Date('1990-01-01'),
          somethingIsWrong: false,
          vehicleId: 12,
        },
      ],
    },
  ];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }
}
