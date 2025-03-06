import "../../styles/listaCreacion.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CrearAlumno = () => {
    const navigate = useNavigate();

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
                {/* Columna 1 */}
                <div className="column1">
                    <form className="form">
                        <label className="label">
                            Ingrese el nombre del alumno:
                            <input type="text" className="input" placeholder="Nombre" required />
                        </label>
                        <label className="label">
                            Ingrese el apellido materno:
                            <input type="text" className="input" placeholder="Apellido Materno" required />
                        </label>
                        <label className="label">
                            Seleccione el grupo:
                        </label>
                        <select name="grupo" id="grupo" className="select" required>
                            <option value="grupo1">Grupo 1</option>
                            <option value="grupo2">Grupo 2</option>
                            <option value="grupo3">Grupo 3</option>
                            <option value="grupo4">Grupo 4</option>
                        </select>
                        <label className="label">
                            Seleccione el status:
                        </label>
                        <select name="status" id="status" className="select" required>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </form>
                </div>

                {/* Columna 2 */}
                <div className="column2">
                    <form className="form">
                        <label className="label">
                            Ingrese el apellido paterno:
                            <input type="text" className="input" placeholder="Apellido Paterno" required />
                        </label>
                        <label className="label">
                            Ingrese el correo electrónico:
                            <input type="email" className="input" placeholder="Correo Electrónico" required />
                        </label>
                        <label className="label">
                            Seleccione la carrera:
                        </label>
                        <select name="carrera" id="carrera" className="select" required>
                            <option value="carrera1">Carrera 1</option>
                            <option value="carrera2">Carrera 2</option>
                            <option value="carrera3">Carrera 3</option>
                            <option value="carrera4">Carrera 4</option>
                        </select>
                    </form>
                </div>

                {/* Footer */}
                <footer className="footer">
                    <div className="buttonContainer">
                        <button type="button" className="cancelButton" onClick={() => navigate(-1)}>Cancelar</button>
                        <button type="submit" className="sendButton">Enviar</button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default CrearAlumno;
