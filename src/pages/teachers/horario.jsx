import React from 'react';
import '../../styles/horario.css';

const horario = () => {
  return (
    <div className="horario-container">
      <h1 className="horario-title">Horario</h1>
      <table className="horario-table">
        <thead>
          <tr>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
          </tr>
        </thead>
        <tbody>
          {/* Agrega aquí filas y celdas adicionales para el contenido de la tabla */}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {/* Agrega más filas según sea necesario */}
        </tbody>
      </table>
    </div>
  );
};

export default horario;


