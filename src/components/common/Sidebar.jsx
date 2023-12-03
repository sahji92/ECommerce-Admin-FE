import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='sideBar bg-light d-flex flex-column' style={{height: '100vh', width:'300px'}}>
        <Link to='/dashboard'>Dashboard</Link>
       <Link to='/banners'>Banners</Link>
       <Link to='/products'>Products</Link>
    </div>
  )
}