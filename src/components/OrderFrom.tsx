import React, { useState, useEffect } from 'react';
import { createOrder } from '../services/api';
import { KitchenService } from '../services/ktichen.service';
import { Recipe } from '../types/recipe';
import { useNavigate } from 'react-router-dom';

const kitchenService = new KitchenService();

export function OrderForm() {
  const navigate = useNavigate();
  // Mantenemos quantity como string para que el input pueda estar vacío
  const [recipeId, setRecipeId] = useState<number>(1);
  const [quantityStr, setQuantityStr] = useState<string>('');

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const recs = await kitchenService.getRecipes();
      setRecipes(recs);
      if (recs.length > 0) {
        setRecipeId(recs[0].id);
      }
    } catch {
      setError('No se pudieron cargar las recetas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Convertimos el string a número aquí, validamos que sea >=1
    const quantity = parseInt(quantityStr, 10);
    if (isNaN(quantity) || quantity < 1) {
      alert('Por favor ingresa una cantidad válida (>= 1).');
      return;
    }

    try {
      await createOrder(recipeId, quantity);
      //redirecciona a la pagina de inicio
      navigate('/');
      setQuantityStr(''); // limpia el campo si quieres
    } catch {
      alert('Hubo un error al crear la orden.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Crear Nueva Orden</h2>

      {error && (
        <div className="mb-4 p-2 text-red-700 bg-red-100 rounded">
          {error}
        </div>
      )}

      <label className="block mb-1 font-medium">Receta</label>
      <select
        value={recipeId}
        onChange={e => setRecipeId(Number(e.target.value))}
        disabled={loading || !!error}
        className="w-full mb-4 p-2 border rounded disabled:opacity-50"
      >
        {recipes.map(r => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select>

      <label className="block mb-1 font-medium">Cantidad</label>
      <input
        type="number"
        min={1}
        placeholder="Ingresa cantidad"
        value={quantityStr}
        onChange={e => setQuantityStr(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <div className="flex justify-between items-center">
        <button
          type="submit"
          disabled={loading || !!error}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Cargando…' : 'Pedir Plato'}
        </button>
       
      </div>
    </form>
  );
}
