import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function Products() {

  const navigate = useNavigate()

  return (
    <div className='products w-100 p-2'>
        <Button variant="primary" className='w-100' onClick={()=>navigate('/add-product')}>Add Product</Button>
    </div>
  )
}