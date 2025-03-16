// shared/types/index.ts
export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  requiresPermission: boolean;
  contactInfo?: string;
  description?: string;
  imageUrl?: string | null;
}

export interface LocationFormData {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  requiresPermission: boolean;
  contactInfo?: string;
  description?: string;
  imageUrl?: string | null;
}
