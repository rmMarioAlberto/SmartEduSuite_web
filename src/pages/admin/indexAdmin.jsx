import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "../../styles/AdminsHome.css";
import { FaClock, FaChalkboardTeacher, FaUsers, FaChartBar, FaBook, FaGraduationCap } from "react-icons/fa"; HEAD
import indexMateria from './indexMateria';
import { FaLanguage } from "react-icons/fa";


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
        <div className="button" onClick={() => navigate('/admin/horario')}>
          <FaClock className="icon" />
          <span>Horarios</span>
        </div>
        <div className="button" onClick={() => navigate('/admin/crud-maestros')}>
          <FaChalkboardTeacher className="icon" />
          <span>Maestros/as</span>
        </div>
        <div className="button" onClick={() => navigate('/admin/crud-grupos')}>
          <FaUsers className="icon" />
          <span>Grupos</span>
        </div>
        <div className="button" onClick={() => navigate('/admin/grafica')}>
          <FaChartBar className="icon" />
          <span>Estadísticas</span>
        </div>
      </div>
      <div className="admin-home-buttons_two">
        <div className="button" onClick={() => navigate('/admin/crud-materias')}>
          <FaBook className="icon" />
          <span>Materias</span>
        </div>
        <div className="button" onClick={() => navigate('/admin/crud-carreras')}>
          <FaGraduationCap className="icon" />
          <span>Carreras</span>
        </div>
        <div className="button" onClick={() => navigate('/admin/crud-alumnos')}>
          <FaGraduationCap className="icon" />
          <span>Alumnos</span>
        </div>
        <div className="button" onClick={() => navigate('/admin/crud-salones')}>
          <FaGraduationCap className="icon" />
          <span>Salones</span>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogoutClick}>Salir</button>
    </div>
  );
}

export default IndexAdmin;