import "../../styles/listaCreacion.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const crearAlumno = () => {
    const navigate = useNavigate();

    return (
        <div className="container">

            {/* Header. */}
            <header className="header">
            {/* Botón de regreso. */}
            <button onClick={() => navigate(-1)} className="backButton">
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>

            {/* Título. */}
            <h1 className="title">Crear alumno</h1>
            </header>

            <div className="container-grid">
            {/* Formulario. */}
                {/* Columna 1. */}
                <div className="column1">
                <form className="form">
                    <label className="label">
                        Ingrese el nombre del alumno:
                        <input type="text" className="input" />
                    </label>
                    <label className="label">
                        Ingrese el apellido materno:
                        <input type="text" className="input" />
                    </label>
                    <label className="label">
                        Seleccione el grupo:
                    </label>
                    <select name="grupo" id="grupo" className="select">
                        <option value="grupo1">Grupo1.</option> 
                        <option value="grupo2">Grupo2.</option>
                        <option value="grupo3">Grupo3.</option>
                        <option value="grupo4">Grupo4.</option>
                    </select>
                    <label className="label">
                        Seleccione el status:
                    </label>
                    <select name="status" id="status" className="select">
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>   
                    </select>
                </form>
                </div>

                {/* Columna 2. */}
                <div className="column2">
                <form className="form">
                    <label className="label">
                        Ingrese el apellido paterno:
                        <input type="text" className="input" />
                    </label>
                    <label className="label">
                        Ingrese el correo electrónico:
                        <input type="text" className="input" />
                    </label>
                    <label className="label">
                        Seleccione la carrera:
                    </label>
                    <select name="carrera" id="carrera" className="select">
                        <option value="carrera1">Carrera1.</option>
                        <option value="carrera2">Carrera2.</option>
                        <option value="carrera3">Carrera3.</option>
                        <option value="carrera4">Carrera4.</option>    
                    </select>
                </form>
                </div>

                {/* Footer. */}
                <footer className="footer">
                    <div className="buttonContainer">
                        <button type="button" className="cancelButton">Cancelar</button>
                        <button type="submit" className="sendButton">Enviar</button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default crearAlumno;


