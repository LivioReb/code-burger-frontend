import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../components'; // Importe o Header corretamente

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('codeburger:userData');

  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
