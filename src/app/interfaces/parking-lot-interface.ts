import { Reservation } from './reservation';

export interface ParkingLotInterface {
  name: string;
  availability: string;
  parkingSpacesId: number;
  reservations: Reservation[];
  parkingLotId: number;
  startDate: Date;
  endDate: Date;
}
