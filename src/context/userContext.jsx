import React,{createContext,useState} from 'react'



export const Userlogin = createContext();

//provider
const LoginContext = (props) =>{

  //crear el state
  const [login,guardarLogin] = useState(false);
  const [nombre,guardarNombre] = useState('');

  

  return (
    <Userlogin.Provider
      value={{
        login,
        guardarLogin,
        nombre,
        guardarNombre
      }}
    >
      {props.children}
    </Userlogin.Provider>
  )

}
export default LoginContext;