import { ShoppingHistory } from '../types/shopping';
import { Table } from 'flowbite-react';

interface Props {
  history: ShoppingHistory[];
}

export function ShoppingHistoryTable({ history }: Props) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Fecha</Table.HeadCell>
          <Table.HeadCell>Ingredientes</Table.HeadCell>
          <Table.HeadCell>Precio Total</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {history.map((item) => (
            <Table.Row key={item._id} className="bg-white hover:bg-gray-50">
              <Table.Cell>
                {new Date(item.date).toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                <ul className="list-disc list-inside">
                  {item.ingredients.map((ingredient) => (
                    <li key={ingredient._id}>
                      {ingredient.ingredientName} - Cantidad solicitada: {ingredient.quantity} - 
                      stock en warehouse: {ingredient.quantity_missing} - 
                      productos comprados : {ingredient.quantity - ingredient.quantity_missing} - 
                      Precio: ${ingredient.price.toLocaleString()}
                    </li>
                  ))}
                </ul>
              </Table.Cell>
              <Table.Cell>
                ${item.total_price.toLocaleString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
} 