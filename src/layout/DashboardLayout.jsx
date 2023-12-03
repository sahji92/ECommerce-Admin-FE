import React from 'react'
import Sidebar from '../components/common/Sidebar'
import { Outlet } from 'react-router-dom'
import { getCookie } from '../utils/getCookie'

export default function DashboardLayout() {
  return (
    <div className='dashboardLayout d-flex flex-row'>
        {getCookie('token') && <Sidebar />}
        <Outlet />
    </div>
  )
}