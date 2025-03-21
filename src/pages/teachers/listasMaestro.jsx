import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/listasTeachers.css";
import { AuthContext } from '../../context/AuthContext';
import { getToken, getUser } from '../../services/authService';
import { getGruposMaestro, getListas } from "../../services/listaServices";
import { faArrowLeft, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    // Orientación horizontal
    orientation: 'landscape',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  schoolInfo: {
    fontSize: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginHorizontal: 'auto',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    backgroundColor: '#E4E4E4',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 70, // Ancho fijo para fechas
  },
  tableColHeaderNombre: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    backgroundColor: '#E4E4E4',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    width: 150, // Ancho fijo para nombres
  },
  tableColHeaderTotal: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    backgroundColor: '#E4E4E4',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 50, // Ancho fijo para total
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 8,
    textAlign: 'center',
    width: 70, // Ancho fijo para fechas
  },
  tableColNombre: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 8,
    textAlign: 'left',
    width: 150, // Ancho fijo para nombres
  },
  tableColTotal: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 8,
    width: 50, // Ancho fijo para total
  },
  tableCell: {
    margin: 'auto',
    fontSize: 8,
  },
  asistenciaCell: {
    backgroundColor: '#d4edda',
    padding: 3,
    borderRadius: 2,
    textAlign: 'center',
    marginVertical: 2,
  },
  asistenciaFaltaCell: {
    backgroundColor: '#fff3cd',
    padding: 3,
    borderRadius: 2,
    textAlign: 'center',
    marginVertical: 2,
  },
  faltaCell: {
    backgroundColor: '#f8d7da',
    padding: 3,
    borderRadius: 2,
    textAlign: 'center',
    marginVertical: 2,
  },
});

// Función para determinar el estado de asistencia (para PDF)
const getPDFAsistenciaStatus = (asistencia) => {
  return asistencia.asistencia === 1 ? "Presente" : "Ausente";
};

