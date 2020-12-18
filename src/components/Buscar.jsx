import React, {useState} from 'react';
import { Form, Button, Row, Col,Alert } from 'react-bootstrap';

const Buscar = ({guardarBusqueda}) => {

  const [termino, guardarTermino] = useState('');
  const [error, guardarError] = useState(false);

  const buscarImagenes = e => {
    e.preventDefault();

    if(termino.trim() === ''){
      guardarError(true);
      return;
    }

    guardarBusqueda(termino)
  
  }

  return (
    <Form onSubmit={buscarImagenes}>
    <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }} >
          <Form.Group >
            <Form.Control type="text" 
            placeholder="Buscar Imagen"
            id="buscar"
            onChange={e => guardarTermino(e.target.value)}  
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Button variant="primary" type="submit">
            Buscar
          </Button>
        </Col>
        { error ? 
          <Col md={{span:8,offset:2}} className="text-center">
            <Alert  variant="danger" >Agrega un término de busqueda</Alert>
          </Col> 
        : null}
    </Row>
    </Form>

  );
}

export default Buscar;