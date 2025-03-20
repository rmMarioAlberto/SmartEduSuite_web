import "../../styles/listaCreacion.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getMateriasActivas, getGruposActivos, getMaestrosActivos, getSalonesActivos, addClase, getHoras, getClasesById, updateClase } from '../../services/claseService';
import { getUser, getToken } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

const CrearClase = () => {
  const navigate = useNavigate();
  const { idclase } = useParams();

  // Estados para manejar los datos
  const [materias, setMaterias] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [maestros, setMaestros] = useState([]);
  const [salones, setSalones] = useState([]);
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [status, setStatus] = useState("1"); // Estado por defecto

  // Estados para los campos del formulario
  const [selectedMateria, setSelectedMateria] = useState("");
  const [selectedGrupo, setSelectedGrupo] = useState("");
  const [selectedMaestro, setSelectedMaestro] = useState("");
  const [selectedSalon, setSelectedSalon] = useState("");
  const [selectedDia, setSelectedDia] = useState("");

  const { handleLogout } = useContext(AuthContext);
  const user = getUser();
  const token = getToken();
  const idUsuario = user?.id;

  const [originalValues, setOriginalValues] = useState({
    materia: "",
    grupo: "",
    maestro: "",
    salon: ""
  });

  const [originalHoursDay, setOriginalHoursDay] = useState({
    day: "",
    hours: []
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const materiasData = await getMateriasActivas(idUsuario, token, handleLogout);
        const gruposData = await getGruposActivos(idUsuario, token, handleLogout);
        const maestrosData = await getMaestrosActivos(idUsuario, token, handleLogout);
        const salonesData = await getSalonesActivos(idUsuario, token, handleLogout);

        setMaterias(materiasData);
        setGrupos(gruposData);
        setMaestros(maestrosData);
        setSalones(salonesData);

        if (idclase) {
          const claseData = await getClasesById(idUsuario, token, idclase, handleLogout);
          if (claseData.length > 0) {
            const clase = claseData[0];
            setSelectedMateria(clase.idmateria);
            setSelectedGrupo(clase.idgrupo);
            setSelectedMaestro(clase.idmaestroclase);
            setSelectedSalon(clase.idsalon);
            setSelectedDia(clase.diaclase);
            setStatus(clase.statusclase.toString());

            // Guardar los valores originales
            setOriginalValues({
              materia: clase.idmateria,
              grupo: clase.idgrupo,
              maestro: clase.idmaestroclase,
              salon: clase.idsalon,
              dia: clase.diaclase
            });

            // Calcular todas las horas de la clase
            const horaInicio = parseInt(clase.inicoclase.split(':')[0]);
            const horaFin = parseInt(clase.finalclase.split(':')[0]);
            const horas = [];
            for (let h = horaInicio; h < horaFin; h++) {
              horas.push(h);
            }

            // Guardar el día y las horas originales en un solo objeto
            setOriginalHoursDay({
              day: clase.diaclase,
              hours: horas
            });

            setSelectedSchedules(horas);
          }
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error.message);
      }
    };

    loadData();
  }, [idUsuario, token, idclase, handleLogout]);


  const handleFirstFormSubmit = (e) => {
    e.preventDefault();
    loadAvailableSchedules();
  };


  const loadAvailableSchedules = async () => {
    if (!selectedSalon || !selectedDia) {
      alert("Por favor, seleccione un salón y un día.");
      return;
    }

    try {
      // Obtener los horarios disponibles del servidor
      const response = await getHoras(idUsuario, token, selectedSalon, selectedDia, handleLogout);
      const horasServer = response.data.horas_disponibles || [];

      // Convertir a strings para comparación segura
      const daySelected = String(selectedDia);
      const originalDay = String(originalHoursDay.day);

      // Si estamos en el día original
      if (daySelected === originalDay) {
        console.log("Estamos en el día original");

        // Crear una copia de los horarios con las horas originales marcadas como disponibles
        const horasModificadas = horasServer.map(hora => {
          if (originalHoursDay.hours.includes(hora.hora)) {
            return { ...hora, disponible: true };
          }
          return hora;
        });

        setAvailableSchedules(horasModificadas);
        // Restaurar las horas originales como seleccionadas
        setSelectedSchedules([...originalHoursDay.hours]);
      } else {
        setAvailableSchedules(horasServer);
        setSelectedSchedules([]); // Limpiar las horas seleccionadas en días que no son el original
      }
    } catch (error) {
      console.error("Error al cargar los horarios:", error);
      alert(`Error al cargar los horarios: ${error.message}`);
    }
  };

  // Función para verificar si las horas son continuas
  const areHoursContinuous = (hours) => {
    for (let i = 0; i < hours.length - 1; i++) {
      if (hours[i + 1] - hours[i] !== 1) {
        return false;
      }
    }
    return true;
  };

  const handleDayChange = (e) => {
    const newDay = e.target.value;
    setSelectedDia(newDay);

    // Dar tiempo para que se actualice el estado antes de cargar horarios
    setTimeout(() => {
      loadAvailableSchedules();
    }, 100);
  };

  const handleScheduleSelection = (e) => {
    const { value, checked } = e.target;
    const hour = parseInt(value);

    setSelectedSchedules(prevSchedules => {
      let newSchedules;
      if (checked) {
        // Añadir la hora si no está ya seleccionada
        newSchedules = [...prevSchedules, hour];
      } else {
        // Remover la hora si está seleccionada
        newSchedules = prevSchedules.filter(h => h !== hour);
      }

      // Ordenar las horas
      newSchedules.sort((a, b) => a - b);

      // Verificar continuidad solo si hay más de 1 hora
      if (newSchedules.length > 1 && !areHoursContinuous(newSchedules)) {
        alert("Solo puedes seleccionar horas continuas");
        return prevSchedules; // Mantener selección anterior si no es continua
      }

      return newSchedules;
    });
  };


  const handleSecondFormSubmit = async (e) => {
    e.preventDefault();

    // Verificar que se haya seleccionado al menos un horario
    if (selectedSchedules.length === 0) {
      alert("Por favor, seleccione al menos un horario.");
      return;
    }

    // Obtener la hora de inicio y final del horario seleccionado
    const inicio = `${Math.min(...selectedSchedules)}:00:00`;
    const final = `${Math.max(...selectedSchedules) + 1}:00:00`;

    try {
      let response;
      if (idclase) {
        // Actualizar la clase existente
        response = await updateClase(
          idclase,
          status,
          inicio,
          final,
          selectedDia,
          selectedMaestro,
          selectedGrupo,
          selectedMateria,
          selectedSalon,
          idUsuario,
          token,
          handleLogout
        );
      } else {
        // Crear una nueva clase
        response = await addClase(
          status,
          inicio,
          final,
          selectedDia,
          selectedMaestro,
          selectedGrupo,
          selectedMateria,
          selectedSalon,
          idUsuario,
          token,
          handleLogout
        );
      }

      // Mostrar mensaje de éxito
      alert(response.message);
      navigate('/admin/consulta-clase'); // Redirigir a la lista de clases
    } catch (error) {
      // Mostrar mensaje de error
      alert(`Error al ${idclase ? 'actualizar' : 'crear'} la clase: ${error.message}`);
    }
  };


  return (
    <div className="container-crear">
      {/* Header */}
      <header className="header-crear">
        {/* Botón de regreso */}
        <button onClick={() => navigate('/admin/crud-clases')} className="backButton-crear">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
        {/* Título */}
        <h1 className="title-crear">Crear clase</h1>
      </header>
      <label className="label">Ingrese el nombre de la materia:
        <input type="text" className="input" placeholder="Materia" required />
      </label>

      <div className="container-grid">
        {/* Columna 1 */}
        <div className="column1">
          <form className="form">

            <label className="label">Seleccione el grupo:</label>
            <select name="grupo" id="grupo" className="select" required>
              <option>Grupo</option>
            </select>
            <label className="label">Seleccione al maestro:</label>
            <select name="maestro" id="maestro" className="select" required>
              <option>Maestro</option>
            </select>
            <label className="label">Seleccione el salón:</label>
            <select name="salon" id="salon" className="select" required>
              <option>Salón</option>
            </select>
          </form>
        </div>

        {/* Columna 2 */}
        <div className="column2">
          <form className="form">
            <label className="label">Seleccione el día:</label>
            <select name="dia" id="dia" className="select" required>
              <option>Día</option>
            </select>
            <label className="label">Seleccione el horario:</label>
            <select name="horario" id="horario" className="select" required>
              <option>Horario</option>
            </select>
            <label className="label">Status:</label>
            <select name="status" id="status" className="select" required>
              <option>Status</option>
            </select>
          </form>
        <button onClick={() => navigate('/admin/crud-clases')} className="backButton-crear">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
        <h1 className="title-crear">{idclase ? "Editar clase" : "Crear clase"}</h1>    

      <div className="form-container-crear">
        {/* Primer formulario */}
        <form className="form-crear" onSubmit={handleFirstFormSubmit}>
          <label className="label-crear">Seleccione de materia:</label>
          <select
            name="materia"
            className="select-crear"
            value={selectedMateria}
            onChange={(e) => setSelectedMateria(e.target.value)}
            required
          >
            <option value="">Materia</option>
            {materias.map((materia) => (
              <option key={materia.id} value={materia.id}>{materia.nombre}</option>
            ))}
          </select>
          {idclase && !materias.some(m => m.id === originalValues.materia) && <p className="warning">La materia registrada está desactivada o no disponible.</p>}

          <label className="label-crear">Seleccione el grupo:</label>
          <select
            name="grupo"
            className="select-crear"
            value={selectedGrupo}
            onChange={(e) => setSelectedGrupo(e.target.value)}
            required
          >
            <option value="">Grupo</option>
            {grupos.map((grupo) => (
              <option key={grupo.id} value={grupo.id}>{grupo.nombre}</option>
            ))}
          </select>
          {idclase && !grupos.some(g => g.id === originalValues.grupo) && <p className="warning">El grupo registrado está desactivado o no disponible.</p>}
          <label className="label-crear">Seleccione al maestro:</label>
          <select
            name="maestro"
            className="select-crear"
            value={selectedMaestro}
            onChange={(e) => setSelectedMaestro(e.target.value)}
            required
          >
            <option value="">Maestro</option>
            {maestros.map((maestro) => (
              <option key={maestro.id} value={maestro.id}>{maestro.nombremaestro}</option>
            ))}
          </select>
          {idclase && !maestros.some(m => m.id === originalValues.maestro) && <p className="warning">El maestro registrado está desactivado o no disponible.</p>}
          <label className="label-crear">Seleccione el salón:</label>
          <select
            name="salon"
            className="select-crear"
            value={selectedSalon}
            onChange={(e) => setSelectedSalon(e.target.value)}
            required
          >
            <option value="">Salón</option>
            {salones.map((salon) => (
              <option key={salon.id} value={salon.id}>{salon.salon}</option>
            ))}
          </select>
          {idclase && !salones.some(s => s.id === originalValues.salon) && <p className="warning">El salón registrado está desactivado o no disponible.</p>}
          <label className="label-crear">Seleccione el día:</label>
          <select
            name="dia"
            className="select-crear"
            value={selectedDia}
            onChange={handleDayChange}
            required
          >
            <option value="">Día</option>
            <option value="1">Lunes</option>
            <option value="2">Martes</option>
            <option value="3">Miércoles</option>
            <option value="4">Jueves</option>
            <option value="5">Viernes</option>
            <option value="6">Sábado</option>
            <option value="7">Domingo</option>
          </select>

          <label className="label-crear">Seleccione el estado de la clase:</label>
          <select
            name="status"
            className="select-crear"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select>

          {/* Botón para cargar el segundo formulario */}
          <button type="button" className="nextButton-crear" onClick={loadAvailableSchedules}>
            Cargar Horarios
          </button>
        </form>

        {/* Tabla de horarios */}
        <div className="schedule-container-crear">
          <label className="label-crear">Seleccione el horario:</label>
          <table className="schedule-table-crear">
            <thead>
              <tr>
                <th>Horario</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {availableSchedules.map((schedule) => {
                const isCurrentSchedule = selectedSchedules.includes(schedule.hora);
                const isOriginalSchedule = originalHoursDay.day === selectedDia && originalHoursDay.hours.includes(schedule.hora);

                // Una hora está disponible si el servidor dice que está disponible o si es una hora original en el día original
                const isAvailable = schedule.disponible || isOriginalSchedule;

                return (
                  <tr
                    key={schedule.hora}
                    style={{
                      backgroundColor: isCurrentSchedule ? '#007bff' : (isAvailable ? '#0dba2a69' : '#ee040470')
                    }}
                  >
                    <td>{schedule.hora_formato}</td>
                    <td>
                      <input
                        type="checkbox"
                        value={schedule.hora}
                        onChange={handleScheduleSelection}
                        checked={isCurrentSchedule}
                        disabled={!isAvailable} // Deshabilitar si no está disponible
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botones de envío */}
      <div className="buttonContainer-crear">
        <button type="button" className="cancelButton-crear" onClick={() => navigate(-1)}>
          Cancelar
        </button>
        <button type="submit" className="sendButton-crear" onClick={handleSecondFormSubmit}>
          Enviar
        </button>
      </div>
    </div>
    </div>
    </div>

  );
}

export default CrearClase;