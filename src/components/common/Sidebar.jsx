import React from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate=useNavigate()
  const logoutUser=()=>{
    document.cookie=document.cookie+';max-age=0'//max age 0 means cookie is expired
    navigate('/login')
  }
  return (
    <div className='sideBar bg-light d-flex flex-column' style={{height: '100vh', width:'300px'}}>
        <Link to='/dashboard'>Dashboard</Link>
       <Link to='/banners'>Banners</Link>
       <Link to='/products'>Products</Link>
       <Button onClick={logoutUser} variant='danger'>Logout</Button>
    </div>
  )
}