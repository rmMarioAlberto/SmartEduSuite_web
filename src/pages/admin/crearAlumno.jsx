import "../../styles/listaCreacion.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { addAlumno, updateAlumno, getAlumnoById, getGruposAlumnos } from "../../services/alumnoService";
import { getUser , getToken } from "../../services/authService";
import { AuthContext } from '../../context/AuthContext';

const CrearAlumno = () => {
    const navigate = useNavigate();
    const { idAlumno } = useParams(); // Obtener el ID del alumno de la URL

    const { handleLogout } = useContext(AuthContext);
    const [nombre, setNombre] = useState("");
    const [apellidoPa, setApellidoPa] = useState("");
    const [apellidoMa, setApellidoMa] = useState("");
    const [correo, setCorreo] = useState("");
    const [status, setStatus] = useState("1");
    const [grupoId, setGrupoId] = useState("1");
    const [grupos, setGrupos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const user = getUser ();
    const token = getToken();
    const idUsuario = user?.id;

    // Cargar los datos del alumno si el ID está presente
    useEffect(() => {
        if (idAlumno) {
            const fetchAlumno = async () => {
                try {
                    const data = await getAlumnoById(idAlumno, idUsuario, token, handleLogout);
                    setNombre(data.nombreusuario);
                    setApellidoPa(data.apellidopausuario);
                    setApellidoMa(data.apellidomausuario);
                    setCorreo(data.correousuario);
                    setStatus(data.usuariostatus.toString());
                    setGrupoId(data.idgrupo);
                } catch (error) {
                    setError(`Error al cargar los datos del alumno: ${error.message}`);
                }
            };

            fetchAlumno();
        }
    }, [idAlumno, idUsuario, token, handleLogout]);

    // Cargar los grupos disponibles
    useEffect(() => {
        const fetchGrupos = async () => {
            try {
                const data = await getGruposAlumnos(idUsuario, token, handleLogout);
                setGrupos(data);
            } catch (error) {
                setError(`Error al cargar los grupos: ${error.message}`);
            }
        };

        fetchGrupos();
    }, [idUsuario, token, handleLogout]);

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
            if (idAlumno) {
                // Si hay un ID, actualizar el alumno
                const message = await updateAlumno(
                    idAlumno, // ID del alumno a actualizar
                    nombre,
                    apellidoMa,
                    apellidoPa,
                    correo,
                    status,
                    grupoId,
                    idUsuario,
                    token,
                    handleLogout
                );
            } else {
                // Si no hay ID, crear un nuevo alumno
                const message = await addAlumno(
                    nombre,
                    apellidoMa,
                    apellidoPa,
                    correo,
                    status,
                    grupoId,
                    idUsuario,
                    token,
                    handleLogout
                );
            }

            // Si la operación es exitosa, redirigir a la lista de alumnos
            navigate("/admin/consulta-alumno");
        } catch (error) {
            setError(`${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-crear">
            {/* Header */}
            <header className="header-crear">
                {/* Botón de regreso */}
                <button onClick={() => navigate('/admin/crud-alumnos')} className="backButton-crear">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </button>
    
                {/* Título */}
                <h1 className="title-crear">Crear alumno</h1>
            </header>
    
            <div className="container-grid">
                {/* Formulario */}
                <form className="form" onSubmit={handleSubmit}>
                    {/* Columna 1 */}
                    <div className="column1">
                        <label className="label">
                            Ingrese el nombre del alumno:
                            <input
                                type="text"
                                className="input"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </label>
                        <label className="label">
                            Ingrese el apellido materno:
                            <input
                                type="text"
                                className="input"
                                placeholder="Apellido Materno"
                                value={apellidoMa}
                                onChange={(e) => setApellidoMa(e.target.value)}
                                required
                            />
                        </label>
                        <label className="label">
                            Seleccione el grupo:
                        </label>
                        <select
                            name="grupo"
                            id="grupo"
                            className="select"
                            value={grupoId}
                            onChange={(e) => setGrupoId(e.target.value)}
                            required
                        >
                            {grupos.map((grupo) => (
                                <option key={grupo.grupoId} value={grupo.grupoId}>
                                    {grupo.grupo_carrera}
                                </option>
                            ))}
                        </select>
                        <label className="label">
                            Seleccione el status:
                        </label>
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
                    </div>
    
                    {/* Columna 2 */}
                    <div className="column2">
                        <label className="label">
                            Ingrese el apellido paterno:
                            <input
                                type="text"
                                className="input"
                                placeholder="Apellido Paterno"
                                value={apellidoPa}
                                onChange={(e) => setApellidoPa(e.target.value)}
                                required
                            />
                        </label>
                        <label className="label">
                            Ingrese el correo electrónico:
                            <input
                                type="email"
                                className="input"
                                placeholder="Correo Electrónico"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </label>
                    </div>
    
                    {/* Botones de acción */}
                    <div className="buttonContainer">
                        <button type="button" className="cancelButton" onClick={() => navigate(-1)}>Cancelar</button>
                        <button type="submit" className="sendButton" disabled={loading}>
                            {loading ? "Enviando..." : "Enviar"}
                        </button>
                    </div>
                </form>
            </div>
    
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default CrearAlumno;
