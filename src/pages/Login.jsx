import React, {useState,useContext,useEffect} from 'react'
import { withRouter,useHistory} from 'react-router'
import { Link } from 'react-router-dom'
import { Form, Button, Alert,Container,Row,Col } from 'react-bootstrap';
import clienteAxios from '../config/axios'
import {Userlogin} from '../context/userContext.jsx'
import img from '../assets/images/photo.jpg'


const Login = () => {

  
  const {guardarLogin,guardarNombre,login} = useContext(Userlogin);
  const history = useHistory();

  const [datos, guardarDatos] = useState({
    correo: '',
    password: ''
  })

  const [error, guardarError] = useState('');
  const [msg, guardarMsg] = useState(false);

  const {  correo, password } = datos;


  useEffect(() => {
    
    if(login){
      guardarMsg("Usuario ingresado exitosamente");

      setTimeout(() => {
        guardarMsg(false);
        history.push('/dashboard');   
      }, 3000)   
    }
    
  }, [login,history])


  const obtenerInformacion = e => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  

  const IngresarUser = e => {
    e.preventDefault();

    if (
      correo.trim() === "" ||
      password.trim() === "" 
      ) {
        guardarError("Debe llenar todos los campos");
        setTimeout(() => {
          guardarError(false)

        }, 3000)

        return
      }

      let email = correo;

      iniciarSession({email,password});

      guardarDatos({
        correo: '',
        password: ''
      })

  }

  const iniciarSession = async datos =>{
    
    
    try{

      const respuesta = await clienteAxios.post('/api/login', datos);
      /* console.log(respuesta); */
      let token = respuesta.data.data.token;
      let user =  JSON.stringify(respuesta.data.data.user);
      
      localStorage.setItem('token',token); 
      localStorage.setItem('myUserFront',user); 

      const users = JSON.parse(localStorage.getItem("myUserFront"));
      const nombres = users.name + ' '+ users.lastName;
      
      guardarNombre(nombres);
      guardarLogin(true); 
      
    }catch(error){
      localStorage.removeItem('token');
      localStorage.removeItem('myUserFront');
      guardarLogin(false); 
      guardarError("Usuario o Contraseña Incorrectos");
      setTimeout(() => {
        guardarError(false)

      }, 3000) 
    }

    
    
  }

  return (
    <Container>
      <Row>
        <Col>
          <img src={img} className="img-fluid mt-5" alt="red" />
        </Col>
        <Col>
          <Form className="mt-5" onSubmit={IngresarUser}>
            <h4 className="text-center">Iniciar Sesión</h4>
            <Form.Group >
              
              <Form.Label >Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={correo}
                name="correo"
                onChange={obtenerInformacion}
                required
              />

            </Form.Group>

            <Form.Group >
              <Form.Label >Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={obtenerInformacion}
                required
              />
            </Form.Group>
            
            <Form.Group className="d-flex justify-content-around">
              <Button variant="success" type="submit">
              Ingresar</Button>

              <Link to="/" className="btn btn-primary">Registrarse</Link>
            </Form.Group>

            {error ?
              <Alert variant="danger" className="mt-5 text-center">{error}</Alert>
              : null}

              { msg ?
            <Alert variant="success" className="mt-5 text-center">{msg}</Alert>
            : null}


          </Form>
        </Col>
      </Row>
    </Container>

  );
}

export default withRouter(Login);