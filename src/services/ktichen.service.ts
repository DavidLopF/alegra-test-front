import { Recipe } from "../types/recipe";

export class KitchenService {
  constructor() {}

  async getRecipes(): Promise<Recipe[]> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/kitchen/recipe`
    );
    const data = await response.json();
    return data;
  }

  async markOrderAsCooked(orderId: number): Promise<void> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/kitchen/cook/internal/completed`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      }
    );
    if (!response.ok) {
      throw new Error('No se pudo marcar la orden como cocinada');
    }
  }
}
