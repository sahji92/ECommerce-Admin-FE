import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import apiConnection from '../../apiConnection';
import { apiEndpoints, httpMethods } from '../../constant';
import Notify from '../common/Notify';
import { useLocation } from 'react-router-dom';

export default function EditProduct() {

  const useQuery = () => new URLSearchParams(useLocation().search);

  let query = useQuery();

  const [productData, setProductData] = useState({})

  const [showNotify,setShowNotify] = useState(false)
  const [notifyData,setNotifyData] = useState({
    type: '',
    message: ''
  })

  const uploadBannerImageReference = useRef();

  const [productImages, setProductImages] = useState([])

  const [uploadedProductImages, setUploadedProductImages] = useState([])


  const setFormData = (e) => {
    setProductData({...productData, [e.target.name]: e.target.value})
  }

  const uploadProductImages = (e) => {
    setProductImages([...productImages,...e.target.files])
  }

  const removeProductImage = (idx) => {
    const newProductImages = productImages.filter((item,index) =>  index !== idx )
    setProductImages([...newProductImages])
  }

  const removeUploadedProductImage = (idx) => {
    const newProductImages = uploadedProductImages.filter((item,index) =>  index !== idx )
    setUploadedProductImages([...newProductImages])
  }

  const handleUploadBannerClick = () => {
    uploadBannerImageReference.current.click();
  }

  const productImagesUpload = async () => {
    console.log(productImages)
    if(uploadedProductImages.length <= 0 && productImages.length <= 0){
        setShowNotify(true)
        setNotifyData({...notifyData, message: 'ERROR: Please upload product images', type: 'danger' })
        return;
    }
    let images = {}
    productImages.forEach((image,index)=>{
        images[`productImages${index}`] = image
    })
    const data = await apiConnection(apiEndpoints.UPLOAD_PRODUCT_IMAGES_ENDPOINT,httpMethods.POST,{productImages: images},{'Content-Type': 'multipart/form-data'})
    if(data.status === 201){
        return {status: true, data:  data.data.data}
    } else {
        return {status: false}
    }
  }

  const createUpdatedImageObject = (alreadyUploadedImages, newUploadedImages) => {
    let updatedImages = {}
    let initialImageCount = 0;
    if(alreadyUploadedImages.length > 0){
        alreadyUploadedImages.forEach((item,index) => {
            updatedImages[`productImage${initialImageCount}`] = item
            initialImageCount++
        })
    }
    let newUploadedImagesValuesArray = Object.values(newUploadedImages)
    if(newUploadedImagesValuesArray.length) {
        newUploadedImagesValuesArray.forEach((item,index) => {
            updatedImages[`productImage${initialImageCount}`] = item
            initialImageCount++
        })
    }
    return updatedImages;
  }


  const editProduct = async (e) => {
    try {
        e.preventDefault();
        console.log(productData);
        const productImagesUploadData= await productImagesUpload()
        if(!productImagesUploadData.status){
            setShowNotify(true)
            setNotifyData({...notifyData, message: 'ERROR: Product image upload failed', type: 'danger' })
            return;
        }
        let updatedProductImages = createUpdatedImageObject(uploadedProductImages, productImagesUploadData.data)
        const data = await apiConnection(`${apiEndpoints.UPDATE_PRODUCT_ENDPOINT}/${query.get('productId')}`,httpMethods.PUT,{...productData, productImages: updatedProductImages})
        console.log(data)
        if(data.status === 200){
            reset()
            setShowNotify(true)
            setNotifyData({...notifyData, message: data.data.message, type: 'success' })
        } else {
          setShowNotify(true)
          setNotifyData({...notifyData, message: 'ERROR: Please reload your application', type: 'danger' })
        }
    }
    catch {
        setShowNotify(true)
        setNotifyData({...notifyData, message: 'ERROR: Please reload your application', type: 'danger' })
    }
  }

  const reset = () => {
    setProductData({
        name:'',
        description:'',
        category: '',
        price: '',
        discountedPrice: '',
        productImages: {}
    })
    setProductImages([])
  }

  const getProduct = async () => {
    const data = await apiConnection(`${apiEndpoints.GET_PRODUCT_ENDPOINT}/${query.get('productId')}`,httpMethods.GET)
    if(data.status === 200){
        setProductData({...data.data.data[0]})
        setUploadedProductImages([...Object.values(data.data.data[0].productImages).map(item => item)])
    } else {
        console.log(data)
    }
  }

  useEffect(()=>{
    getProduct()
  },[])


  return (
    <div className='editProduct w-100 p-2'>
        <h2>Edit product form</h2>
        <hr></hr>
        <Form className='w-75 ms-4 mt-5'>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Enter produnct name</Form.Label>
                <Form.Control value={productData.name} name='name' type="text" placeholder="Enter product name" onChange={(e) => setFormData(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Enter produnct description</Form.Label>
                <Form.Control value={productData.description} name='description' type="text" placeholder="Enter product description" onChange={(e) => setFormData(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Enter produnct category</Form.Label>
                <Form.Control value={productData.category} name='category' type="text" placeholder="Enter product category" onChange={(e) => setFormData(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Enter produnct price</Form.Label>
                <Form.Control value={productData.price} name='price' type="number" placeholder="Enter product price" onChange={(e) => setFormData(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Enter produnct discounted price</Form.Label>
                <Form.Control value={productData.discountedPrice} name='discountedPrice' type="number" placeholder="Enter product discounted price" onChange={(e) => setFormData(e)}/>
            </Form.Group>

            {(uploadedProductImages.length > 0) && uploadedProductImages.map((item,index)=>{
                return <div className='position-relative w-25 d-inline-block m-2' key={index}>
                    <img className='img-fluid' src={item} alt=''></img>
                    <div onClick={()=>removeUploadedProductImage(index)} className='position-absolute top-0 end-0 bg-danger text-light m-1 px-1'>&#10005;</div>
                </div>
            })}

            {(productImages.length > 0) && productImages.map((item,index)=>{
                return <div className='position-relative w-25 d-inline-block m-2' key={index}>
                    <img className='img-fluid' src={URL.createObjectURL(item)} alt=''></img>
                    <div onClick={()=>removeProductImage(index)} className='position-absolute top-0 end-0 bg-danger text-light m-1 px-1'>&#10005;</div>
                </div>
            })}

            <Form.Group controlId="formFile" className="mb-3">
                <Button onClick={handleUploadBannerClick} variant="warning">Upload banner image</Button>
                <Form.Control ref={uploadBannerImageReference} name='banner' className='d-none' type="file" onChange={(e)=>uploadProductImages(e)} multiple/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e)=>editProduct(e)}>
                Edit Product
            </Button>
        </Form>
        { showNotify && <Notify message={notifyData.message} type={notifyData.type} setShowNotify={setShowNotify}/>}
    </div>
  )
        }