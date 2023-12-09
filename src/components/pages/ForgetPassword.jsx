import React, { useState } from 'react'
import Notify from '../common/Notify'
import SubmitEmail from '../forgetPassword/SubmitEmail'
import SubmitOtp from '../forgetPassword/SubmitOtp'
import ResetPassword from '../forgetPassword/ResetPassword'

export default function ForgetPassword() {

  const [currentStage, setCurrentStage] = useState(0) // 0 = SubmitEmail, 1 = SubmitOtp, 2 = ResetPassword

  const [currentEmail, setCurrentEmail] = useState('')


  const [showNotify,setShowNotify] = useState(false)
  const [notifyData,setNotifyData] = useState({
    type: '',
    message: ''
  })

  const setNotification = (messgae,type) => {
    setShowNotify(true)
    setNotifyData({...notifyData, message: messgae, type: type })
  }

  return (
    <div className='forgetPassword'>
        <div className='d-flex align-items-center justify-content-center' style={{"min-height": "100vh"}}>
          {currentStage === 0 && <SubmitEmail setCurrentStage={setCurrentStage} setNotification={setNotification} setCurrentEmail={setCurrentEmail}/>}
          {currentStage === 1 && <SubmitOtp setCurrentStage={setCurrentStage} setNotification={setNotification} currentEmail={currentEmail}/>}
          {currentStage === 2 && <ResetPassword setNotification={setNotification} currentEmail={currentEmail}/>}
        </div>
        { showNotify && <Notify message={notifyData.message} type={notifyData.type} setShowNotify={setShowNotify}/>}
    </div>
  )
}