import { ParkingSpot } from './parking-spot';
import { User } from './user';

export interface ParkingSpace {
  parkingSpacesId: number;
  name: string;
  address: string;
  availableParkingSpaces: number;
  isCargoVehicleAccepted: boolean;
  isPersonalVehicleAccepted: boolean;
  isPublicTransportAccepted: boolean;
  isAgriculturalMachineryAccepted: boolean;
  imageProfile: string;
  startDate: Date;
  endDate: Date;
  isFree: boolean;
  isVideoSurveilance: boolean;
  description: string;
  paidParking: boolean;
  isDraft?: boolean;
  paymentPerHour: number;
  paymentPerDay: number;
  paymentForSubscription: number;
  dateAdded: Date;
  isVerifiedByAdmin: boolean;
  somethingIsWrong: boolean;
  parkingSpots: ParkingSpot[];
  parkingSpacesOwner: User;
  ownerName: string;
}
