// src/pages/IngredientsPage.tsx
import { useEffect, useState } from 'react';
import { fetchInventory } from '../services/api';
import type { InventoryItem } from '../types/inventory';
import { IngredientTable } from '../components/IngredientTable';

export default function IngredientsPage() {
  const [data, setData]       = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await fetchInventory();
      setData(items);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleClick = async () => {
    setRefreshing(true);
    try {
      const items = await fetchInventory();
      setData(items);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="p-8" onClick={handleClick}>
      <h1 className="text-2xl mb-4">Inventario de Ingredientes</h1>

      {loading && <div>Cargando inventario…</div>}
      {refreshing && <div>Actualizando datos...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && (
        <IngredientTable data={data} />
      )}
    </div>
  );
}
