import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Dashboard from './components/pages/Dashboard'
import { getCookie} from './utils/getCookie'
import DashboardLayout from './layouts/DashboardLayout'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<DashboardLayout />}>
        <Route index element={getCookie('token')? <Navigate to='/dashboard'/> : <Navigate to='/signup'/>}/>
        <Route path='/login' element={getCookie('token')? <Navigate to='/dashboard'/> : <Login />}/>
        <Route path='/signup' element={getCookie('token')? <Navigate to='/dashboard'/> : <Signup />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Route>
    </Routes>

  )
}