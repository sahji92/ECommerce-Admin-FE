import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import apiConnection from '../../apiConnection'
import { apiEndpoints, httpMethods } from '../../constant'

export default function SubmitOtp({setCurrentStage, setNotification, currentEmail}) {

    const [otp, setOtp] = useState('')

    const setFormData = (e) => {
        setOtp(e.target.value)
    }

    const validateOtp = async (e) => {
        try{
            e.preventDefault();
            const data = await apiConnection(`${apiEndpoints.VALIDATE_OTP_ENDPOINT}?email=${currentEmail}&otp=${otp}`,httpMethods.GET)
            if(data.status === 200){
                setCurrentStage(2)
                setNotification(data.data.message,'success')
            } else {
                setNotification(data.data.message,'danger')

            }
        }
        catch(err) {
            setNotification('ERROR: Please reload your application','danger')
        }
      }

    return (
        <div className='p-5 card w-md-50'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter OTP</Form.Label>
                        <Form.Control value={otp} name='otp' type="number" placeholder="Enter OTP" onChange={(e) => setFormData(e)}/>
                    </Form.Group>
                    <Button className='w-100' variant="primary" type="submit" onClick={(e)=>validateOtp(e)}>
                        Submit
                    </Button>
                </Form>
        </div>
    )
}