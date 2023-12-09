import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import apiConnection from '../../apiConnection';
import { apiEndpoints, httpMethods } from '../../constant';
import Notify from '../common/Notify';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  
  const [logInFormData, setLogInFormData] = useState({
        email: '',
        password: ''
  })
  const navigate = useNavigate()
  const setFormData = (e) => {
    setLogInFormData({...logInFormData, [e.target.name]: e.target.value})
  }
  const [showNotify,setShowNotify] = useState(false)
  const [notifyData,setNotifyData] = useState({
    type: '',
    message: ''
  })
  const loginUser = async (e) => {
    try{
        e.preventDefault();
        const data = await apiConnection(apiEndpoints.LOGIN_USER_ENDPOINT,httpMethods.POST,logInFormData)
        if(data.status === 200){
            navigate('/dashboard');
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
    <div className='logIn'>
      <div className='d-flex align-items-center justify-content-center' style={{"min-height": "100vh"}}>
        <div className='p-5 card w-md-50'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" onChange={(e) => setFormData(e)}/>
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" onChange={(e) => setFormData(e)}/>
            </Form.Group>
            <Link className="mb-3 d-block" to='/forget-password'>Forget password?</Link>
            <Button className='w-100' variant="primary" type="submit" onClick={(e)=>loginUser(e)}>
                Login
            </Button>
          </Form>
          <br></br>
          <Button variant="info" type="submit" onClick={()=>navigate('/signup')}>
            Signup
          </Button>
        </div>
       { showNotify && <Notify message={notifyData.message} type={notifyData.type} setShowNotify={setShowNotify}/>}
      </div>
    </div>
  )
    }