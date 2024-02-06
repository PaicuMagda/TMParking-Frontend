import { ParkingStatus } from '../enums/parking-status';

export interface ParkingSpot {
  id: number;
  spotNumber: string;
  isReserved: ParkingStatus;
}
