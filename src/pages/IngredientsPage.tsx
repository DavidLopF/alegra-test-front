// src/pages/IngredientsPage.tsx
import { useEffect, useState } from 'react';
import { fetchInventory } from '../services/api';
import { updateInventory } from '../services/warehouse.service';
import { IngredientTable } from '../components/IngredientTable';
import type { InventoryItem } from '../types/inventory';

import {
  Button,
  Modal,
  Label,
  Select,
  TextInput
} from 'flowbite-react';

export default function IngredientsPage() {
  const [data, setData]       = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  // Modal
  const [showModal, setShowModal]           = useState(false);
  const [selectedId, setSelectedId]         = useState<number | undefined>(undefined);
  const [deltaStr, setDeltaStr]             = useState<string>('');
  const [updating, setUpdating]             = useState(false);
  const [updateError, setUpdateError]       = useState<string | null>(null);

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

  const openModal = () => {
    setSelectedId(data[0]?.ingredientId);
    setDeltaStr('');
    setUpdateError(null);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleUpdate = async () => {
    if (!selectedId) return;
    const delta = parseInt(deltaStr, 10);
    if (isNaN(delta)) {
      setUpdateError('Ingresa un número válido');
      return;
    }
    setUpdating(true);
    setUpdateError(null);
    try {
      await updateInventory(selectedId, delta);
      await load();        // refresca la tabla
      closeModal();
    } catch (e) {
      setUpdateError((e as Error).message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Inventario de Ingredientes</h1>

      {loading && <div>Cargando inventario…</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && (
        <>
          <Button onClick={openModal} className="mb-4 text-white bg-blue-600 hover:bg-blue-700">
            Actualizar stock
          </Button>

          <IngredientTable data={data} />
        </>
      )}

      <Modal show={showModal} onClose={closeModal}>
        <Modal.Header>Actualizar Stock</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="ingredient-select" value="Ingrediente" />
              <Select
                id="ingredient-select"
                value={selectedId}
                onChange={e => setSelectedId(Number(e.target.value))}
              >
                {data.map(item => (
                  <option key={item.ingredientId} value={item.ingredientId}>
                    {item.name} (Disponible: {item.available})
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="delta-input" value="Delta (+/-)" />
              <TextInput
                id="delta-input"
                type="number"
                value={deltaStr}
                onChange={e => setDeltaStr(e.target.value)}
                placeholder="Ej. 20 o -5"
              />
            </div>
            {updateError && (
              <div className="text-red-600">{updateError}</div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleUpdate}
            disabled={updating}
            color="success"
          >
            {updating ? 'Guardando…' : 'Guardar'}
          </Button>
          <Button
            color="gray"
            onClick={closeModal}
            disabled={updating}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
