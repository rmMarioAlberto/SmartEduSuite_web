import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/horarioMaestro.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getHorarioDia, getClasesActivas } from "../../services/horariosServices";
import { AuthContext } from '../../context/AuthContext';
import { getToken, getUser    } from '../../services/authService';

function HorarioMaestro() {
  const navigate = useNavigate();
  const [clasesDelDia, setClasesDelDia] = useState([]);
  const [claseActiva, setClaseActiva] = useState(null);

  const { handleLogout } = useContext(AuthContext);
  const user = getUser   ();
  const token = getToken();
  const idUsuario = user?.id;

  useEffect(() => {
    const fetchClasesDelDia = async () => {
      try {
        const response = await getHorarioDia(idUsuario, token, handleLogout);
        const transformedClases = response.clases.map(clase => ({
          id: clase.idclase,
          materia: clase.nombremateria,
          hora: `${clase.inicioclase} - ${clase.finalclase}`,
          grupo: clase.gruponombre,
          salon: clase.salonnombre
        }));
        setClasesDelDia(transformedClases);
      } catch (error) {
        console.error("Error en la solicitud de clases del día:", error.message);
      }
    };

    fetchClasesDelDia();
    fetchClaseActiva();
  }, [idUsuario, token, handleLogout]);

  const fetchClaseActiva = async () => {
    try {
      setClaseActiva(null); // Restablecer el estado antes de la nueva solicitud
      const response = await getClasesActivas(idUsuario, token, handleLogout);
      setClaseActiva(response);
    } catch (error) {
      console.error("Error en la solicitud de clase activa:", error.message);
    }
  };

  const formatFechaStart = (fechaStart) => {
    const date = new Date(fechaStart);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="teachers-horario-container">
      <button onClick={() => navigate(-1)} className="backButton">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <h1 className="teachers-clase-title">Horarios</h1>
      <div className="content-container">
        <div className="left-column">
          <div className="schedule-container">
            <h2>Clases del Día</h2>
            {clasesDelDia.map(clase => (
              <div key={clase.id} className="class-item">
                <p><strong>Materia:</strong> {clase.materia}</p>
                <p><strong>Hora:</strong> {clase.hora}</p>
                <p><strong>Grupo:</strong> {clase.grupo}</p>
                <p><strong>Salón:</strong> {clase.salon}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="right-column">
          <div className="active-classes-container">
            <h2>Clases Activas</h2>
            {claseActiva ? (
              <div className="class-item">
                <p><strong>Materia:</strong> {claseActiva.nombremateria}</p>
                <p><strong>Hora:</strong> {claseActiva.inicioclase} - {claseActiva.finalclase}</p>
                <p><strong>Grupo:</strong> {claseActiva.gruponombre}</p>
                <p><strong>Salón:</strong> {claseActiva.salonnombre}</p>
                <p><strong>Hora de inicio:</strong> {formatFechaStart(claseActiva.fechaStart)}</p>
              </div>
            ) : (
              <p className='text'>No hay clases activas en este momento.</p>
            )}
            <button onClick={fetchClaseActiva} className="refreshButton">Actualizar</button>
 </div>
          <div className="qr-container">
            <h2>Código QR</h2>
            {claseActiva && (
              <img src={claseActiva.qrCode} alt="QR Code" className="qr-image" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorarioMaestro;