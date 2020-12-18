import React from 'react'
import { Redirect } from 'react-router-dom'


const Verificar = () => {

  const token = localStorage.getItem("token");
  
  if (token) {
    return <Redirect to='/dashboard' />
  } else {
    return <Redirect to='/inicio' />
  }

}

export default Verificar;