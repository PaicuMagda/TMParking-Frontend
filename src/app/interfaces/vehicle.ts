export interface Vehicle {
  imageUrl?: string;
  make?: string;
  model?: string;
  color?: string;
  year?: number;
  ownerId?: number;
  vehicleIdentificationNumber?: number;
  isEdit?: boolean;
  vehicleRegistrationCertificate?: string;
  isVerifiedByAdmin: boolean;
  dateAdded: Date;
  somethingIsWrong: boolean;
}
