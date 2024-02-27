import { User } from './user';

export interface Vehicle {
  vehicleId?: number;
  imageProfileBase64?: string;
  make?: string;
  model?: string;
  color?: string;
  year?: number;
  vehicleOwner: User;
  vehicleIdentificationNumber?: number;
  isEdit?: boolean;
  vehicleRegistrationCertificate?: string;
  isVerifiedByAdmin?: boolean;
  dateAdded: Date;
  somethingIsWrong?: boolean;
  vehicleOwnerFullName?: string;
}
