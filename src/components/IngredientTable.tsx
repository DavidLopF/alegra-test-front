// src/components/IngredientTable.tsx
import { InventoryItem } from '../types/inventory';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react';

interface Props { data: InventoryItem[]; }
export function IngredientTable({ data }: Props) {
  return (
    <Table hoverable>
      <TableHead>
        <TableHeadCell>Ingrediente ID</TableHeadCell>
        <TableHeadCell>Nomre</TableHeadCell>
        <TableHeadCell>Disponible</TableHeadCell>
      </TableHead>
      <TableBody>
        {data.map(i=>(
          <TableRow key={i.ingredientId}>
            <TableCell>{i.ingredientId}</TableCell>
            <TableCell>{i.name}</TableCell>
            <TableCell>{i.available}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
