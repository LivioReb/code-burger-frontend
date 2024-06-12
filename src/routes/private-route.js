import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('codeburger:userData');
  const userData = isAuthenticated ? JSON.parse(isAuthenticated) : null;
  const location = useLocation();

  const isAdminRoute = location.pathname === "/pedidos" || location.pathname === "/listar-produtos";
  console.log('Current path:', location.pathname); // Log do caminho atual
  console.log('isAdminRoute:', isAdminRoute); // Log se é uma rota de admin
  console.log('User Data:', userData); // Log dos dados do usuário

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
