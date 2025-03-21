import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/listasTeachers.css";

function ListasMaestro() {
  const navigate = useNavigate();
  
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [grupo, setGrupo] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [asistencias, setAsistencias] = useState({});

  const datosAlumnos = {
    'Grupo A': ['Juan', 'María', 'Pedro'],
    'Grupo B': ['Ana', 'Luis', 'Carlos'],
    'Grupo C': ['Sofía', 'Diego', 'Laura'],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const alumnosGrupo = datosAlumnos[grupo] || [];
    const asistenciasGrupo = {};
    alumnosGrupo.forEach(alumno => {
      asistenciasGrupo[alumno] = false; // Inicialmente, todos están ausentes
    });
    setAlumnos(alumnosGrupo);
    setAsistencias(asistenciasGrupo);
    setMostrarTabla(true);
  };

  const handleActualizar = () => {
    // Aquí puedes implementar la lógica para actualizar las asistencias en la base de datos
    console.log('Asistencias actualizadas:', asistencias);
  };

  const conteoAsistencias = Object.values(asistencias).filter(asistencia => asistencia).length;

  return (
    <div className="listas-teachers-container">
      <h1 className="listas-teachers-title">Listas Maestros</h1>
      <form className="listas-teachers-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="hora Inicio">Hora de Inicio:</label>
          <input type="date" id="horaInicio" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="horaFin">Hora de Fin:</label>
          <input type="date" id="horaFin" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="grupo">Selecciona un Grupo:</label>
          <select id="grupo" value={grupo} onChange={(e) => setGrupo(e.target.value)} required>
            <option value="">--Selecciona--</option>
            <option value="Grupo A">Grupo A</option>
            <option value="Grupo B">Grupo B</option>
            <option value="Grupo C">Grupo C</option>
          </select>
        </div>
        <button type="submit">Cargar Alumnos</button>
      </form>
      {mostrarTabla && (
        <div>
          <table className="listas-teachers-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Asistencia</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => (
                <tr key={alumno}>
                  <td>{alumno}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="listas-teachers-checkbox"
                      checked={asistencias[alumno]}
                      onChange={() => setAsistencias({ ...asistencias, [alumno]: !asistencias[alumno] })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="listas-teachers-count-container">
            Total de Asistencias: {conteoAsistencias} de {alumnos.length}
          </div>
          <button className="listas-teachers-update-button" onClick={handleActualizar}>Actualizar Asistencias</button>
        </div>
      )}
    </div>
  );
}

export default ListasMaestro;