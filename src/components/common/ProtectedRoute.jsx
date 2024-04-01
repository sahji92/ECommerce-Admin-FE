import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/getCookie";

const ProtectedRoute = (props) => {


  return (
    props.shouldLoggedIn?
         (getCookie('token')) ?
           (<props.component />)
        :  (
            <Navigate
            to= "/signup"
            />
          )
           :
           (getCookie('token')) ?
           (<Navigate
            to= "/dashboard"
            />)
        :  (
          <props.component /> 
          ) 
  );
};

export default ProtectedRoute;