import React, { useContext, useEffect, useState } from "react";
import "../../styles/Reporte.css";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { reportePuerta } from "../../services/reportesService";
import { AuthContext } from "../../context/AuthContext";
import { getToken, getUser } from "../../services/authService";
import { getSalones } from "../../services/salonService";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
    margin: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "16.66%", // Adjusted for 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

const formatDuration = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const MyDocument = ({ data, salon, inicioDate, finDate }) => {
  const totalDuration = data.reduce((acc, item) => {
    const startDate = new Date(item.fechaStart);
    const endDate = new Date(item.fechaEnd);
    return acc + (endDate - startDate);
  }, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Reporte de Clases</Text>
          <Text>Salón: {salon}</Text>
          <Text>Fechas: {new Date(inicioDate).toLocaleDateString()} - {new Date(finDate).toLocaleDateString()}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            {["No.", "ID Clase", "ID Salón", "Fecha", "Hora Inicio", "Hora Fin", "Duración (hh:mm:ss)"].map((header, index) => (
              <View style={styles.tableCol} key={index}>
                <Text style={styles.tableCell}>{header}</Text>
              </View>
            ))}
          </View>
          {data.map((item, index) => {
            const startDate = new Date(item.fechaStart);
            const endDate = new Date(item.fechaEnd);
            const duration = endDate - startDate;

            return (
              <View style={styles.tableRow} key={item._id}>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{index + 1}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{item.idClase}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{item.idSalon}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{startDate.toLocaleDateString()}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{startDate.toLocaleTimeString()}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{endDate.toLocaleTimeString()}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{formatDuration(duration)}</Text></View>
              </View>
            );
          })}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Total</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{formatDuration(totalDuration)}</Text></View>
          </View>
        </View>

      </Page>
    </Document>
  );
};

const Reporte = () => {
  const navigate = useNavigate();
  const user = getUser();
  const token = getToken();
  const idUsuario = user?.id;
  const { handleLogout } = useContext(AuthContext);

  const [grupos, setGrupos] = useState([]);
  const [salon, setSalon] = useState('');
  const [inicioDate, setInicioDate] = useState("");
  const [finDate, setFinDate] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await reportePuerta(idUsuario, token, salon, inicioDate, finDate, handleLogout);
      setResponse(data);
      setError('');
    } catch (error) {
      setError(error.message);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

<<<<<<< HEAD
const reporte = () => {
  const navigate = useNavigate();
=======
>>>>>>> 106c6e8d13288b42ba134730033c52596ed3522c
  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-button">
        <IoArrowBack />
      </button>

<<<<<<< HEAD
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
=======
      <h2 className="title">Consulta de Reporte</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div >
          <label>Salón:</label>
          <select name="salon" className="filtro-select" onChange={(e) => setSalon(e.target.value)} required>
            <option value="">Selecciona un salón</option>
            {grupos.map((grupo) => (
              <option key={grupo.id} value={grupo.id}>
                {grupo.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Fecha de Inicio:</label>
          <input
            type="datetime-local"
            value={inicioDate}
            onChange={(e) => setInicioDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha de Fin:</label>
          <input
            type="datetime-local"
            value={finDate}
            onChange={(e) => setFinDate(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Generar Reporte"}
        </button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <PDFDownloadLink document={<MyDocument data={response.data} salon={salon} inicioDate={inicioDate} finDate={finDate} />} fileName={`reporte_clases_${salon}_${getCurrentDate()}.pdf`}>
          {({ blob, url, loading, error }) => (loading ? 'Cargando documento...' : 'Descargar ahora!')}
        </PDFDownloadLink>
      )}
>>>>>>> 106c6e8d13288b42ba134730033c52596ed3522c
    </div>
  );
};

export default Reporte;