export const getMateria = async (id, token) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaterias/materias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, token })
    });

    const data = await response.json();

    if (response.status === 400) {
        throw new Error(data.message || 'Solicitud incorrecta');
    }

    if (response.status === 401) {
        handlehandleLogout();
        throw new Error('Token inválido o expirado');
    }

    if (response.status === 500) {
        throw new Error('Error en el servidor');
    }

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const getMateriaById = async (idMateria, idUsuario, token) => {
    const response = await fetch ('https://smar-edu-suite-backend.vercel.app/web/crudMaterias/materiaById', {
        method : 'get', 
        headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },

        body: JSON.stringify({idMateria, idUsuario, token})
    });

    const data = await response.json();

    if (response.status === 400){
        throw new Error(data.message || 'Solicitud incorrecta')
    }

    if (response.status === 401){
        handleLogout();
        throw new Error ('Token invalido o expirado')
    }

    if(response.status === 404){
        throw new Error("Materia no encontrada");
    }

    if(response.status === 500){
        throw new Error("Error en el servidor");
    }

    if (!response.ok){
        throw new Error(data.message);
    }

    return data;
}

export const addMateria = async (nombre, status, idUsuario, token) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaterias/addMateria', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre, status, idUsuario, token })
    });

    const data = await response.json();

    if (response.status === 400) {
        throw new Error(data.message || 'Solicitud incorrecta');
    }

    if (response.status === 401) {
        handleLogout();
        throw new Error('Token inválido o expirado');
    }

    if (response.status === 500) {
        throw new Error('Error en el servidor');
    }

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.message;
};

export const updateMateria = async (nombre, status, idMateria, idUsuario, token) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaterias/updateMateria', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre, status, idMateria, idUsuario, token })
    });

    const data = await response.json();

    if (response.status === 400) {
        throw new Error(data.message || 'Solicitud incorrecta');
    }

    if (response.status === 401) {
        handleLogout();
        throw new Error('Token inválido o expirado');
    }

    if (response.status === 404) {
        throw new Error('Materia no encontrada');
    }

    if (response.status === 500) {
        throw new Error('Error en el servidor');
    }

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.message;
};

export const searchMateria = async (nombre, idUsuario, token) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaterias/searchMateria', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre, idUsuario, token })
    });

    const data = await response.json();

    if (response.status === 400) {
        throw new Error(data.message || 'Solicitud incorrecta');
    }

    if (response.status === 401) {
        handleLogout();
        throw new Error('Token inválido o expirado');
    }

    if (response.status === 404) {
        throw new Error('Materia no encontrada');
    }

    if (response.status === 500) {
        throw new Error('Error en el servidor');
    }

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};