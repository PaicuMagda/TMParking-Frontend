import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ParkingSpace } from '../interfaces/parking-space';
import { ParkingSpot } from '../interfaces/parking-spot';
import { ParkingStatus } from '../enums/parking-status';

@Injectable({
  providedIn: 'root',
})
export class ParkingPlacesService {
  constructor() {}

  parkingSpotsMock: ParkingSpot[] = [
    { id: 1, spotNumber: 1, isReserved: ParkingStatus.AVAILABLE },
    { id: 2, spotNumber: 2, isReserved: ParkingStatus.OCCUPIED },
    { id: 2, spotNumber: 3, isReserved: ParkingStatus.PARTIALLYOCCUPIED },
    { id: 4, spotNumber: 4, isReserved: ParkingStatus.OCCUPIED },
    { id: 5, spotNumber: 5, isReserved: ParkingStatus.PARTIALLYOCCUPIED },
    { id: 6, spotNumber: 6, isReserved: ParkingStatus.AVAILABLE },
    { id: 7, spotNumber: 7, isReserved: ParkingStatus.OCCUPIED },
    { id: 8, spotNumber: 8, isReserved: ParkingStatus.AVAILABLE },
    { id: 9, spotNumber: 9, isReserved: ParkingStatus.AVAILABLE },
    { id: 10, spotNumber: 10, isReserved: ParkingStatus.OCCUPIED },
    { id: 11, spotNumber: 11, isReserved: ParkingStatus.PARTIALLYOCCUPIED },
    { id: 12, spotNumber: 12, isReserved: ParkingStatus.PARTIALLYOCCUPIED },
  ];

