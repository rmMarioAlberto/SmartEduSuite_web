import "../../styles/listaCreacion.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const crearAlumno = () => {
    const navigate = useNavigate();

    return (
        <div className="container-crear">

            {/* Header. */}
            <header className="header-crear">
                {/* Botón de regreso. */}
                <button onClick={() => navigate(-1)} className="backButton-crear">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </button>

                {/* Título. */}
                <h1 className="title-crear">Crear salón</h1>
            </header>

            <form className="form">
                <label className="label">
                    Ingrese el nombre del salón:
                    <input type="text" className="input" />
                </label>
                <label className="label">Seleccione el edificio:</label>
                <select name="edificio" id="edificio" className="select">
                    <option value="edificio1">Edificio1.</option>
                    <option value="edificio2">Edificio2.</option>
                    <option value="edificio3">Edificio3.</option>
                    <option value="edificio4">Edificio4.</option>
                </select>
                <label className="label">Seleccione el status:</label>
                <select name="status" id="status" className="select">
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                </select>
                <div className="buttonContainer">
                    <button type="button" className="cancelButton">Cancelar</button>
                    <button type="submit" className="sendButton">Enviar</button>
                </div>
            </form>
        </div>
    );
};

export default crearAlumno;


