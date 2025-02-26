import "../../styles/carrera.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaClipboardList } from "react-icons/fa";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../../services/authService";

const crudMateria = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="container">
            <button onClick={() => navigate(-1)} className="backButton">
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>
            <h1 className="title">Materia</h1>
            <div className="buttonContainer">
                <div className="button" onClick={() => navigate("/admin/crear-materia")}>  
                    <FaClock className="icon" />
                    <p className="buttonText">Crear nueva materia</p>
                </div>
                <div className="button" onClick={() => navigate("/admin/consulta-materia")}>  
                    <FaClipboardList className="icon" />
                    <p className="buttonText">Consultar materia</p>
                </div>
            </div>
        </div>
    );
};

export default crudMateria;
