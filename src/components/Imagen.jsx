import React from 'react';
import { Col, Card } from 'react-bootstrap';


const Imagen = ({imagen}) => {

  const {id,title,url,thumbnailUrl} = imagen;
  
  return (
    
      <Col xs={12} sm={6} md={4} lg={3}  className="mt-5">
        <Card style={{ width: '100%' }} key={id}>
          <Card.Img variant="top" src={thumbnailUrl} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            
            <a href={url} target="_blank" variant="primary" rel="noreferrer">Ver Más</a>
          </Card.Body>
        </Card>

      </Col>
    
  );
}

export default Imagen;