
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
  hasIroning: boolean;
  serviceType: ServiceType;
  price: number;
}

export type ServiceType = "standard" | "express";

export type PickupStatus = 
  | "pending" 
  | "confirmed"
  | "on-the-way" 
  | "picked-up" 
  | "processing"
  | "out-for-delivery" 
  | "delivered" 
  | "cancelled";

// Tarif types
export interface Tarif {
  id: string;
  name: string;
  description: string;
  price: number;
  isPromotion: boolean;
}

// Site types
export interface Site {
  id: string;
  name: string;
  address: string;
  phone: string;
  openingHours: string;
}
