import React, { Fragment,useContext,useEffect } from 'react';
import {Navbar,Form,Button} from 'react-bootstrap';
import { withRouter,useHistory} from 'react-router'
import { Link } from 'react-router-dom'
import {Userlogin} from '../context/userContext.jsx'


const Menu = () => {
  
  const history = useHistory();
  const {guardarLogin,login,nombre,guardarNombre} = useContext(Userlogin);

  const tokens = localStorage.getItem('token');

  useEffect(() => {
    if(tokens){
      const users = JSON.parse(localStorage.getItem("myUserFront"));
      const nombres = users.name + ' ' + users.lastName;
  
      guardarNombre(nombres);
      guardarLogin(true);
    }  
  }, [tokens,guardarLogin,guardarNombre])

  
  
  const cerrarSession = e =>{
    localStorage.removeItem('token');
    localStorage.removeItem('myUserFront');
    localStorage.clear();
    guardarLogin(false);
    guardarNombre("");
    history.push('/inicio');  
  }

  let ruta = (login ? '/dashboard' : "/inicio");

  return (
    <Fragment>
      <Navbar bg="primary" expand="lg" className="d-flex justify-content-between">
      
      <Link to={ruta}  className="text-white">Bienvenido {nombre} </Link>

        {login ?
        (
          <Form inline>
            <Button 
            variant="success"  
            onClick={cerrarSession}>Logout</Button>
          </Form>
        )
        :(
          <Link to="/login" className="btn btn-success">Login</Link>
        )  
      }
          
        
      </Navbar>

      
    </Fragment>


  );
}

export default withRouter(Menu);