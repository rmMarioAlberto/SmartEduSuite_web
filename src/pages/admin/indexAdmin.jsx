import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService'; // Importamos logout
import "../../styles/AdminsHome.css";
import { FaClock, FaChalkboardTeacher, FaUsers, FaChartBar, FaBook, FaGraduationCap } from "react-icons/fa";
import indexMateria from './indexMateria';

function IndexAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Eliminamos el usuario del localStorage.
    navigate('/login'); // Redirigir al login.
  };

  return (
    <div className="admin-home-container">
      <div className="admin-home-header">
      <h1 className="admin-home-title">SmartEdu Suite</h1>
      <h4 className="admin-home-subtitle">Administrador</h4>
      </div>
      <div className="admin-home-buttons_one">
        <div className="button" onClick={() => navigate('/horario')}>
          <FaClock className="icon" />
          <span>Horarios</span>
        </div>
        <div className="button" onClick={() => navigate('/maestros')}>
          <FaChalkboardTeacher className="icon" />
          <span>Maestros/as</span>
        </div>
        <div className="button" onClick={() => navigate('/grupo')}>
          <FaUsers className="icon" />
          <span>Grupo</span>
        </div>
        <div className="button" onClick={() => navigate('/estadisticas')}>
          <FaChartBar className="icon" />
          <span>Estadísticas</span>
        </div>
      </div>
      <div className="admin-home-buttons_two">
        <div className="button" onClick={() => navigate('/admin/indexMateria')}>
          <FaBook className="icon" />
          <span>Materia</span>
        </div>
        <div className="button" onClick={() => navigate('/indexCarrera')}>
          <FaGraduationCap className="icon" />
          <span>Carrera</span>
        </div>
        <div className="button" onClick={() => navigate('/alumnos')}>
          <FaGraduationCap className="icon" />
          <span>Alumnos</span>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>Salir</button>
    </div>
  );
}

export default IndexAdmin;
