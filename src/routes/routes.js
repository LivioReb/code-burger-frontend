import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Home, Login, Products, Register, Cart, Admin } from '../containers';
import PrivateRoute from './private-route';

const AppRoutes = () => {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/pedidos" element={<Admin />} />
          </Route>
          <Route path="/cadastro" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer autoClose={2000} theme="colored"/>
      </Fragment>
    </Router>
  );
};

export default AppRoutes;
