import React, { useState,useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { withRouter,useHistory} from 'react-router'

import clienteAxios from '../config/axios'

const Formulario = () => {


  const [datos, guardarDatos] = useState({
    nombre: '',
    correo: '',
    password: '',
    password2: ''
  })

  const history = useHistory();
  const [error, guardarError] = useState('');
  const [msg, guardarMsg] = useState(false);
  const [register, setRegister] = useState(false);

  const { nombre, correo, password, password2 } = datos;

  useEffect(() => {

    if(register){

      guardarMsg("Usuario Registrado Exitosamente");
      setTimeout(() => {
        guardarMsg(false);
        history.push('/login');   
      }, 3000)
    }
    
  }, [register,history])

  const obtenerInformacion = e => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  const RegistrarUser = e => {
    e.preventDefault();

    if (
      nombre.trim() === '' ||
      correo.trim() === "" ||
      password.trim() === "" ||
      password2.trim() === "") {

      
      guardarError("Debe llenar todos los campos");
      setTimeout(() => {
        guardarError(false)

      }, 3000)

      return
    }

    if(password !== password2){
      
      guardarError("Las contraseñas no coinciden");
      setTimeout(() => {
        guardarError(false)

      }, 3000)
      return
    }

    

    guardarError(false)

    guardarDatos({
      nombre: '',
      correo: '',
      password: '',
      password2: ''
    })

    let name = nombre;
    let lastName = nombre;
    let email = correo;
    

    registrarUsuario({
      name,
      lastName,
      email,
      password
    })


  }

  const registrarUsuario = async datos => {

    let respuesta = '';
    try{
      respuesta = await clienteAxios.post('/api/user/create', datos);
      if(respuesta){
        /* console.log(respuesta.data); */
        setRegister(true);
      }
      
      

    }catch(error){
      setRegister(false)
      guardarError("Error 500 server no found");
      setTimeout(() => {
        guardarError(false)

      }, 3000)
      console.log(error);
    }
  }


  return (
    <Form className="mt-5" onSubmit={RegistrarUser}>
      <h4 className="text-center">Registrarse</h4>
      <Form.Group >
        <Form.Label >Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email"
          value={nombre}
          name="nombre"
          onChange={obtenerInformacion}
          required
        />
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
      <Form.Group >
        <Form.Label > Verificar Password </Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password2}
          name="password2"
          onChange={obtenerInformacion}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Registrar
    </Button>

      { error ?
        <Alert variant="danger" className="mt-5 text-center">{error}</Alert>
        : null}

      { msg ?
        <Alert variant="success" className="mt-5 text-center">{msg}</Alert>
        : null}
    </Form>

  );
}

export default withRouter(Formulario);