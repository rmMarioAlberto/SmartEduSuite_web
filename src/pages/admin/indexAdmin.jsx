import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService'; // Importamos logout
import "../../styles/AdminsHome.css";
import { FaClock, FaChalkboardTeacher, FaUsers, FaChartBar, FaBook, FaGraduationCap } from "react-icons/fa";

function IndexAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Eliminamos el usuario del localStorage.
    navigate('/login'); // Redirigir al login.
  };

  return (
    <div className="admin-home-container">
      <h1 className="admin-home-title">SmartEdu Suite</h1>
      <h2 className="admin-home-subtitle">Administrador</h2>
      <div className="admin-home-buttons">
        <div className="button-card" onClick={() => navigate('/horario')}>
          <FaClock className="icon" />
          <span>Horarios</span>
        </div>
        <div className="button-card" onClick={() => navigate('/maestros')}>
          <FaChalkboardTeacher className="icon" />
          <span>Maestros/as</span>
        </div>
        <div className="button-card" onClick={() => navigate('/grupo')}>
          <FaUsers className="icon" />
          <span>Grupo</span>
        </div>
        <div className="button-card" onClick={() => navigate('/estadisticas')}>
          <FaChartBar className="icon" />
          <span>Estadísticas</span>
        </div>
        <div className="button-card" onClick={() => navigate('/clase')}>
          <FaBook className="icon" />
          <span>Clase</span>
        </div>
        <div className="button-card" onClick={() => navigate('/carrera')}>
          <FaGraduationCap className="icon" />
          <span>Carrera</span>
        </div>
        <div className="button-card" onClick={() => navigate('/alumnos')}>
          <FaGraduationCap className="icon" />
          <span>Alumnos</span>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>Salir</button>
    </div>
  );
}

export default IndexAdmin;
