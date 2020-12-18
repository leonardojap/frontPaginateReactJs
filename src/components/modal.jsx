import React, { Fragment,useState } from 'react'
import { Button, Modal, Form,Alert } from 'react-bootstrap';
import clienteAxios from '../config/axios';


const Modals = ({ cerrar, toggle,ingresar }) => {

  const [datos, guardarDatos] = useState({
    correo: '',
    password: ''
  })

  const [error, guardarError] = useState(false);
  const { correo, password } = datos;
  

  const obtenerInformacion = e => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }


  const ingresarUser = e => {
    e.preventDefault();
    
    if (
      correo.trim() === "" ||
      password.trim() === "" 
      ) {

      guardarError(true)
      setTimeout( () =>{
        guardarError(false)
  
      }, 3000 )

      return
    }
    guardarError(false)

    iniciarSession({correo,password});
    
    ingresar();

    guardarDatos({
      correo: '',
      password: ''
    })

  }

  const iniciarSession = async datos =>{
    try{
      const respuesta = await clienteAxios.post('/api/auth', datos);
      console.log(respuesta);
    }catch(error){
      console.log(error);
    }
  }

  return (

    <Fragment>
      
      <Modal show={toggle} onHide={cerrar}>
      <Form  onSubmit={ingresarUser}>
        <Modal.Header closeButton>
          <Modal.Title>Ingresar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" id="email" 
            placeholder="Enter email" 
            value={correo}
            name="correo"
            onChange={obtenerInformacion}
            required/>
          </Form.Group>

          <Form.Group >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" id="pass" 
            placeholder="Password" 
            value={password}
            name="password"
            onChange={obtenerInformacion}
            required/>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrar}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Login
          </Button>

          { error ?
           <Alert variant="danger" className="mt-5 text-center">Debe llenar todos los campos</Alert>
        : null}
        </Modal.Footer>
        </Form>
      </Modal>
      
    </Fragment>


  );
}

export default Modals;


