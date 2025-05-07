import { useEffect, useState } from 'react';
import { fetchOrders } from '../services/api';
import { OrderTable } from '../components/OrderTable';
import { Order } from '../types/order';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error al cargar órdenes:', error);
    }
  };

  useEffect(() => {
    loadOrders(); // Carga inicial
    
    const interval = setInterval(loadOrders, 5000); // Actualiza cada 5 segundos
    
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Órdenes Actuales</h1>
      <OrderTable orders={orders} />
    </div>
  );
}
