
export type ServiceType = "basic" | "detailed";

export type UserSubscription = "standard" | "premium" | null;

export interface Location {
  latitude: number | null;
  longitude: number | null;
  address?: string;
  useAsDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  loyaltyPoints: number;
  totalWashes: number;
  subscription?: UserSubscription;
  isStudent?: boolean;
  monthlyWashedKg?: number;
  defaultLocation?: Location;
}

export interface PickupRequest {
  id: string;
  trackingCode: string;
  userId: string;
  pickupAddress: string;
  pickupLocation?: Location;
  pickupTime: string;
  estimatedDeliveryTime: string;
  serviceType: ServiceType;
  hasIroning: boolean;
  hasExpress: boolean;
  status: "pending" | "confirmed" | "on-the-way" | "picked-up" | "processing" | "out-for-delivery" | "delivered" | "cancelled";
  price: number;
  notes?: string;
}
