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

  return (
    <div className="clase-container">
      {/* Botón de retroceso */}
      <button onClick={() => navigate(-1)} className="back-button">
        <IoArrowBack />
      </button>

      {/* Título */}
      <h2 className="title">Consulta de Reporte</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="left-section">
          <div className="form-group">
            <label>Salón:</label>
            <select
              name="salon"
              className="filtro-select"
              onChange={(e) => setSalon(e.target.value)}
              required
            >
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
              type="date"
              value={inicioDate}
              onChange={(e) => setInicioDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="right-section">
          <div className="form-group">
            <label>Fecha de Fin:</label>
            <input
              type="date"
              value={finDate}
              onChange={(e) => setFinDate(e.target.value)}
              required
            />
          </div>

          {/* Botón de envío */}
          <div className="button-group">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Cargando..." : "Generar Reporte"}
            </button>
          </div>
        </div>
      </form>

      {/* Mensajes de error */}
      {error && <p className="error">{error}</p>}

      {/* Botón de descarga */}
      {response && (
        <PDFDownloadLink
          document={
            <MyDocument
              data={response.data}
              salon={salon}
              inicioDate={inicioDate}
              finDate={finDate}
            />
          }
          fileName={`reporte_clases_${salon}_${getCurrentDate()}.pdf`}
        >
          {({ loading }) =>
            loading ? "Cargando documento..." : "Descargar ahora!"
          }
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default Reporte;