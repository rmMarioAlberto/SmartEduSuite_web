export const getGrupos = async (id, token, handleLogout) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudGrupo/grupos", {
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

export const getGrupoById = async (idGrupo, idUsuario, token,handleLogout ) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudGrupo/grupoById", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idGrupo, idUsuario, token })
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
            throw new Error('Grupo no encontrado');
        case 500:
            throw new Error('Error en el servidor');
        default:
            throw new Error(data.message || 'Error desconocido');
    }
};

export const addGrupo = async (nombre, idCarrera, status, idUsuario, token,handleLogout) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudGrupo/addgrupo", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, idCarrera, status, idUsuario, token })
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

export const updateGrupo = async (idGrupo, nombre, status, idCarrera, idUsuario, token ,handleLogout) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudGrupo/updateGrupo", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idGrupo, nombre, status, idCarrera, idUsuario, token })
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
            throw new Error('Grupo no encontrado');
        case 500:
            throw new Error('Error en el servidor');
        default:
            throw new Error(data.message || 'Error desconocido');
    }
};

export const searchGrupo = async (nombre, idUsuario, token, handleLogout) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudGrupo/searchGrupo", {
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
            throw new Error('Grupo no encontrado');
        case 500:
            throw new Error('Error en el servidor');
        default:
            throw new Error(data.message || 'Error desconocido');
    }
};