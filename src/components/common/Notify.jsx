import React, { useEffect } from 'react'

export default function Notify({message, type, setShowNotify}) {

  useEffect(()=>{
    setTimeout(()=>{
        setShowNotify(false)
    },3000)
  },[type])  
  
  return (
    <div>
        <div class={`alert alert-${type}`} role="alert">
           {message}
        </div>
    </div>
  )
}