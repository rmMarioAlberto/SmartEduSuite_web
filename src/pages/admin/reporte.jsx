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

const reporte = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      {/* Botón de regreso */}
      <button onClick={() => navigate(-1)} className="back-button">
        <IoArrowBack />
      </button>

      {/* Título */}
      <h1 className="title">Reporte</h1>

      {/* Filtros */}
      <div className="filtros">
        <label className="label">Seleccione un maestro:
          <select className="filtro-maestro">
            <option value="maestro1">Maestro 1</option>
            <option value="maestro2">Maestro 2</option>
            <option value="maestro3">Maestro 3</option>
            <option value="maestro4">Maestro 4</option>
          </select>
        </label>
        <label className="label"> Seleccione la fecha de inicio:
          <button className="filtro-button">Fecha Inicial</button>
        </label>
        <label className="label">Seleccione la fecha final:
          <button className="filtro-button">Fecha final</button>
        </label>
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

export default reporte;
