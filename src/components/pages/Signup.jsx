import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import apiConnection from '../../apiConnection';
import Notify from '../common/Notify';
import { apiEndpoints, httpMethods } from '../../constant';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const [signUpFormData, setSignUpFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const [showNotify,setShowNotify] = useState(false)
  const [notifyData,setNotifyData] = useState({
    type: '',
    message: ''
  })

  const setFormData = (e) => {
    setSignUpFormData({...signUpFormData, [e.target.name]: e.target.value})
  }

  const registerUser = async (e) => {
    try {
        e.preventDefault();
        console.log(signUpFormData);
        const data = await apiConnection(apiEndpoints.REGISTER_USER_ENDPOINT,httpMethods.POST,signUpFormData)
        console.log(data)
        if(data.status === 201 || 200){
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

  return (
    <div className='signUp'>
      <div className='d-flex align-items-center justify-content-center' style={{"min-height": "100vh"}}>
        <div className='p-5 card w-md-50'>
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter name</Form.Label>
                    <Form.Control name='name' type="text" placeholder="Enter name" onChange={(e) => setFormData(e)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" onChange={(e) => setFormData(e)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" onChange={(e) => setFormData(e)}/>
                </Form.Group>
                <Button className='w-100' variant="primary" type="submit" onClick={(e) => registerUser(e)}>
                    Register
                </Button>
            </Form>
            <br></br>
            <Button variant="info" type="submit" onClick={()=>navigate('/login')}>
              Login
            </Button>
          { showNotify && <Notify message={notifyData.message} type={notifyData.type} setShowNotify={setShowNotify}/>}
        </div>
      </div>
    </div>
  )
}