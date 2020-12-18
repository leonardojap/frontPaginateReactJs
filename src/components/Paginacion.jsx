import React,{Fragment} from 'react';
import { Row, Col } from 'react-bootstrap';
import Item from './Item.jsx';
import { Link } from 'react-router-dom'



const Paginacion = ({ guardarPaginas,paginas,setloading }) => {

  let pagNumero = parseInt(paginas);
  let items = [];
  let numeroPagina = null;
  let active = parseInt(paginas);


  if(pagNumero === 500){
     numeroPagina =  (parseInt(pagNumero) - 5);
  }else{
     numeroPagina =  (pagNumero > 1) ? parseInt(pagNumero) + 5 : 5;
  }
  let anteriorPage = parseInt(pagNumero) - 1; 
  let anterior = `/dashboard/${anteriorPage}`;

  const click = (e) => {
    const clickValue = e.target.offsetParent.getAttribute('data-page')
      ? e.target.offsetParent.getAttribute('data-page')
      : e.target.getAttribute('data-page');
      
    guardarPaginas(clickValue);
    setloading(false);
    /* console.log(paginas); */
  };
    

  for (let number = pagNumero; number <= numeroPagina; number++) {
    let activar = "";
    if(number===active){
      activar="active";
    }
    let ruta = `/dashboard/${number}`;
    items.push(
      <Item number={number} key={number} ruta={ruta} activar={activar} />,
    );
  }

  
  
  return (
    <Row>
      <Col className="mt-5">
        <nav aria-label="Page navigation" className="d-flex justify-content-center">
          <ul className="pagination" onClick={click}>
            { 
            (paginas > 1) ? 
            (
              <Fragment>
              <li className="page-item">
                <Link className="page-link" data-page={anteriorPage} to={anterior}>Previous</Link>
              </li>
              <li className="page-item">
                <Link className="page-link" data-page={1} to="/dashboard/1">1</Link>
              </li>
            </Fragment>
            ) :
              null
            }
          
            
            {items}

            <li className="page-item">
              <Link className="page-link" data-page={1}  to="/dashboard">...</Link>
              </li>
            <li className="page-item">
              <Link className="page-link" data-page={500} to="/dashboard/500">500</Link>
            </li>
            
            
          </ul>
        </nav>
      </Col>
    </Row>

  );
}

export default Paginacion;