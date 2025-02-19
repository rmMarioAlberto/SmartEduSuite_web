import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService'; // Se importa el logout.
import "../../styles/TeachersHome.css";
import { FaClock, FaClipboardList } from "react-icons/fa";

function indexCarrera() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Este es para eliminar al usuario del localStorage.
    navigate('/login'); // Para dirigir al login.
  };

  return (
    <div className="teachers-home-container">
      <h1 className="teachers-home-title">SmartEdu Suite</h1>
      <div className="teachers-home-buttons">
        <div className="button-card" onClick={() => navigate('/teachers/horarioMaestro')}>
          <FaClock className="icon" />
          <span>Horario</span>
        </div>
        <div className="button-card" onClick={() => navigate('/listasMaestro')}>
          <FaClipboardList className="icon" />
          <span>Asistencias</span>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>Salir</button>
    </div>
  );
}

export default indexCarrera;



