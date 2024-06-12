import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('codeburger:userData');
  const userData = isAuthenticated ? JSON.parse(isAuthenticated) : null;
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/pedidos');

  // Verifica se o usuário está autenticado e se é um administrador
  const isAdmin = isAuthenticated && userData && userData.admin;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PrivateRoute;
