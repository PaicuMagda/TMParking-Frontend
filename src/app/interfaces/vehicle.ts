import { User } from './user';

export interface Vehicle {
  showPdfViewer?: boolean;
  vehicleId?: number;
  imageProfileBase64?: string;
  make?: string;
  model?: string;
  color?: string;
  year?: number;
  vehicleOwner: User;
  vehicleIdentificationNumber?: number;
  isEdit?: boolean;
  vehicleRegistrationCertificateBase64?: string;
  isVerifiedByAdmin?: boolean;
  dateAdded: Date;
  somethingIsWrong?: boolean;
  vehicleOwnerFullName?: string;
}
