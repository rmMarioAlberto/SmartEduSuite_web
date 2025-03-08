import React, { useEffect, useState } from "react";
import "../../styles/Grafica.css";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getToken, getUser } from "../../services/authService";
import { getGrupos } from "../../services/grupoService";
import { AuthContext } from "../../context/AuthContext";

const data = [
  { fecha: "01/02", horas: 6 },
  { fecha: "02/02", horas: 4 },
  { fecha: "03/02", horas: 8 },
  { fecha: "04/02", horas: 5 },
];

const grafica = () => {
  const navigate = useNavigate();

  const user = getUser();
  const token = getToken();
  const idUsuario = user?.id;

  const { handleLogout } = useContext(AuthContext);


  const [graficaTipo, setGraficaTipo] = useState('');
  const [fechaStart, setFechaStart] = useState('');
  const [fechaEnd, setFechaEnd] = useState('');
  const [salon, setSalon] = useState('');
  const [grafica, setGrafica] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchGrafica = () => {

  }


  useEffect(() => {
          const fetchData = async () => {
              setLoading(true);
              setError(null);
              try {
                  const dataGrupos = await getGrupos(idUsuario, token, handleLogout);
                  setCarreras(dataGrupos);
              } catch (error) {
                  setError(`Error al cargar los datos: ${error.message}`);
              } finally {
                  setLoading(false);
              }
          };
          fetchData();
      }, [idUsuario, token, handleLogout]);

  return (
    <div className="container">
      {/* Botón de regreso */}
      <button onClick={() => navigate(-1)} className="back-button">
        <IoArrowBack />
      </button>

      {/* Título */}
      <h1 className="title">Gráfica</h1>

      {/* Filtros */}
      <div className="filtros">
        <button className="filtro-button">Tipo de gráfica</button>
        <select name="grafica" className="">
          <option value="temp">Temperatura</option>
          <option value="luz">Iluminacion</option>
        </select>
        <button className="filtro-button">Fecha Inicial</button>
        <input type="date" name="" id="" />
        <button className="filtro-button">Fecha final</button>
        <input type="date" name="" id="" />
        <button className="filtro-button">Salon</button>
        <select name="salon" >
          <option value="1">salon 1</option>
          <option value="2">salon 2</option>
          <option value="3">salon 3</option>
        </select>
      </div>

      <p className="subtitle">Promedio de horas de luz artificial:</p>
      <p className="subtitle">Promedio de temperatura:</p>

      {/* Gráfica */}
      <div className="chart">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" label={{ value: "Fechas", position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: "Horas", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey="horas" fill="#4e6b7c" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Botón de exportar */}
      <button className="export-button">Generar gráfica</button>
    </div>
  );
};

export default grafica;
