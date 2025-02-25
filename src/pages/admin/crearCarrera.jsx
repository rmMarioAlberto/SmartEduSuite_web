import "../../styles/listaCreacion.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const crearCarrera = () => {
    const navigate = useNavigate();

    return (
        <div className="container-crear">

            {/* Botón de regreso */}
            <button className="backButton-crear" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <h1 className="title">Crear carrera</h1>


            <form className="form">
                <label className="label">
                    Ingrese el nombre de la carrera:
                    <input type="text" className="input" />
                </label>
                
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

export default crearCarrera;
