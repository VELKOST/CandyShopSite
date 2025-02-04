// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import CartPage from './pages/CartPage/CartPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const TodoPage = React.lazy(() => import('./pages/TodoPage/TodoPage'));

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/" element={<ProductsPage />} />
          <Route path="/category" element={<CategoriesPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
