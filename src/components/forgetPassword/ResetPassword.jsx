import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import apiConnection from '../../apiConnection'
import { apiEndpoints, httpMethods } from '../../constant'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword({setNotification, currentEmail}) {

  const [passwordValues, setPasswordValues] = useState({
    password: '',
    cpassword: ''
  })

  const navigate = useNavigate()

  const [passwordError, setPasswordError] = useState()

  const setFormData = (e) => {
    setPasswordValues({...passwordValues, [e.target.name]: e.target.value})
  }

  const validatePassword = () => {
    if(passwordValues.password === passwordValues.cpassword) {
      setPasswordError()
      return true
    }
    setPasswordError('Passwords does not match.Please check.')
    return false
  }

  const resetPassword = async (e) => {
    try{
      e.preventDefault();
      if(!validatePassword()){
        return
      }
      const payload = {
        email: currentEmail,
        password: passwordValues.password
      }
      const data = await apiConnection(apiEndpoints.UPDATE_PASSWORD_ENDPOINT,httpMethods.POST,payload)
      if(data.status === 200){
        setNotification(data.data.message,'success')
        navigate('/login')
      } else {
        setNotification(data.data.message,'danger')

      }
    }
    catch(err){
      setNotification('ERROR: Please reload your application','danger')
    }
  }

  return (
    <div className='p-5 card w-md-50' style={{maxWidth: '400px',minWidth: '400px'}}>
      <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter password</Form.Label>
              <Form.Control value={passwordValues.password} name='password' type="password" placeholder="Enter password" onChange={(e) => setFormData(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control value={passwordValues.cpassword}  name='cpassword' type="password" placeholder="Confirm password" onChange={(e) => setFormData(e)}/>
          </Form.Group>
          <small className='text-danger'>{passwordError}</small>
          <Button className='w-100' variant="primary" type="submit" onClick={(e)=>resetPassword(e)}>
              Reset password
          </Button>
      </Form>
    </div>
  )
}