import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/AuthService'; // Se importa el logout.
import "../../styles/TeachersHome.css";
import horario from './horario';

function horarioMaestro() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Este es para eliminar al usuario del localStorage.
    navigate('/login'); // Para dirigir al login.
  };

  return (
    <div className="teachers-home-container">
      <h1 className="teachers-home-title">Horario</h1>
      <horario />
    </div>
  );
}

export default horarioMaestro;



