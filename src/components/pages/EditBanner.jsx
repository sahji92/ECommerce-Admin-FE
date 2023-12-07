import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import apiConnection from '../../apiConnection';
import { apiEndpoints, httpMethods } from '../../constant';
import Notify from '../common/Notify';
import { useLocation } from 'react-router-dom';

export default function EditBanner() {


  const useQuery = () => new URLSearchParams(useLocation().search);

  let query = useQuery();

  const [bannerData, setBannerData] = useState({
  })

  const [showNotify,setShowNotify] = useState(false)
  const [notifyData,setNotifyData] = useState({
    type: '',
    message: ''
  })

  const uploadBannerImageReference = useRef();

  const [bannerImage, setBannerImage] = useState()

  const setFormData = (e) => {
    setBannerData({...bannerData, [e.target.name]: e.target.value})
  }

  const uploadBannerImage = (e) => {
    setBannerImage(e.target.files[0])
  }

  const removeBannerImage = () => {
    setBannerImage()
  }

  const handleUploadBannerClick = () => {
    uploadBannerImageReference.current.click();
  }

  const bannerImageUpload = async () => {
    console.log(bannerImage)
    const data = await apiConnection(apiEndpoints.UPLOAD_FILE_ENDPOINT,httpMethods.POST,{banner: bannerImage},{'Content-Type': 'multipart/form-data'})
    if(data.status === 201){
        return {status: true, data:  data.data.data}
    } else {
        return {status: false}
    }
  }

  const editBanner = async (e) => {
    try {
        e.preventDefault();
        console.log(bannerData);
        const bannerImageUploadData= await bannerImageUpload()
        if(!bannerImageUploadData.status){
            setShowNotify(true)
            setNotifyData({...notifyData, message: 'ERROR: Banner image upload failed', type: 'danger' })
            return;
        }
        console.log('Data after image upload', bannerData)
        console.log('Data after image upload', bannerImageUploadData.data)
        const data = await apiConnection(`${apiEndpoints.UPDATE_BANNER_ENDPOINT}/${query.get('bannerId')}`,httpMethods.PUT,{...bannerData, bannerImageLink: bannerImageUploadData.data})
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
    setBannerData({
        name:'',
        bannerImageLink:'',
        productLink: ''
    })
    setBannerImage()
  }

  const getBanner = async () => {
    const data = await apiConnection(`${apiEndpoints.GET_BANNER_ENDPOINT}/${query.get('bannerId')}`,httpMethods.GET)
    if(data.status === 200){
        setBannerData({...data.data.data[0]})
        setBannerImage(data.data.data[0].bannerImageLink)
    } else {
      console.log(data)
    }
  }

  useEffect(()=>{
    getBanner()
  },[])

  return (
    <div className='editBanner w-100 p-2'>
        <h2>Edit banner form</h2>
        <hr></hr>
        <Form className='w-75 ms-4 mt-5'>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Enter banner name</Form.Label>
                <Form.Control value={bannerData.name} name='name' type="text" placeholder="Enter banner name" onChange={(e) => setFormData(e)}/>
            </Form.Group>

            {bannerImage && <div className='position-relative w-50'>
                <img className='img-fluid' src={(typeof(bannerImage) === 'string') ? bannerImage : URL.createObjectURL(bannerImage)} alt=''></img>
                <div onClick={removeBannerImage} className='position-absolute top-0 end-0 bg-danger text-light m-1 px-1'>&#10005;</div>
            </div>}

            <Form.Group controlId="formFile" className="mb-3">
                <Button className={bannerImage && 'd-none'} onClick={handleUploadBannerClick} variant="warning">Upload banner image</Button>
                <Form.Control ref={uploadBannerImageReference} name='banner' className='d-none' type="file" onChange={(e)=>uploadBannerImage(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductLink">
                <Form.Label>Product link</Form.Label>
                <Form.Control name='productLink' value={bannerData.productLink} type="text" placeholder="Enter product link" onChange={(e) => setFormData(e)}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e)=>editBanner(e)}>
                Edit banner
            </Button>
        </Form>
        { showNotify && <Notify message={notifyData.message} type={notifyData.type} setShowNotify={setShowNotify}/>}
    </div>
  )
}