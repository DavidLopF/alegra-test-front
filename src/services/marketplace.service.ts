import { ShoppingHistory } from '../types/shopping';

const API = import.meta.env.VITE_API_URL;

export async function fetchShoppingHistory(): Promise<ShoppingHistory[]> {
  const res = await fetch(`${API}/marketplace/shopping`);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  return res.json();
} 