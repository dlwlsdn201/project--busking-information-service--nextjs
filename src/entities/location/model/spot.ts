export interface BuskingSpot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  permitRequired: boolean;
  contact: string;
  operatingHours: string;
  electricSupply: boolean;
  images: string[];
  notes: string;
}
