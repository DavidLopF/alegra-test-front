// src/components/Navbar.tsx
import { Navbar as FlowNav } from 'flowbite-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <FlowNav fluid rounded>
      <Link to="/" className="text-xl font-bold">Alegra Lunch</Link>
      <div className="flex space-x-4">
        <Link to="/">Órdenes</Link>
        <Link to="/new">Crear Orden</Link>
        <Link to="/ingredients">Inventario</Link>
      </div>
    </FlowNav>
  );
}
