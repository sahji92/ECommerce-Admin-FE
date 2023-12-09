import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import apiConnection from '../../apiConnection'
import { apiEndpoints, httpMethods } from '../../constant'
import { Link } from 'react-router-dom'

export default function SubmitEmail({setCurrentStage, setNotification, setCurrentEmail}) {

  const [email, setEmail] = useState('')

  const setFormData = (e) => {
    setEmail(e.target.value)
  }

  const validateEmail = async (e) => {
    try{
        e.preventDefault();
        const data = await apiConnection(`${apiEndpoints.VALIDATE_EMAIL_ENDPOINT}?email=${email}`,httpMethods.GET)
        if(data.status === 200){
          setCurrentStage(1)
          setCurrentEmail(email)
          setNotification(data.data.message,'success')
        } else {
          setNotification(data.data.message,'danger')
        }
    }
    catch(err) {
        console.log(err)
        setNotification('ERROR: Please reload your application','danger')
    }
  }

  return (
    <div className='p-5 card w-md-50'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email} name='email' type="email" placeholder="Enter email" onChange={(e) => setFormData(e)}/>
                </Form.Group>
                <Button className='w-100' variant="primary" type="submit" onClick={(e)=>validateEmail(e)}>
                    Submit
                </Button>
                <Link className="mx-auto mt-2 d-block" to='/login'>Login</Link>
            </Form>
    </div>
  )
}