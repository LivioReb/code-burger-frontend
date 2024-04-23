import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from '../containers/Login'
import Register from '../containers/Register'

function AppRoutes () {
  return (
        <Router>
            <Routes>
                <Route Component={Login} path="/login" />
                <Route Component={Register} path="/cadastro" />
            </Routes>
        </Router>

  )
}
export default AppRoutes
