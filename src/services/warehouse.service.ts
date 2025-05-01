
const API = import.meta.env.VITE_API_URL;

export async function updateInventory(
  ingredientId: number,
  delta: number
): Promise<void> {
  const res = await fetch(
    `${API}/warehouse/inventory/${ingredientId}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ delta })
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }
}
