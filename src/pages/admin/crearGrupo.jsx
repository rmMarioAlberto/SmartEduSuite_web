import "../../styles/listaCreacion.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const crearGrupo = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <button onClick={() => navigate(-1)} className="backButton">
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>
            <h1 className="title">Crear grupo</h1>
            <form className="form">
                <label className="label">
                    Ingrese el nombre del grupo:
                    <input type="text" className="input" />
                </label>
                <label className="select-label">
                    Seleccione la carrera:
                </label>
                <select name="carrera" id="carrera" className="select">
                    <option value="carrera1">Carrera1.</option>
                    <option value="carrera2">Carrera2.</option>
                    <option value="carrera3">Carrera3.</option>
                    <option value="carrera4">Carrera4.</option>    
                </select>
                <label className="select-label">
                    Seleccione el status:
                </label>
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

export default crearGrupo;


