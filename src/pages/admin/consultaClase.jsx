import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { IoSearch } from "react-icons/io5";
import { AuthContext } from '../../context/AuthContext';
import "../../styles/Consulta.css";
// Importar servicios (suponiendo que tienes servicios similares para obtener clases)
// import { getClases, searchClases } from "../../services/clasesServices";
// import { getUser , getToken } from "../../services/authService";

const consultaClase = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <h1 className="title">Clases</h1>
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Ingrese el nombre de la clase:"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearchClases}>
          <IoSearch size={20} color="white" />
        </button>
      </div>

      {/* Tabla de clases */}
      <table className="Table">
        <thead>
          <tr>
            <th>Materia</th>
            <th>Grupo</th>
            <th>Maestro</th>
            <th>Salón</th>
            <th>Día</th>
            <th>Horario</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8">Cargando clases...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="8">{error}</td>
            </tr>
          ) : clases ? (
            clases.length > 0 ? (
              clases.map((clase) => (
                <tr key={clase.id}>
                  <td>{clase.materia}</td>
                  <td>{clase.grupo}</td>
                  <td>{clase.maestro}</td>
                  <td>{clase.salon}</td>
                  <td>{clase.dia}</td>
                  <td>{clase.horario}</td>
                  <td>{clase.status}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/admin/CrearClase/${clase.id}`)}
                      className="updateButton"
                    >
                      Actualizar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No hay clases disponibles</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan="8">Presiona 'Cargar Clases' para ver la lista</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default consultaClase;
