export const tempGrafica = async (idUsuario, token, start, end, idSalon, handleLogout) => {
    const response = await fetch(
        'https://smar-edu-suite-backend.vercel.app/web/graficas/tempGrafica',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idUsuario, token, start, end, idSalon })
        }
    )

    const data = await response.json();

    switch (response.status) {
        case 200:
            return data;
        case 400:
            throw new Error(data.message || 'Solicitud incorrecta');
        case 401:
            handleLogout();
            throw new Error('Token inválido o expirado');
        case 500:
            throw new Error('Error en el servidor');
        default:
            throw new Error(data.message || 'Error desconocido');
    }
}

export const luzGrafica = async (idUsuario, token, start, end, idSalon, handleLogout) => {
    const response = await fetch(
        'https://smar-edu-suite-backend.vercel.app/web/graficas/tempGrafica',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idUsuario, token, start, end, idSalon })
        }
    )

    const data = await response.json();

    switch (response.status) {
        case 200:
            return data;
        case 400:
            throw new Error(data.message || 'Solicitud incorrecta');
        case 401:
            handleLogout();
            throw new Error('Token inválido o expirado');
        case 500:
            throw new Error('Error en el servidor');
        default:
            throw new Error(data.message || 'Error desconocido');
    }
}