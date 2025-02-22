import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; 
import "../../styles/TeachersHome.css";
import { FaClock, FaClipboardList } from "react-icons/fa";

function TeachersHome() {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
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
      <button className="logout-button" onClick={handleLogoutClick}>Salir</button>
    </div>
  );
}

export default TeachersHome;