
// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  loyaltyPoints: number;
  totalWashes: number;
}

// Authentication related types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// Transaction types
export interface Transaction {
  id: string;
  userId: string;
  date: string;
  totalWeight: number; // in kg
  machines: Machine[];
  hasIroning: boolean;
  hasDelivery: boolean;
  discounts: Discount[];
  totalPrice: number;
  location: string;
  status: TransactionStatus;
}

export type TransactionStatus = 
  | "pending" 
  | "in-progress" 
  | "completed" 
  | "cancelled";

export interface Machine {
  id: string;
  name: string;
  capacity: number;
}

export interface Discount {
  id: string;
  name: string;
  percentage: number;
}

// Pickup request types
export interface PickupRequest {
  id: string;
  userId: string;
  status: PickupStatus;
  pickupAddress: string;
  pickupTime: string;
  estimatedDeliveryTime: string;
  notes: string;
  trackingCode: string;
}

export type PickupStatus = 
  | "pending" 
  | "accepted" 
  | "on-the-way" 
  | "picked-up" 
  | "processing" 
  | "out-for-delivery" 
  | "delivered" 
  | "cancelled";
