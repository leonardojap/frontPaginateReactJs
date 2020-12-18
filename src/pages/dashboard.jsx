import React, {  useState, useEffect } from 'react';
import axios from 'axios'
import {Container} from 'react-bootstrap';
import ListadoImagen from '../components/ListadoImagen.jsx'  
import Paginacion from '../components/Paginacion.jsx'
import Spinner from '../components/Spinner.jsx'


const Dashboard = () => {

  const [imagenes, guardarImagenes] = useState([]);
  const [paginas,guardarPaginas] = useState(1); 
  const [loading, setloading] = useState(false);


  const tokens = localStorage.getItem('token');

  useEffect(() => {

    const consultar = async () => {
      
      let page = paginas;
      let tokend = tokens;
    try{
        
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/photos/${page}`
      let config = { headers: { token: tokend} }

      const respuesta = await axios.get(url, config)
      /* console.log(respuesta); */
      let resultado = respuesta.data.data;
      guardarImagenes(resultado);
      setloading(true);

    }catch(error){
      setloading(false);
      console.log(error);
    }
      
      

    }

    if(!loading && tokens){
      consultar();
    }

  }, [imagenes,paginas,loading,tokens]);


  

  return (
    <Container>
      <Paginacion guardarPaginas={guardarPaginas} paginas={paginas} setloading={setloading}/>
      { !loading ? <Spinner /> : null} 
      <ListadoImagen imagenes={imagenes} />  
    </Container>
  );
}

export default Dashboard;
