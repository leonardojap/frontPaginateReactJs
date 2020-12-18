import React from 'react';
import { Row } from 'react-bootstrap';
import Imagen from './Imagen.jsx'


const ListadoImagen = ({imagenes}) => {
  let item = imagenes;
  
  if (Object.entries(item).length === 0) {
    item = []; 
  }

  return ( 
    <Row>
      { (item.length === 0) ?
      ("")  
      :
      (
        item.map( imagen =>(
          <Imagen key={imagen.id}
            imagen={imagen}
          />
        ) )
      )
    }
      
    </Row>
    
   );
}
 
export default ListadoImagen;