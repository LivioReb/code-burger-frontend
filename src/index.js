import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

import { UserProvider } from './hooks/UserContext'
import AppRoutes from './routes/routes'
import GlobalStyles from './styles/globalStyles'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <>
    <UserProvider>
    <AppRoutes/>
    </UserProvider>
    <ToastContainer autoClose={2000} theme="colored"/>
    <GlobalStyles/>
    </>
)
