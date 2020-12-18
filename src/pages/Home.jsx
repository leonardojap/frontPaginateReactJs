import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';

import Registro from '../components/Registro.jsx'
import img from '../assets/images/photo.jpg'

const Home = () => {

  return (

    <Container>
      <Row>
        <Col>
          <img src={img} className="img-fluid mt-5" alt="red" />
        </Col>
        <Col>
          <Registro />
        </Col>
      </Row>
    </Container>

  );
}

export default Home;