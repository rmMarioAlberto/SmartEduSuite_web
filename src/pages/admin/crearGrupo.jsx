import "../../styles/listaCreacion.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getGrupoById, updateGrupo, addGrupo } from "../../services/grupoService";
import { getCarrera } from "../../services/carreraServices";
import { getUser, getToken } from "../../services/authService";
import { AuthContext } from '../../context/AuthContext';

const CrearGrupo = () => {
    const navigate = useNavigate();
    const { idGrupo } = useParams(); // Obtener el ID del grupo de la URL

    const { handleLogout } = useContext(AuthContext);
    const [nombre, setNombre] = useState("");
    const [status, setStatus] = useState("1");
    const [carrera, setCarrera] = useState("");
    const [carreras, setCarreras] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const user = getUser();
    const token = getToken();
    const idUsuario = user?.id;

    // Cargar los datos del grupo y las carreras si el ID está presente
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                if (idGrupo) {
                    const dataGrupo = await getGrupoById(idGrupo, idUsuario, token, handleLogout);
                    setNombre(dataGrupo.grupoNombre);
                    setStatus(dataGrupo.status.toString());
                    setCarrera(dataGrupo.idCarrera);
                }

                const dataCarrera = await getCarrera(idUsuario, token, handleLogout);
                setCarreras(dataCarrera);
            } catch (error) {
                setError(`Error al cargar los datos: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [idGrupo, idUsuario, token, handleLogout]);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!idUsuario || !token) {
            setError("ID de usuario o token no encontrado. Inicia sesión nuevamente.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (idGrupo) {
                await updateGrupo(idGrupo, nombre, status, carrera, idUsuario, token, handleLogout);
            } else {
                await addGrupo(nombre, carrera, status, idUsuario, token, handleLogout);
            }

            navigate("/admin/consulta-grupo");
        } catch (error) {
            setError(`Error al crear o actualizar el grupo: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-crear">
            {/* Botón de regreso */}
            <button className="backButton-crear" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <h1 className="title">Crear grupo</h1>

            <form className="form" onSubmit={handleSubmit}>
                <label className="label">
                    Ingrese el nombre del grupo:
                    <input
                        type="text"
                        className="input"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </label>

                <label className="label">Seleccione la carrera:</label>
                <select
                    name="carrera"
                    id="carrera"
                    className="select"
                    value={carrera}
                    onChange={(e) => setCarrera(e.target.value)}
                    required
                >
                    {carreras.map((carrera) => (
                        <option key={carrera.id} value={carrera.id}>
                            {carrera.nombre}
                        </option>
                    ))}
                </select>

                <label className="label">Seleccione el status:</label>
                <select
                    name="status"
                    id="status"
                    className="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>

                <div className="buttonContainer">
                    <button type="button" className="cancelButton" onClick={() => navigate(-1)}>Cancelar</button>
                    <button type="submit" className="sendButton" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar"}
                    </button>
                </div>
            </form>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default CrearGrupo;