import "../../styles/listaCreacion.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const crearSalon = () => {
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
                <h1 className="title">Crear salón</h1>
            </header>


            <form className="form">
                <label className="label">
                    Ingrese el nombre del salón:
                    <input type="text" className="input" />
                </label>
                <label className="label">
                    Ingrese el edificio:
                    <input type="text" className="input" />
                </label>
                <label className="label">
                    Horarios disponibles:
                    <input type="text" className="input" />
                </label>
                <div className="buttonContainer">
                    <button type="button" className="cancelButton">Cancelar</button>
                    <button type="submit" className="sendButton">Enviar</button>
                </div>
            </form>
        </div>
    );
};

export default crearSalon;


