export interface Vehicle {
  licensePlate: string;
  entryTime: Date;
}

export interface ParkingSpotData {
  id: number;
  isOccupied: boolean;
  vehicle: Vehicle | null;
}
