import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { changePassword } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import "../../styles/changePassword.css";

function ChangePassword() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Obtenemos el usuario desde localStorage o la navegación
    const user = location.state?.user || JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!password || !confirmPassword) {
            setError('Todos los campos son obligatorios');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const message = await changePassword(password, user.id, token);
            setSuccess(message);

            // Actualizar el usuario en el contexto
            setUser({ ...user, firstLogin: false });
            localStorage.setItem('user', JSON.stringify({ ...user, firstLogin: false }));

            setTimeout(() => {
                if (user.tipo === 2) {
                    navigate('/maestro/dashboard');
                } else if (user.tipo === 3) {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/login');
                }
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='container-change-password'>

            <header className='header-change-password'>
                <h2 className='title-change-password'>Cambiar Contraseña</h2>
            </header>

            <div className='form-change-password'>
                <p>Por favor, cambia tu contraseña para continuar</p>
                <form onSubmit={handleSubmit}>
                    <label className='label'>Ingresa tu nueva contraseña:
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <label className='label'>Confirma tu nueva contraseña:
                        <input
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>

                    <button type="submit">Cambiar Contraseña</button>
                </form>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
                
        </div>
    );
}

export default ChangePassword;