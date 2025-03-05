import "../../styles/listaCreacion.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CrearGrupo = () => {
    const navigate = useNavigate();

    return (
        <div className="container-crear">

            {/* Botón de regreso */}
            <button className="backButton-crear" onClick={() => navigate('/admin/crud-grupos')}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <h1 className="title">Crear grupo</h1>


            <form className="form">
                <label className="label">
                    Ingrese el nombre del grupo:
                    <input type="text" className="input" />
                </label>
                <label className="label">Seleccione el grupo:</label>
                <select name="grupo" id="grupo" className="select">
                    <option value="carrera1">Grupo1.</option>
                    <option value="carrera2">Grupo2.</option>
                    <option value="carrera3">Grupo3.</option>
                    <option value="carrera4">Grupo4.</option>
                </select>
                <label className="label">Seleccione el status:</label>
                <select name="status" id="status" className="select">
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                </select>
                <div className="buttonContainer">
                <button type="button" className="cancelButton" onClick={() => navigate(-1)}>Cancelar</button>
                <button type="submit" className="sendButton">Enviar</button>
                </div>
            </form>
        </div>
    );
};

export default CrearGrupo;
