import "../../styles/listaCreacion.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { addSalon, getSalonById, updateSalon } from '../../services/salonService'; // Asegúrate de que la ruta sea correcta
import { getUser, getToken } from "../../services/authService";
import { AuthContext } from '../../context/AuthContext';

const CrearSalon = () => {
    const navigate = useNavigate();
    const { idSalon } = useParams(); // Obtener el ID del salón de la URL
    const { handleLogout } = useContext(AuthContext);
    const [nombre, setNombre] = useState("");
    const [edificio, setEdificio] = useState("");
    const [status, setStatus] = useState("1");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const user = getUser();
    const token = getToken();
    const idUsuario = user?.id;

    // Cargar los datos del salón si el ID está presente
    useEffect(() => {
        if (idSalon) {
            const fetchSalon = async () => {
                try {
                    const data = await getSalonById(idSalon, idUsuario, token, handleLogout);
                    setNombre(data[0].nombre); // Asumiendo que la respuesta es un array
                    setEdificio(data[0].edificio);
                    setStatus(data[0].status); // Asegúrate de que el campo status exista
                } catch (error) {
                    setError(`Error al cargar los datos del salón: ${error.message}`);
                }
            };
            fetchSalon();
        }
    }, [idSalon, idUsuario, token, handleLogout]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        if (!idUsuario || !token) {
            setError("ID de usuario o token no encontrado. Inicia sesión nuevamente.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (idSalon) { // Verificar si hay un ID de salón
                // Si hay un ID, actualizar el salón
                await updateSalon(
                    idSalon,
                    nombre,
                    edificio,
                    status,
                    idUsuario,
                    token,
                    handleLogout
                );
            } else {
                // Si no hay ID, crear un nuevo salón
                await addSalon(
                    nombre,
                    edificio,
                    status,
                    idUsuario,
                    token,
                    handleLogout
                );
            }

            // Si la operación es exitosa, redirigir a la lista de salones
            navigate("/admin/consulta-salon");
        } catch (error) {
            setError(`Error al crear o actualizar el salón: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-crear">
            {/* Botón de regreso */}
            <button onClick={() => navigate('/admin/crud-salones')} className="backButton-crear">
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>

            <h1 className="title">Crear salón</h1>

            <form className="form" onSubmit={handleSubmit}>
                <label className="label">
                    Ingrese el nombre del salón:
                    <input
                        type="text"
                        className="input"
                        placeholder="Nombre del salón"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </label>
                <label className="label">
                    Ingrese el edificio:
                    <input
                        type="text"
                        className="input"
                        placeholder="Edificio"
                        value={edificio}
                        onChange={(e) => setEdificio(e.target.value)}
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
                    <option value="2">desactivado</option>
                </select>
                <div className="buttonContainer">
                    <button type="button" className="cancelButton" onClick={() => navigate(-1)}>Cancelar</button>
                    <button type="submit" className="sendButton">Enviar</button>
                </div>
                {loading && <p>Cargando...</p>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default CrearSalon;