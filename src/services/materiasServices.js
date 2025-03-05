export const getMateria = async (id, token, handleLogout) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaterias/materias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, token })
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

export const getMateriaById = async (idMateria, idUsuario, token, handleLogout) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaterias/materiaById', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idMateria, idUsuario, token })
    });

    const data = await response.json();

    switch (response.status) {
        case 200:
            return data; // Devuelve los datos si la respuesta es exitosa
        case 400:
            throw new Error(data.message || 'Solicitud incorrecta');
        case 401:
            handleLogout();
            throw new Error('Token inválido o expirado');
        case 404:
            throw new Error('Materia no encontrada');
        case 500:
            throw new Error('Error en el servidor');
        default:
            throw new Error(data.message || 'Error desconocido');
    }
};

export const addMateria = async (nombre, status, idUsuario, token, handleLogout) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaterias/addMateria', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, status, idUsuario, token })
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

export const updateMateria = async (nombre, status, idMateria, idUsuario, token, handleLogout) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaterias/updateMateria', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, status, idMateria, idUsuario, token })
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
            throw new Error('Materia no encontrada');
        case 500:
            throw new Error('Error en el servidor');
        default:
            throw new Error(data.message || 'Error desconocido');
    }
};

export const searchMateria = async (nombre, idUsuario, token, handleLogout) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaterias/searchMateria', {
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
            throw new Error('Materia no encontrada');
        case 500:
            throw new Error('Error en el servidor');
        default:
            throw new Error(data.message || 'Error desconocido');
    }
};