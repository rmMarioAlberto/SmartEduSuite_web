import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../styles/maestros.css"; // ✅ Importamos los estilos

const Maestros = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <h1 className="title">Maestros/as</h1>
      <div className="buttonContainer">
<<<<<<< HEAD:src/pages/admin/maestro.jsx
        <button onClick={() => navigate('/admin/MaestroForm')} className="card">
=======
        <button className="button">
>>>>>>> 9ec53efc70f02655f1c4790c1bf3d87ceb1772c6:src/pages/admin/crudMaestro.jsx
          <FontAwesomeIcon icon={faUser} size="2x" class="icon"/>
          <p className="cardText">Crear maestro/a.</p>
        </button>

<<<<<<< HEAD:src/pages/admin/maestro.jsx
        <button onClick={() => navigate('/admin/ConsultaMaestros')} className="card">
=======
        <button className="button">
>>>>>>> 9ec53efc70f02655f1c4790c1bf3d87ceb1772c6:src/pages/admin/crudMaestro.jsx
          <FontAwesomeIcon icon={faSearch} size="2x" class="icon"/>
          <p className="cardText">Consultar maestro/a.</p>
        </button>
      </div>
    </div>
  );
};

export default Maestros;
