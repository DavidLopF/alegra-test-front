import { useEffect, useState } from 'react';
import { fetchOrders } from '../services/api';
import { OrderTable } from '../components/OrderTable';
import { Order } from '../types/order';
import { KitchenService } from '../services/ktichen.service';

const kitchenService = new KitchenService();

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);
  const onCooked = async (id:number) => {
    await kitchenService.markOrderAsCooked(id);
    // Refresca la lista de órdenes después de marcar como cocinada
    fetchOrders().then(setOrders);
  };
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Órdenes Actuales</h1>
      <OrderTable orders={orders} onCooked={onCooked}/>
    </div>
  );
}
