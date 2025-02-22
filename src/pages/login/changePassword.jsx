import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { changePassword } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';

function ChangePassword() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Obtenemos el usuario desde localStorage o la navegación
    const user = location.state?.user || JSON.parse(localStorage.getItem('user'));

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
            const message = await changePassword(password, user.id);
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
        <div>
            <h2>Cambiar Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Cambiar Contraseña</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}

export default ChangePassword;