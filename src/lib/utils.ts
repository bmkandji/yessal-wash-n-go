
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('fr-SN').format(value);
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

export function formatShortDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };
  
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

export function getStatusProgress(status: string): number {
  const statuses = [
    "pending",
    "accepted",
    "on-the-way",
    "picked-up",
    "processing",
    "out-for-delivery",
    "delivered"
  ];
  
  const index = statuses.indexOf(status);
  if (index === -1) return 0;
  
  return ((index + 1) / statuses.length) * 100;
}
