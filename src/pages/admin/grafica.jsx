import React, { useEffect, useState, useContext } from "react";
import "../../styles/Grafica.css";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { getToken, getUser   } from "../../services/authService";
import { getSalones } from "../../services/salonService";
import { tempGrafica, luzGrafica } from "../../services/graficasServices";
import { AuthContext } from "../../context/AuthContext";

const Grafica = () => {
  const navigate = useNavigate();

  const user = getUser  ();
  const token = getToken();
  const idUsuario = user?.id;

  const { handleLogout } = useContext(AuthContext);

  const [graficaTipo, setGraficaTipo] = useState('temp');
  const [fechaStart, setFechaStart] = useState('');
  const [fechaEnd, setFechaEnd] = useState('');
  const [salon, setSalon] = useState('');
  const [grafica, setGrafica] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchGrafica = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (graficaTipo === 'temp') {
        data = await tempGrafica(idUsuario, token, fechaStart, fechaEnd, salon, handleLogout);
        if (data.success) {
          const transformedData = data.data.map(item => ({
            fecha: new Date(item.fecha).toLocaleDateString(),
            horas: item.ventana === 1 ? 1 : 0,
            temperatura: item.temperatura,
            clase: item.clase,
            ventana: item.ventana
          }));
          setGrafica(transformedData);
        }
      } else {
        data = await luzGrafica(idUsuario, token, fechaStart, fechaEnd, salon, handleLogout);
        if (data.success) {
          const transformedData = data.data.map(item => ({
            fecha: new Date(item.fecha).toLocaleDateString(),
            porcentaje: item.porcentaje,
            clase: item.clase,
            foco: item.foco
          }));
          setGrafica(transformedData);
        }
      }

      if (!data.success) {
        setError('Error al obtener los datos de la gráfica');
      }
    } catch (error) {
      setError(`Error al cargar los datos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const calcularPromedio = () => {
    if (grafica.length === 0) return 0;
    if (graficaTipo === 'temp') {
      const totalTemperatura = grafica.reduce((acc, curr) => acc + curr.temperatura, 0);
      return (totalTemperatura / grafica.length).toFixed(2);
    } else {
      const totalPorcentaje = grafica.reduce((acc, curr) => acc + curr.porcentaje, 0);
      return (totalPorcentaje / grafica.length).toFixed(2);
    }
  };

  const getBarColor = (clase, ventana, foco) => {
    if (graficaTipo === 'temp') {
      if (clase === 1) {
        return '#4e6b7c'; // Azul para sin clase
      } else if (clase === 2 && ventana === 0) {
        return '#2ecc71'; // Verde para clase con ventana cerrada
      } else if (clase === 2 && ventana === 1) {
        return '#27ae60'; // Verde oscuro para clase con ventana abierta
      }
    } else {
      if (clase === 1) {
        return '#4e6b7c'; // Azul para sin clase
      } else if (clase === 2 && foco === 0) {
        return '#2ecc71'; // Verde para clase con foco apagado
      } else if (clase === 2 && foco === 1) {
        return '#27ae60'; // Verde oscuro para clase con foco encendido
      }
    }
    return '#bdc3c7'; // Gris por defecto
  };

  useEffect(() => {
    const fetchSalon = async () => {
      try {
        const data = await getSalones(idUsuario, token, handleLogout);
        setGrupos(data);
      } catch (error) {
        setError(`Error al cargar los grupos: ${error.message}`);
      }
    };

    fetchSalon();
  }, [idUsuario, token, handleLogout]);

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-button">
        <IoArrowBack />
      </button>

      <h1 className="title">Gráfica</h1>

      <div className="info">
        <p>Salón: {grupos.find(grupo => grupo.id === parseInt(salon))?.nombre || 'Selecciona un salón'}</p>
        <p>Período: {fechaStart} a {fechaEnd}</p>
      </div>

      <div className="filtros">
        <label className="filtro-label">Tipo de gráfica:</label>
        <select name="grafica" className="filtro-select" onChange={(e) => setGraficaTipo(e.target.value)}>
          <option value="temp">Temperatura</option>
          <option value="luz">Iluminación</option>
        </select>

        <label className="filtro-label">Fecha Inicial:</label>
        <input type="date" className="filtro-input" onChange={(e) => setFechaStart(e.target.value)} />

        <label className="filtro-label">Fecha Final:</label>
        <input type="date" className="filtro-input" onChange={(e) => setFechaEnd(e.target.value)} />

        <label className="filtro-label">Salón:</label>
        <select name="salon" className="filtro-select" onChange={(e) => setSalon(e.target.value)}>
          {grupos.map((grupo) => (
            <option key={grupo.id} value={grupo.id}>
              {grupo.nombre}
            </option>
          ))}
        </select>
      </div>

      <p className="subtitle">
        Promedio: {graficaTipo === 'temp' ? `${calcularPromedio()}°C` : `${calcularPromedio()}%`}
      </p>

      <div className="chart">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={grafica} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" label={{ value: "Fechas", position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: graficaTipo === 'temp' ? "Temperatura (°C)" : "Porcentaje", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey={graficaTipo === 'temp' ? "temperatura" : "porcentaje"} barSize={50}>
              {grafica.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.clase, entry.ventana, entry.foco)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Leyenda de colores condicional */}
      {graficaTipo === 'temp' && (
        <div className="legend">
          <p><span style={{ color: '#4e6b7c' }}>■</span> Sin clase</p>
          <p><span style={{ color: '#2ecc71' }}>■</span> Clase con ventana cerrada</p>
          <p><span style={{ color: '#27ae60' }}>■</span> Clase con ventana abierta</p>
        </div>
      )}
      {graficaTipo === 'luz' && (
        <div className="legend">
          <p><span style={{ color: '#4e6b7c' }}>■</span> Sin clase</p>
          <p><span style={{ color: '#2ecc71' }}>■</span> Clase con foco apagado</p>
          <p><span style={{ color: '#27ae60' }}>■</span> Clase con foco encendido</p>
        </div>
      )}

      <button className="export-button" onClick={handleFetchGrafica}>Generar gráfica</button>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Grafica;