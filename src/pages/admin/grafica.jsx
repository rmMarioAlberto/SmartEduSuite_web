import React from "react";
import "../../styles/Grafica.css";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { fecha: "01/02", horas: 6 },
  { fecha: "02/02", horas: 4 },
  { fecha: "03/02", horas: 8 },
  { fecha: "04/02", horas: 5 },
];

const grafica = () => {
    const navigate = useNavigate();
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
        <button className="filtro-button">Fecha Inicial</button>
        <button className="filtro-button">Fecha final</button>
      </div>

      {/* Texto indicador */}
      <p className="subtitle">Promedio de consumo:</p>

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
      <button className="export-button">Exportar reporte</button>
    </div>
  );
};

export default grafica;
