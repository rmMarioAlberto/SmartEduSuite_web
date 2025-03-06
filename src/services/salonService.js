export const getSalones = async (idUsuario, token, handleLogout) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudSalon/salones", {
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
};

export const getSalonById = async (idSalon, idUsuario, token, handleLogout) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudSalon/salonById", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idSalon, idUsuario, token })
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
        case 404:
            throw new Error('Salón no encontrado');
        case 500:
            throw new Error('Error en el servidor');
        default:
            throw new Error(data.message || 'Error desconocido');
    }
};

export const addSalon = async (nombre, edificio, status, idUsuario, token, handleLogout) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudSalon/addSalon", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, edificio, status, idUsuario, token })
    });

    const data = await response.json();

    switch (response.status) {
        case 200:
            return data.message;
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
};

export const updateSalon = async (idSalon, nombre, edificio, status, idUsuario, token, handleLogout) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudSalon/updateSalon", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idSalon, nombre, edificio, status, idUsuario, token })
    });

    const data = await response.json();

    switch (response.status) {
        case 200:
            return data.message;
        case 400:
            throw new Error(data.message || 'Solicitud incorrecta');
        case 401:
            handleLogout();
            throw new Error('Token inválido o expirado');
        case 404:
            throw new Error('Salón no encontrado');
        case 500:
            throw new Error('Error en el servidor');
        default:
            throw new Error(data.message || 'Error desconocido');
    }
};

export const searchSalon = async (nombre, idUsuario, token, handleLogout) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudSalon/searchSalon", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, idUsuario, token })
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
        case 404:
            throw new Error('No se encontraron salones');
        case 500:
            throw new Error('Error en el servidor');
        default:
            throw new Error(data.message || 'Error desconocido');
    }
};