import React, { useContext,useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Userlogin} from '../context/userContext';

const RutaPrivada = ({ component: Component, ...props  }) => {

  const {login,guardarLogin} = useContext(Userlogin);
  const token = localStorage.getItem("token");

  useEffect(() => {
    
    if(token){
      guardarLogin(true);
    }
  }, [token,guardarLogin])

    return ( 
        
        <Route { ...props } render={ props => !login ?  (
            <Redirect to="/" />
        )  : (
            <Component {...props} />
        ) } />
     );
}
 
export default RutaPrivada;