export interface Reservation {
  vehicleOwner: string;
  parkingLotName: number;
  parkingSpaceName: number;
  startDate: Date;
  endDate: Date;
  providerName: string;
  vehicleNumber: string;
}
