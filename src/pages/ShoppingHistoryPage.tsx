import { useEffect, useState } from 'react';
import { fetchShoppingHistory } from '../services/marketplace.service';
import { ShoppingHistory } from '../types/shopping';
import { ShoppingHistoryTable } from '../components/ShoppingHistoryTable';

export default function ShoppingHistoryPage() {
  const [history, setHistory] = useState<ShoppingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async () => {
    try {
      const data = await fetchShoppingHistory();
      setHistory(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Historial de Compras</h1>
      
      {loading && <div>Cargando historial...</div>}
      {error && <div className="text-red-600">{error}</div>}
      
      {!loading && !error && (
        <ShoppingHistoryTable history={history} />
      )}
    </div>
  );
} 