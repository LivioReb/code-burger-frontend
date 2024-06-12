import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Home, Login, Products, Register, Cart, Admin } from '../containers';
import PrivateRoute from './private-route';
import paths from '../constants/paths';

const AppRoutes = () => {
  return (
    <Router>
      <Fragment>
        <Routes>    
            <Route path="/produtos" element={<Products />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route index element={<Home />} />
            <Route path="/" element={<PrivateRoute />}>
            <Route path={paths.Order} element={<Admin />} />
            <Route path={paths.Products} element={<Admin />} />
            <Route path={paths.NewProduct} element={<Admin />} />
            <Route path={paths.EditProduct} element={<Admin />} />
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
