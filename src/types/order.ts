// src/types/order.ts
export interface OrderItem {
    id: number;
    recipeId: number;
    quantity: number;
  }
  export interface Order {
    id: number;
    items: OrderItem[];
    createdAt: string;
    status: string;
    // opcional: status, kitchenStatus, etc.
  }
  
