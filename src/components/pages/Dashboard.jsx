import React, { useEffect } from 'react'
import apiConnection from '../../apiConnection'
import { apiEndpoints, httpMethods } from '../../constant'

export default function Dashboard() {


    useEffect(()=>{
        apiConnection(apiEndpoints.GET_USERS_ENDPOINT,httpMethods.GET)
    },[])

  return (
    <div>Dashboard</div>
  )
  }