import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateOrderPage from '../pages/CreateOrderPage';
import OrdersPage      from '../pages/OrdersPage';
import IngredientsPage from '../pages/IngredientsPage';
import { Navbar }      from '../components/Navbar';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"       element={<OrdersPage/>} />
        <Route path="/new"    element={<CreateOrderPage/>} />
        <Route path="/ingredients" element={<IngredientsPage/>} />
      </Routes>
    </BrowserRouter>
  );
}
