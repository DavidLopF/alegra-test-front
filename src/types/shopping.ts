export interface ShoppingIngredient {
  ingredientId: number;
  ingredientName: string;
  quantity: number;
  quantity_missing: number;
  price: number;
  _id: string;
}

export interface ShoppingHistory {
  _id: string;
  ingredients: ShoppingIngredient[];
  total_price: number;
  date: string;
  createdAt: string;
  updatedAt: string;
} 