import { Role } from '../enums/roles';

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  fullName?: string;
  username?: string;
  email?: string;
  role?: Role;
  address?: string;
  zipCode?: number;
  state?: string;
  isActive?: boolean;
  phone?: number;
  dateOfBirth?: Date;
  pnc?: number;
  password?: string;
  licenseValid?: boolean;
  isEdit?: boolean;
  imageUrl?: string;
  isVerifiedByAdmin: boolean;
  addedDate: Date;
  vehiclesRegistered: string[];
  parkingSpacesRegistered: string[];
  reservationsRegistered: Date[];
}
