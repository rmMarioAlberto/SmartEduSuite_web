import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/TeachersHome.css";


function listasMaestro() {
  const navigate = useNavigate();


  return (
    <div className="teachers-home-container">
      <h1>LIstas maestros</h1>
    </div>
  );
}

export default listasMaestro;



