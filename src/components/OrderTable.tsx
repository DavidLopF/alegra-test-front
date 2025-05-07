import { Order } from '../types/order';
import { Badge, Table } from 'flowbite-react';

interface Props {
  orders: Order[];
}

function statusBadge(status: string) {
  switch (status) {
    case 'REQUESTED':
      return <Badge color="info">Solicitado</Badge>;
    case 'PENDING':
      return <Badge color="warning">Pendiente</Badge>;
    case 'COOKED':
      return <Badge color="success">Plato Cocinado</Badge>;
    case 'FAILED_STOCK':
      return <Badge color="failure">No hay stock disponible</Badge>;
    default:
      return <Badge color="gray">{status}</Badge>;
  }
}

export function OrderTable({ orders }: Props) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head className="bg-gray-50">
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Receta n°</Table.HeadCell>
          <Table.HeadCell>Cantidad</Table.HeadCell>
          <Table.HeadCell>Fecha</Table.HeadCell>
          <Table.HeadCell>Estado</Table.HeadCell>
          <Table.HeadCell>Acciones</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {orders.map((o) => (
            <Table.Row key={o.id} className="bg-white hover:bg-gray-50">
              <Table.Cell>{o.id}</Table.Cell>

              <Table.Cell>
                {o.items.map((i) => `receta n° ${i.recipeId}`).join(', ')}
              </Table.Cell>

              <Table.Cell>
                {o.items.map((i) => i.quantity).join(', ')}
              </Table.Cell>

              <Table.Cell>
                {new Date(o.createdAt).toLocaleString()}
              </Table.Cell>

              <Table.Cell>
                {statusBadge(o.status)}
              </Table.Cell>

              <Table.Cell className="space-x-2">
                {o.status !== 'COOKED' && (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-sm text-gray-600">Procesando...</span>
                  </div>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
