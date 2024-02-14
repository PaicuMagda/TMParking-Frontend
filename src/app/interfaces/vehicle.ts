import { User } from './user';

export interface Vehicle {
  idVehicle: number;
  imageUrl?: string;
  make?: string;
  model?: string;
  color?: string;
  year?: number;
  owner: User;
  vehicleIdentificationNumber?: number;
  isEdit?: boolean;
  vehicleRegistrationCertificate?: string;
  isVerifiedByAdmin: boolean;
  dateAdded: Date;
  somethingIsWrong: boolean;
}
