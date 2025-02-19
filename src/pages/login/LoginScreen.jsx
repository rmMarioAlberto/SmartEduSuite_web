import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { login } from '../../services/authService';
import { Card, CardContent, Input, Button } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/styles.css'; 

function LoginScreen() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);

  const handleLoginSuccess = (user, token) => {
    setUser(user);
    setToken(token);
    if (user.contra === '') {
      navigate('/cambio-contrasena', { state: { user } });
    } else {
      switch (user.tipo) {
        case 1:
          setError('El tipo de usuario no tiene acceso al sistema');
          break;
        case 2:
          navigate('/vista-maestro', { state: { user } });
          break;
        case 3:
          navigate('/vista-admin', { state: { user } });
          break;
        default:
          setError('Tipo de usuario desconocido');
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const formData = new FormData(event.target);
    const correo = formData.get("correo");
    const contra = formData.get("contra");

    setError('');
    try {
        const { user, token } = await login(correo, contra); 
        handleLoginSuccess(user, token); 
    } catch (err) {
        setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#22354a] min-h-screen color: #c8d8e6">
      <Card className="card-custom">
        <CardContent className="text-center flex flex-col items-center">
          <h1 className="text-2xl color: #c8d8e6 mb-1">SmartEdu Suite</h1>
          <h2 className="text-lg #c8d8e6 mb-4">Inicia Sesión</h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <div className="mb-4 w-3/4">
              <Input
                type="email"
                placeholder="Correo"
                className="input-custom w-full"
                name="correo"
              />
            </div>
            <div className="mb-6 w-3/4">
              <Input
                type="password"
                placeholder="Contraseña"
                className="input-custom w-full"
                name="contra"
              />
            </div>
            <Button
              type="submit"
              className="w-3/4 py-2 bg-[#1E90FF] text-[#E4E5E6] font-semibold rounded hover:bg-[#0077CC] focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:ring-opacity-50">
              Iniciar Sesión
            </Button>
            {error && <div className="error-message">{error}</div>}
          </form>
          <div className="mt-4 text-gray-300 text-sm">
            o inicia sesión con
          </div>
          <Button
            className="mt-2 w-3/4 py-2 bg-[#FFFFFF] text-[#2D3E50] font-semibold rounded flex items-center justify-center shadow-md hover:bg-[#F0F0F0] focus:outline-none focus:ring-2 focus:ring-[#2D3E50] focus:ring-opacity-50">
            <FaGoogle className="mr-2" />
            Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );  
}

export default LoginScreen;