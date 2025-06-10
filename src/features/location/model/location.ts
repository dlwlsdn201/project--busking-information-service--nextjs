// shared/types/index.ts
export interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  requiresApprove: boolean;
  contactInfo?: string;
  description?: string;
  imageUrls?: string[] | null;
}

export interface LocationFormData {
  name: string;
  address: string;
  lat: number;
  lng: number;
  requiresApprove: boolean;
  contactInfo?: string;
  description?: string;
  imageUrl?: string | null;
}
