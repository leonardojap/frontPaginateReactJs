import React from 'react';
import '../assets/css/Spinner.css';

const Spinner = () => {
  return (

    <div className="centrar">
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </div>);
}

export default Spinner;