import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import apiConnection from '../../apiConnection';
import { apiEndpoints, httpMethods } from '../../constant';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';

export default function Banners() {

  const navigate = useNavigate();

  const [banners,setBanners] = useState([]);

  const [getBannersError,setGetBannersError] = useState();


  const getBanners = async () => {
    const data = await apiConnection(apiEndpoints.GET_BANNERS_ENDPOINT,httpMethods.GET)
    if(data.status === 200){
        setBanners([...data.data.data])
    } else {
        setGetBannersError("Unable to fetch banners. please try again later.")
    }
  }

  useEffect(()=>{
    getBanners()
  },[])

  return (
    <div className='banners w-100 p-2'>
        <Button variant="primary" className='w-100' onClick={()=>navigate('/add-banner')}>Add banner</Button>
        {getBannersError ? <p>{getBannersError}</p>
         :
        <div>
            {(banners.length > 0) ?
            <div>
                {banners.map((item, index)=>{
                    return <Card className='m-2' key={index}>
                        <Card.Img variant="top p-2" style={{height:'180px'}} src={item.bannerImageLink} />
                        <Card.Body>
                        <Card.Title>{item.name} {item.productLink}</Card.Title>
                        <Card.Text>
                            <Button variant="info" className='me-2' onClick={()=>{navigate(`/edit-banner?bannerId=${item._id}`)}}>Edit banner</Button>
                            <Button variant="danger">Delete banner</Button>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                })}
            </div> 
            : 
            <p>No Banners are present.</p>}
        </div>
        }
    </div>
  )
      }