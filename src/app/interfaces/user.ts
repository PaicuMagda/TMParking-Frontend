import { Role } from '../enums/roles';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: Role;
  address: string;
  zipCode: number;
  state: string;
  isActive: boolean;
  phone: number;
  dateOfBirth: Date;
  pnc: number;
  vehiclesRegistered: string;
  licenseValid: boolean;
  isEdit?: boolean;
}
