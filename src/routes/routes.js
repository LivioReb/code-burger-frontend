import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Home from '../containers/Home'
import Login from '../containers/Login'
import Register from '../containers/Register'
import PrivateRoute from './private-route'

const AppRoutes = () => {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/cadastro" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer autoClose={2000} theme="colored"/>
      </Fragment>
    </Router>
  )
}

export default AppRoutes
