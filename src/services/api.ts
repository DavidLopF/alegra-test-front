import {  Order } from "../types/order";
import { InventoryItem } from "../types/inventory";


const API = import.meta.env.VITE_API_URL; // p.ej. http://localhost:3000

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${API}/order`);
  return res.json();
}

export async function createOrder(recipeId: number, quantity: number) {
  const res = await fetch(`${API}/order`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ recipeId, quantity })
  });
  return res.json();
}

export async function markCooked(orderId: number) {
  const res = await fetch(`${API}/order/${orderId}/cooked`, { method:'POST' });
  return res.json();
}

export async function fetchInventory(): Promise<InventoryItem[]> {
  const res = await fetch(`${API}/warehouse/inventory`);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  const body = await res.json() as { status: string; data: InventoryItem[] };
  if (body.status !== 'success') {
    throw new Error(`API Error: ${body.status}`);
  }
  return body.data;
}