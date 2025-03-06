import "../../styles/indexCRUD.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaClipboardList } from "react-icons/fa";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../../services/authService";

const crudEstadisticas = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="container">
            <button onClick={() => navigate('/admin/dashboard')} className="backButton">
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>
            <h1 className="title">Estadísticas</h1>
            <div className="buttonContainer">
                <div className="button" onClick={() => navigate("/admin/grafica")}>  
                    <FaClock className="icon" />
                    <p className="buttonText">Gráficas</p>
                </div>
                <div className="button" onClick={() => navigate("/admin/reporte")}>  
                    <FaClipboardList className="icon" />
                    <p className="buttonText">Reportes</p>
                </div>
            </div>
        </div>
    );
};

export default crudEstadisticas;
