import React, { useEffect } from 'react'

export default function Notify({message, type, setShowNotify}) {

  useEffect(()=>{
    setTimeout(()=>{
        setShowNotify(false)
    },3000)
  },[type])  
  
  return (
    <div className='position-absolute top-50 start-50 translate-middle'>
        <div className={`alert alert-${type}`} role="alert">
           {message}
        </div>
    </div>
  )
}