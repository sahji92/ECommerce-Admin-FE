import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { apiEndpoints, httpMethods } from '../../constant';
import apiConnection from '../../apiConnection';
import Card from 'react-bootstrap/Card';

export default function Products() {

  const navigate = useNavigate();

  const [products,setProducts] = useState([]);

  const [getProductsError,setGetProductsError] = useState();


  const getProducts = async () => {
    const data = await apiConnection(apiEndpoints.GET_PRODUCTS_ENDPOINT,httpMethods.GET)
    if(data.status === 200){
        setProducts([...data.data.data])
    } else {
        setGetProductsError("Unable to fetch products. Please try again later.")
    }
  }

  useEffect(()=>{
    getProducts()
  },[])

  return (
    <div className='products w-100 p-2'>
        <Button variant="primary" className='w-100' onClick={()=>navigate('/add-product')}>Add Product</Button>
        {getProductsError ? <p>{getProductsError}</p>
         :
        <div>
            {(products.length > 0) ?
            <div>
                {products.map((item, index)=>{
                    return <Card className='d-inline-block m-1' style={{ width: '18rem' }} key={index}>
                        {item.productImages && <Card.Img variant="top" src={item.productImages.productImage0} style={{height: '150px'}}/>}
                        <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                            {item.description}
                        </Card.Text>
                        <p>Price: <s>{item.price}</s></p>
                        <b>Discounted Price: {item.discountedPrice}</b>
                            <Button variant="info" className='me-2' onClick={()=>{navigate(`/edit-product?productId=${item._id}`)}}>Edit product</Button>
                            <Button variant="danger">Delete product</Button>
                        </Card.Body>
                    </Card>
                })}
            </div> 
            : 
            <p>No products are present.</p>}
        </div>
        }
    </div>
  )
}