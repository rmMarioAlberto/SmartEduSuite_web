import "../../styles/listaCreacion.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CrearSalon = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [edificio, setEdificio] = useState("");
    const [horario, setHorario] = useState("");
    const [status, setStatus] = useState("activo");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para manejar el envío del formulario
        console.log("Formulario enviado", { nombre, edificio, horario, status });
    };

    return (
        <div className="container-crear">

            {/* Header */}
            <header className="header-crear">
                {/* Botón de regreso */}
                <button onClick={() => navigate('/admin/crud-salones')} className="backButton-crear">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </button>

                {/* Título */}
                <h1 className="title-crear">Crear salón</h1>
            </header>

            <div className="container-grid">
                {/* Formulario */}
                {/* Columna 1 */}
                <div className="column1">
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
                            Seleccione el horario disponible:
                        </label>
                        <select
                            name="horario"
                            id="horario"
                            className="select"
                            value={horario}
                            onChange={(e) => setHorario(e.target.value)}
                            required
                        >
                            <option value="Horario1">Horario 1</option>
                            <option value="Horario2">Horario 2</option>
                            <option value="Horario3">Horario 3</option>
                            <option value="Horario4">Horario 4</option>
                        </select>
                    </form>
                </div>

                {/* Columna 2 */}
                <div className="column2">
                    <form className="form" onSubmit={handleSubmit}>
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
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </form>
                </div>

                {/* Footer */}
                <footer className="footer">
                    <div className="buttonContainer">
                        <button type="button" className="cancelButton" onClick={() => navigate(-1)}>Cancelar</button>
                        <button type="submit" className="sendButton" onClick={handleSubmit}>Enviar</button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default CrearSalon;
