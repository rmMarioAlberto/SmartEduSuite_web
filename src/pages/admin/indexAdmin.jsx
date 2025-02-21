import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "../../styles/AdminsHome.css";
import { FaClock, FaChalkboardTeacher, FaUsers, FaChartBar, FaBook, FaGraduationCap } from "react-icons/fa";

function IndexAdmin() {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
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
          <span>Grupo.</span>
        </div>
        <div className="button" onClick={() => navigate('/grafica')}>
          <FaChartBar className="icon" />
          <span>Estadísticas</span>
        </div>
      </div>
      <div className="admin-home-buttons_two">
        <div className="button" onClick={() => navigate('/IndexMateria')}>
          <FaBook className="icon" />
          <span>Materia</span>
        </div>
        <div className="button" onClick={() => navigate('/IndexCarrera')}>
          <FaGraduationCap className="icon" />
          <span>Carrera</span>
        </div>
        <div className="button" onClick={() => navigate('/alumno')}>
          <FaGraduationCap className="icon" />
          <span>Alumnos</span>
        </div>
        <div className="button" onClick={() => navigate('/salon')}>
          <FaGraduationCap className="icon" />
          <span>Salones</span>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogoutClick}>Salir</button>
    </div>
  );
}

export default IndexAdmin;