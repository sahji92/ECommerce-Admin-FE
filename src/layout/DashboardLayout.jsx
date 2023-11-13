import React from 'react'
import Sidebar from '../components/common/Sidebar'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className='dashboardLayout d-flex flex-row'>
        <Sidebar />
        <Outlet />
    </div>
  )
}