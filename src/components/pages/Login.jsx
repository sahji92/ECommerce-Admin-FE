import React, {useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import apiConnection from '../../apiConnection';
import { apiEndpoints, httpMethods } from '../../constant';
import Notify from '../common/Notify';
//import { getCookie, setSession } from '../../utils/getCookie';
import { useNavigate } from 'react-router-dom';

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
              //setShowNotify(true)
            //setNotifyData({...notifyData, message: data.data.message, type: 'success' })
            navigate('/dashboard')
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
    <div className='logIn w-m-25 p-5 border border-dark m-5'>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" onChange={(e) => setFormData(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" onChange={(e) => setFormData(e)}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e)=>loginUser(e)}>
                Login
            </Button>
        </Form>
        <br></br>
       { showNotify && <Notify message={notifyData.message} type={notifyData.type} setShowNotify={setShowNotify}/>}
    </div>
  )
}