  parcari: ParkingSpace[] = [
    {
      id: 0,
      name: 'Parcare Centrală',
      owner: 'John Doe',
      address: 'Centru oraș',
      locuriDisponibile: 100,
      imageUrl: '../../../assets/images/parking-spaces/parcare3.jpg',
      isCargoVehicles: true,
      isTruck: true,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date(),
      endDate: new Date('2024-12-31'),
      isFree: false,
      isVideoSurveillance: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.        Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces         Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.        Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces         Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces ',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },

    {
      id: 1,
      name: 'Parcare Aeroport',
      owner: 'Jane Smith',
      address: 'Aeroport internațional',
      locuriDisponibile: 500,
      imageUrl: '../../../assets/images/parking-spaces/parcare2.jpg',
      isCargoVehicles: false,
      isTruck: true,
      isAgriculturalMachinery: false,
      isPublicTransport: true,
      startDate: new Date(),
      endDate: new Date('2024-12-31'),
      isFree: false,
      isVideoSurveillance: false,
      isDraft: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },

    {
      id: 2,
      name: 'Parcare Subterană',
      owner: 'Alex Johnson',
      address: 'Centru oraș',
      locuriDisponibile: 200,
      imageUrl: '../../../assets/images/parking-spaces/parcare1.jpg',
      isCargoVehicles: true,
      isTruck: true,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date(),
      endDate: new Date('2024-12-31'),
      isFree: false,
      isVideoSurveillance: true,
      isDraft: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 3,
      name: 'Parcare Centrală',
      owner: 'John Doe',
      address: 'Centru oraș',
      locuriDisponibile: 15,
      imageUrl: '../../../assets/images/parking-spaces/parcare4.jpg',
      isCargoVehicles: false,
      isTruck: true,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date(),
      endDate: new Date(),
      isFree: false,
      isVideoSurveillance: false,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 4,
      name: 'Parcare Aeroport',
      owner: 'Jane Smith',
      address: 'Aeroport internațional',
      locuriDisponibile: 500,
      imageUrl: '../../../assets/images/parking-spaces/parcare-etaj.jpg',
      isCargoVehicles: true,
      isTruck: false,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date(),
      endDate: new Date(),
      isFree: true,
      isVideoSurveillance: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 5,
      name: 'Parcare Subterană',
      owner: 'Alex Johnson',
      address: 'Centru oraș',
      locuriDisponibile: 20,
      imageUrl: '../../../assets/images/parking-spaces/parcare5.jpg',
      isCargoVehicles: false,
      isTruck: true,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date('2024-12-31'),
      endDate: new Date(),
      isFree: false,
      isVideoSurveillance: false,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 6,
      name: 'Parcare Centrală',
      owner: 'John Doe',
      address: 'Centru oraș',
      locuriDisponibile: 100,
      imageUrl: '../../../assets/images/parking-spaces/parcare3.jpg',
      isCargoVehicles: true,
      isTruck: true,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date(),
      endDate: new Date('2024-12-31'),
      isFree: false,
      isVideoSurveillance: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 7,
      name: 'Parcare Aeroport',
      owner: 'Jane Smith',
      address: 'Aeroport internațional',
      locuriDisponibile: 500,
      imageUrl: '../../../assets/images/parking-spaces/parcare2.jpg',
      isCargoVehicles: false,
      isTruck: true,
      isAgriculturalMachinery: false,
      isPublicTransport: true,
      startDate: new Date('2024-12-31'),
      endDate: new Date(),
      isFree: false,
      isVideoSurveillance: false,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 7,
      name: 'Parcare Subterană',
      owner: 'Alex Johnson',
      address: 'Centru oraș',
      locuriDisponibile: 200,
      imageUrl: '../../../assets/images/parking-spaces/parcare1.jpg',
      isCargoVehicles: true,
      isTruck: true,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date(),
      endDate: new Date('2024-12-31'),
      isFree: false,
      isVideoSurveillance: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 8,
      name: 'Parcare Centrală',
      owner: 'John Doe',
      address: 'Centru oraș',
      locuriDisponibile: 15,
      imageUrl: '../../../assets/images/parking-spaces/parcare4.jpg',
      isCargoVehicles: true,
      isTruck: true,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date('2024-12-31'),
      endDate: new Date(),
      isFree: false,
      isVideoSurveillance: false,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 9,
      name: 'Parcare Subterană',
      owner: 'Alex Johnson',
      address: 'Centru oraș',
      locuriDisponibile: 200,
      imageUrl: '../../../assets/images/parking-spaces/parcare1.jpg',
      isCargoVehicles: true,
      isTruck: true,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date(),
      endDate: new Date('2024-12-31'),
      isFree: false,
      isVideoSurveillance: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 10,
      name: 'Parcare Centrală',
      owner: 'John Doe',
      address: 'Centru oraș',
      locuriDisponibile: 15,
      imageUrl: '../../../assets/images/parking-spaces/parcare4.jpg',
      isCargoVehicles: true,
      isTruck: true,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date('2024-12-31'),
      endDate: new Date('2024-12-31'),
      isFree: false,
      isVideoSurveillance: false,
      isDraft: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 11,
      name: 'Parcare Centrală',
      owner: 'John Doe',
      address: 'Centru oraș',
      locuriDisponibile: 100,
      imageUrl: '../../../assets/images/parking-spaces/parcare3.jpg',
      isCargoVehicles: true,
      isTruck: true,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date('2024-12-31'),
      endDate: new Date(),
      isFree: false,
      isVideoSurveillance: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 12,
      name: 'Parcare Aeroport',
      owner: 'Jane Smith',
      address: 'Aeroport internațional',
      locuriDisponibile: 500,
      imageUrl: '../../../assets/images/parking-spaces/parcare2.jpg',
      isCargoVehicles: true,
      isTruck: true,
      isAgriculturalMachinery: false,
      isPublicTransport: false,
      startDate: new Date(),
      endDate: new Date(),
      isFree: false,
      isVideoSurveillance: false,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 13,
      name: 'Parcare Subterană',
      owner: 'Alex Johnson',
      address: 'Centru oraș',
      locuriDisponibile: 200,
      imageUrl: '../../../assets/images/parking-spaces/parcare1.jpg',
      isCargoVehicles: true,
      isTruck: true,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date(),
      endDate: new Date('2024-12-31'),
      isFree: false,
      isVideoSurveillance: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 14,
      name: 'Parcare Centrală',
      owner: 'John Doe',
      address: 'Centru oraș',
      locuriDisponibile: 15,
      imageUrl: '../../../assets/images/parking-spaces/parcare4.jpg',
      isCargoVehicles: true,
      isTruck: true,
      isAgriculturalMachinery: false,
      isPublicTransport: true,
      startDate: new Date('2024-12-31'),
      endDate: new Date('2024-12-31'),
      isFree: false,
      isVideoSurveillance: false,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
  ];

  myParkingSpace: ParkingSpace[] = [
    {
      id: 0,
      name: 'Parcare Centrală',
      owner: 'John Doe',
      address: 'Centru oraș',
      locuriDisponibile: 100,
      imageUrl: '../../../assets/images/parking-spaces/parcare3.jpg',
      isCargoVehicles: true,
      isTruck: true,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date(),
      endDate: new Date('2024-12-31'),
      isFree: false,
      isVideoSurveillance: true,
      isDraft: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 1,
      name: 'Parcare Aeroport',
      owner: 'Jane Smith',
      address: 'Aeroport internațional',
      locuriDisponibile: 500,
      imageUrl: '../../../assets/images/parking-spaces/parcare2.jpg',
      isCargoVehicles: false,
      isTruck: true,
      isAgriculturalMachinery: false,
      isPublicTransport: true,
      startDate: new Date(),
      endDate: new Date('2024-12-31'),
      isFree: false,
      isVideoSurveillance: false,
      isDraft: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 2,
      name: 'Parcare Subterană',
      owner: 'Alex Johnson',
      address: 'Centru oraș',
      locuriDisponibile: 200,
      imageUrl: '../../../assets/images/parking-spaces/parcare1.jpg',
      isCargoVehicles: true,
      isTruck: true,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date(),
      endDate: new Date('2024-12-31'),
      isFree: false,
      isVideoSurveillance: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 3,
      name: 'Parcare Centrală',
      owner: 'John Doe',
      address: 'Centru oraș',
      locuriDisponibile: 15,
      imageUrl: '../../../assets/images/parking-spaces/parcare4.jpg',
      isCargoVehicles: false,
      isTruck: true,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date(),
      endDate: new Date(),
      isFree: false,
      isVideoSurveillance: false,
      isDraft: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
    {
      id: 4,
      name: 'Parcare Aeroport',
      owner: 'Jane Smith',
      address: 'Aeroport internațional',
      locuriDisponibile: 500,
      imageUrl: '../../../assets/images/parking-spaces/parcare-etaj.jpg',
      isCargoVehicles: true,
      isTruck: false,
      isAgriculturalMachinery: true,
      isPublicTransport: true,
      startDate: new Date(),
      endDate: new Date(),
      isFree: true,
      isVideoSurveillance: true,
      isDraft: true,
      description:
        'Parking is the act of stopping and disengaging a vehicle and leaving it unoccupied. Parking on one or both sides of a road is often permitted, though sometimes with restrictions. Some buildings have parking facilities for use of the buildings users. Countries and local governments have rules[1] for design and use of parking spaces.',
      parkingSpots: [
        this.parkingSpotsMock[0],
        this.parkingSpotsMock[1],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[2],
        this.parkingSpotsMock[3],
        this.parkingSpotsMock[4],
        this.parkingSpotsMock[5],
        this.parkingSpotsMock[6],
        this.parkingSpotsMock[7],
        this.parkingSpotsMock[8],
        this.parkingSpotsMock[9],
        this.parkingSpotsMock[10],
      ],
    },
  ];

  getParcari(): Observable<ParkingSpace[]> {
    return of(this.parcari);
  }

  getParkingPlaceById(id: any): Observable<any> {
    return this.getParcari().pipe(
      map((values) => {
        return values.find((value) => value.id === id);
      })
    );
  }

  getMyParkingSpace(): Observable<ParkingSpace[]> {
    return of(this.myParkingSpace);
  }
}