// Componente PDF
// Componente PDF
const AsistenciasPDF = ({ alumnos, fechasClase, periodoFecha, idGrupo, idMateria }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Reporte de Asistencias</Text>
        <Text style={styles.subtitle}>Periodo: {periodoFecha}</Text>
        <Text style={styles.schoolInfo}>Grupo ID: {idGrupo} | Materia ID: {idMateria}</Text>
      </View>
      <View style={styles.table}>
        {/* Encabezados de la tabla */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeaderNombre}>
            <Text style={styles.tableCell}>Nombre</Text>
          </View>
          {fechasClase.map(fecha => (
            <View key={fecha} style={styles.tableColHeader}>
              <Text style={styles.tableCell}>{new Date(fecha).toLocaleDateString()}</Text>
            </View>
          ))}
          <View style={styles.tableColHeaderTotal}>
            <Text style={styles.tableCell}>Total</Text>
          </View>
        </View>

        {/* Filas de alumnos */}
        {alumnos.map(alumno => {
          const totalAsistencias = alumno.asistencias.filter(a => a.asistencia === 1).length;

          return (
            <View key={alumno.idUsuario} style={styles.tableRow}>
              <View style={styles.tableColNombre}>
                <Text style={styles.tableCell}>{alumno.nombreCompleto}</Text>
              </View>
              {fechasClase.map(fecha => {
                const asistenciasDelDia = alumno.asistencias.filter(asistencia => {
                  const fechaAsistencia = new Date(asistencia.fecha).toISOString().split('T')[0];
                  return fechaAsistencia === fecha;
                });

                // Contador de presentes y ausentes
                const presentes = asistenciasDelDia.filter(a => a.asistencia === 1).length;
                const ausentes = asistenciasDelDia.filter(a => a.asistencia !== 1).length;

                return (
                  <View key={fecha} style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {asistenciasDelDia.length > 0 ? (
                        <>
                          {presentes > 0 && (
                            <Text style={styles.asistenciaCell}>
                              {presentes === 1 ? "Presente" : `Presente(${presentes})`}
                            </Text>
                          )}
                          {ausentes > 0 && (
                            <Text style={styles.asistenciaFaltaCell}>
                              {ausentes === 1 ? "Ausente" : `Ausente(${ausentes})`}
                            </Text>
                          )}
                        </>
                      ) : (
                        <Text>No hay asistencias</Text>
                      )}
                    </Text>
                  </View>
                );
              })}
              <View style={styles.tableColTotal}>
                <Text style={styles.tableCell}>{totalAsistencias}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </Page>
  </Document>
);

function ListasMaestro() {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  const user = getUser();
  const token = getToken();
  const idUsuario = user?.id;

  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [grupoSeleccionado, setGrupoSeleccionado] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [mensajeSinGrupos, setMensajeSinGrupos] = useState(false);
  const [fechasClase, setFechasClase] = useState([]);

  useEffect(() => {
    const cargarGrupos = async () => {
      try {
        const gruposData = await getGruposMaestro(idUsuario, token, handleLogout);
        setGrupos(gruposData);
        setMensajeSinGrupos(gruposData.length === 0);
      } catch (error) {
        console.error('Error al cargar los grupos:', error.message);
      }
    };

    cargarGrupos();
  }, [idUsuario, token, handleLogout]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!grupoSeleccionado) {
      console.error('No se ha seleccionado un grupo'); return;
    }

    const { idGrupo, idClase } = JSON.parse(grupoSeleccionado);
    const formattedStartDate = new Date(horaInicio).toISOString().split('T')[0] + 'T00:00:00Z';
    const formattedEndDate = new Date(horaFin).toISOString().split('T')[0] + 'T23:59:59Z';

    try {
      const listasData = await getListas(idUsuario, token, formattedStartDate, formattedEndDate, idGrupo, idClase, handleLogout);
      setAlumnos(listasData);

      const fechas = new Set();
      listasData.forEach(alumno => {
        alumno.asistencias.forEach(asistencia => {
          const fecha = new Date(asistencia.fecha).toISOString().split('T')[0];
          fechas.add(fecha);
        });
      });
      setFechasClase(Array.from(fechas).sort());
      setMostrarTabla(true);
    } catch (error) {
      console.error('Error al cargar las listas:', error.message);
    }
  };

  const getAsistenciaColor = (asistencia) => {
    return asistencia.asistencia === 1 ? 'asistencia' : 'asistencia-falta';
  };

  return (
    <div className="container-crear">
      <button onClick={() => navigate(-1)} className="backButton-crear">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <h1 className="title-crear">Listas Maestros</h1>
      <form className="listas-teachers-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="horaInicio">Hora de Inicio:</label>
          <input type="date" id="horaInicio" className="input"
            value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="horaFin">Hora de Fin:</label>
          <input type="date" id="horaFin" className="input"
            value={horaFin} onChange={(e) => setHoraFin(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="grupo">Selecciona un Grupo:</label>
          <select id="grupo" className="input"
            value={grupoSeleccionado} onChange={(e) => setGrupoSeleccionado(e.target.value)} required>
            <option value="">Seleccione un grupo</option>
            {grupos.map(grupo => (
              <option key={grupo.idClase} value={JSON.stringify({ idGrupo: grupo.idGrupo, idMateria: grupo.idMateria, idClase: grupo.idClase })}>
                {grupo.clase}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className='sendButton'>Cargar Alumnos</button>
      </form>
      {mensajeSinGrupos && <p>No hay grupos disponibles para este maestro.</p>}
      {mostrarTabla && (
        <div>
          <table className="listas-teachers-table">
            <thead>
              <tr>
                <th>Nombre</th>
                {fechasClase.map(fecha => (
                  <th key={fecha}>{new Date(fecha).toLocaleDateString()}</th>
                ))}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map(alumno => {
                const totalAsistencias = alumno.asistencias.filter(a => a.asistencia === 1).length;
                return (
                  <tr key={alumno.idUsuario}>
                    <td>{alumno.nombreCompleto}</td>
                    {fechasClase.map(fecha => {
                      const asistenciasDelDia = alumno.asistencias.filter(asistencia => {
                        const fechaAsistencia = new Date(asistencia.fecha).toISOString().split('T')[0];
                        return fechaAsistencia === fecha;
                      });
                      return (
                        <td key={fecha}>
                          {asistenciasDelDia.length > 0 ? (
                            asistenciasDelDia.map(asistencia => (
                              <div key={asistencia._id} className={`asistencia-marker ${getAsistenciaColor(asistencia)}`}></div>
                            ))
                          ) : (
                            <div className="no-asistencias">No hay asistencias</div>
                          )}
                        </td>
                      );
                    })}
                    <td>{totalAsistencias}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          <PDFDownloadLink
            document={
              <AsistenciasPDF
                alumnos={alumnos}
                fechasClase={fechasClase}
                periodoFecha={`${horaInicio} a ${horaFin}`}
                idGrupo={grupoSeleccionado ? JSON.parse(grupoSeleccionado).idGrupo : ''}
                idMateria={grupoSeleccionado ? JSON.parse(grupoSeleccionado).idMateria : ''}
              />
            }
            fileName={`asistencias_${new Date().toISOString().split('T')[0]}_${grupoSeleccionado ? `grupo${JSON.parse(grupoSeleccionado).idGrupo}_materia${JSON.parse(grupoSeleccionado).idMateria}` : 'sin_grupo'}.pdf`}
          >
            {({ loading }) => (
              loading ?
                'Cargando documento...' :
                <button className="listas-teachers-update-button">
                  <FontAwesomeIcon icon={faFilePdf} /> Generar PDF
                </button>
            )}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export default ListasMaestro;