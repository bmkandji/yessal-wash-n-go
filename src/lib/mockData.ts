
import { Transaction, User, PickupRequest } from '@/types';

// Mock user data
export const mockUser: User = {
  id: "u1",
  name: "Amadou Diop",
  email: "amadou.diop@example.com",
  phone: "+221 77 123 4567",
  address: "123 Rue Principale, Thiès, Sénégal",
  loyaltyPoints: 7,
  totalWashes: 17
};

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    userId: "u1",
    date: "2025-04-20T14:30:00Z",
    totalWeight: 5.2,
    machines: [
      { id: "m1", name: "Machine à laver 10kg", capacity: 10 }
    ],
    hasIroning: true,
    hasDelivery: false,
    discounts: [
      { id: "d1", name: "Fidélité", percentage: 5 }
    ],
    totalPrice: 3800,
    location: "Yessal Centre-ville, Thiès",
    status: "completed"
  },
  {
    id: "t2",
    userId: "u1",
    date: "2025-04-15T10:15:00Z",
    totalWeight: 3.8,
    machines: [
      { id: "m2", name: "Machine à laver 7kg", capacity: 7 }
    ],
    hasIroning: false,
    hasDelivery: true,
    discounts: [],
    totalPrice: 2900,
    location: "Yessal Nguinth, Thiès",
    status: "completed"
  },
  {
    id: "t3",
    userId: "u1",
    date: "2025-04-05T16:45:00Z",
    totalWeight: 8.3,
    machines: [
      { id: "m1", name: "Machine à laver 10kg", capacity: 10 }
    ],
    hasIroning: true,
    hasDelivery: true,
    discounts: [
      { id: "d2", name: "Promotion du mois", percentage: 10 }
    ],
    totalPrice: 6200,
    location: "Yessal Centre-ville, Thiès",
    status: "completed"
  }
];

// Mock pickup requests
export const mockPickupRequests: PickupRequest[] = [
  {
    id: "p1",
    userId: "u1",
    status: "delivered",
    pickupAddress: "123 Rue Principale, Thiès",
    pickupTime: "2025-04-22T09:30:00Z",
    estimatedDeliveryTime: "2025-04-23T15:00:00Z",
    notes: "Sonnez à l'appartement 3",
    trackingCode: "YSL-P12345"
  },
  {
    id: "p2",
    userId: "u1",
    status: "on-the-way",
    pickupAddress: "123 Rue Principale, Thiès",
    pickupTime: "2025-04-28T10:00:00Z",
    estimatedDeliveryTime: "2025-04-29T16:00:00Z",
    notes: "",
    trackingCode: "YSL-P67890"
  }
];
