import "../../styles/listaCreacion.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { addMaestro, updateMaestro, getMaestroById } from "../../services/maestroServices";
import { getUser, getToken } from "../../services/authService";
import { AuthContext } from '../../context/AuthContext';

const CrearMaestro = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtener el ID del maestro de la URL

    const { handleLogout } = useContext(AuthContext);
    const [nombre, setNombre] = useState("");
    const [apellidoPa, setApellidoPa] = useState("");
    const [apellidoMa, setApellidoMa] = useState("");
    const [correo, setCorreo] = useState("");
    const [huella, setHuella] = useState("");
    const [status, setStatus] = useState("1");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const user = getUser();
    const token = getToken();
    const idUsuario = user?.id;

    // Cargar los datos del maestro si el ID está presente
    useEffect(() => {
        if (id) {
            const fetchMaestro = async () => {
                try {
                    const data = await getMaestroById(id, idUsuario, token, handleLogout);
                    setNombre(data.nombre);
                    setApellidoPa(data.apellidoPa);
                    setApellidoMa(data.apellidoMa);
                    setCorreo(data.correo);
                    setHuella(data.huella);
                    setStatus(data.status.toString());
                } catch (error) {
                    setError(`Error al cargar los datos del maestro: ${error.message}`);
                }
            };

            fetchMaestro();
        }
    }, [id, idUsuario, token, handleLogout]);

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
            if (id) {
                // Si hay un ID, actualizar el maestro
                const message = await updateMaestro(
                    id, // ID del maestro a actualizar
                    nombre,
                    apellidoMa,
                    apellidoPa,
                    correo,
                    status,
                    huella,
                    idUsuario,
                    token,
                    handleLogout
                );
            } else {
                // Si no hay ID, crear un nuevo maestro
                const message = await addMaestro(
                    nombre,
                    apellidoMa,
                    apellidoPa,
                    correo,
                    status,
                    huella,
                    idUsuario,
                    token,
                    handleLogout
                );
            }

            // Si la operación es exitosa, redirigir a la lista de maestros
            navigate("/admin/consulta-maestro");
        } catch (error) {
            setError(`Error al crear o actualizar el maestro: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-crear">
            {/* Header */}
            <header className="header-crear">
                {/* Botón de regreso */}
                <button onClick={() => navigate(-1)} className="backButton-crear">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </button>

                {/* Título */}
                <h1 className="title-crear">Maestro/a</h1>
            </header>

            <div className="container-grid">
                {/* Formulario */}
                <form className="form" onSubmit={handleSubmit}>
                    {/* Columna 1 */}
                    <div className="column1">
                        <label className="label">
                            Ingrese el nombre del maestro/a:
                            <input
                                type="text"
                                className="input"
                                placeholder="Nombre."
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
                                placeholder="Apellido materno."
                                value={apellidoMa}
                                onChange={(e) => setApellidoMa(e.target.value)}
                                required
                            />
                        </label>
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
                                placeholder="Apellido paterno."
                                value={apellidoPa}
                                onChange={(e) => setApellidoPa(e.target.value)}
                                required
                            />
                        </label>
                        <label className="label">
                            Ingrese el correo:
                            <input
                                type="email"
                                className="input"
                                placeholder="Correo."
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </label>
                        <label className="label">
                            Ingrese la información de la huella digital:
                            <input
                                type="text"
                                className="input"
                                placeholder="Huella."
                                value={huella}
                                onChange={(e) => setHuella(e.target.value)}
                            />
                        </label>
                    </div>

                    {/* Footer */}
                    <footer className="footer">
                        <div className="buttonContainer">
                            <button type="button" onClick={() => navigate(-1)} className="cancelButton">Cancelar</button>
                            <button type="submit" className="sendButton" disabled={loading}>
                                {loading ? "Enviando..." : "Enviar"}
                            </button>
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default CrearMaestro;
