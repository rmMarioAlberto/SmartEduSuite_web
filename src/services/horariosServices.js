export const getHorarioDia = async (idUsuario, token, handleLogout) => {
    try {
        const response = await fetch(
            "https://smar-edu-suite-backend.vercel.app/web/horarioMaestro/getHorarioDia", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idUsuario, token })
        });

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
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error;
    }
}

export const getClasesActivas = async (idUsuario, token, handleLogout) => {
    const response = await fetch(
        "https://smar-edu-suite-backend.vercel.app/web/horarioMaestro/getClasesActivas", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idUsuario, token })
    });

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