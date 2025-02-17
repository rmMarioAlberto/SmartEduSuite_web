import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from '../../components/Form';
import { changePassword } from '../../services/authService.js';
import '../../styles/styles.css';

function ChangePassword() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = location.state || {};

    const handleSubmit = async (formData) => {
        setError('');
        if (formData.newPassword !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const message = await changePassword(formData.newPassword, user.id);
            navigate('/login', { state: { message } });
        } catch (err) {
            setError(err.message);
        }
    };

    const fields = [
        { name: 'newPassword', type: 'password', placeholder: 'Nueva Contraseña' },
        { name: 'confirmPassword', type: 'password', placeholder: 'Confirmar Contraseña' },
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-900">
            <div className="card">
                <div className="card-content">
                    <h1 className="title">Cambiar Contraseña</h1>
                    <Form fields={fields} onSubmit={handleSubmit} buttonText="Cambiar Contraseña" error={error} />
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;