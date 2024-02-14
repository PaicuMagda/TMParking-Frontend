import { ParkingSpot } from './parking-spot';
import { User } from './user';

export interface ParkingSpace {
  id: number;
  name: string;
  owner: User;
  address: string;
  availableParkingSpaces: number;
  isCargoVehicleAccepted: boolean;
  isPersonalVehicleAccepted: boolean;
  isPublicTransportAccepted: boolean;
  isAgriculturalMachineryAccepted: boolean;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  isFree: boolean;
  isVideoSurveillance: boolean;
  description: string;
  paidParking?: boolean;
  isDraft?: boolean;
  paymentPerHour: number;
  paymentPerDay: number;
  paymentForSubscription: number;
  dateAdded: Date;
  isVerifiedByAdmin: boolean;
  somethingIsWrong: boolean;
  parkingSpots: ParkingSpot[];
}
