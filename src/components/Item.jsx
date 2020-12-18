import React,{Fragment} from 'react'
import { Link } from 'react-router-dom'


const Item = ({number,ruta,activar}) => {
  
  let activo = `page-item ${activar}`;

  return ( 
    <Fragment>
    { 
      (number >= 1) ? 
      (
        <li className={activo}>
          <Link className="page-link"  data-page={number} to={ruta} >{number}</Link>
        </li>    
      ) :
        null
      }
    
    </Fragment>
    
   );
}
 
export default Item;