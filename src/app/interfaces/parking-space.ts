export interface ParkingSpace {
  id: number;
  name: string;
  owner: string;
  address: string;
  locuriDisponibile: number;
  imageUrl: string;
  isCargoVehicles: boolean;
  isTruck: boolean;
  isAgriculturalMachinery: boolean;
  isPublicTransport: boolean;
  startDate: Date;
  endDate: Date;
  isFree: boolean;
  isVideoSurveillance: boolean;
  description: string;
  paidParking?: boolean;
  isDraft?: boolean;
}
