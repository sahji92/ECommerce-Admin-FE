import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function Banners() {

  const navigate = useNavigate();

  return (
    <div className='banners w-100 p-2'>
        <Button variant="primary" className='w-100' onClick={()=>navigate('/add-banner')}>Add banner</Button>
    </div>
  )
}