import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { login, loginGoogle } from '../../services/authService';
import { Card, CardContent, Input, Button } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import '../../styles/styles.css';

function LoginScreen() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLoginSuccess = (user, token) => {
    setUser(user, token);
    switch (user.tipo) {
      case 2:
        navigate('/maestro/dashboard');
        break;
      case 3:
        navigate('/admin/dashboard');
        break;
      default:
        setError('Tipo de usuario desconocido');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const correo = formData.get("correo");
    const contra = formData.get("contra");

    setError('');
    try {
      const result = await login(correo, contra);

      if (!result || !result.user || !result.token) {
        throw new Error('Respuesta de login inválida');
      }

      handleLoginSuccess(result.user, result.token);
    } catch (err) {
      if (err.message === 'Primer login') {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          navigate('/cambio-contrasena', { state: { user: storedUser } });
        } else {
          setError('Error al obtener datos de usuario');
        }
      } else {
        setError(err.message);
      }
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Obtener el perfil del usuario usando el access_token
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            'Authorization': `Bearer ${tokenResponse.access_token}`
          }
        });
  
        const userInfo = await userInfoResponse.json();
  
        // Extraer el correo electrónico y el ID de Google del perfil del usuario
        const correo = userInfo.email;
        const idGoogle = userInfo.sub; // ID único de Google
  
  
        // Llamar a tu API de login con Google
        const result = await loginGoogle(correo, idGoogle);
        handleLoginSuccess(result.user, result.token);
      } catch (error) {
        setError(error.message);
      }
    },
    onFailure: (error) => {
      setError('Error en el inicio de sesión con Google');
    }
  });

  return (
    <div className="flex items-center justify-center bg-[#22354a] min-h-screen">
      <Card className="card-custom">
        <CardContent className="text-center flex flex-col items-center">
          <h1 className="text-2xl text-[#c8d8e6] mb-1">SmartEdu Suite</h1>
          <h2 className="text-lg text-[#c8d8e6] mb-4">Inicia Sesión</h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <div className="mb-4 w-3/4">
              <Input type="email" placeholder="Correo" className="input-custom w-full" name="correo" />
            </div>
            <div className="mb-6 w-3/4">
              <Input type="password" placeholder="Contraseña" className="input-custom w-full" name="contra" />
            </div>
            <Button type="submit" className="w-3/4 py-2 bg-[#1E90FF] text-[#E4E5E6] font-semibold rounded">
              Iniciar Sesión
            </Button>
            {error && <div className="error-message">{error}</div>}
          </form>
          <div className="mt-4 text-gray-300 text-sm">o inicia sesión con</div>
          <Button onClick={googleLogin} className="mt-2 w-3/4 py-2 bg-[#FFFFFF] text-[#2D3E50] font-semibold rounded flex items-center justify-center shadow-md">
            <FaGoogle className="mr-2" />
            Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginScreen;