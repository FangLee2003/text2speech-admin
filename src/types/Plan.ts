// src/types/Plan.ts
export interface Plan {
  id: number;
  name: string;
  credit: number;
  hour: string;
  price: number;
  status: string;
  month?: string;
  description?: string;
  days?: number;
  createdDate?: string;
  updatedDate?: string;
}