import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('codeburger:userData');
  const userData = isAuthenticated ? JSON.parse(isAuthenticated) : null;
  const location = useLocation();

  const isAdminRoute = location.pathname === "/pedidos" || "/listar-produtos";

  // Verifica se o usuário está autenticado e se é um administrador
  const isAdmin = isAuthenticated && userData && userData.admin;

  return isAuthenticated ? (
    <>
      {!isAdminRoute && <Header />}
      {!isAdmin && isAdminRoute ? <Navigate to="/" /> : <Outlet />}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
