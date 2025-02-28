export const getMaestro = async (id, token, handleLogout) => {
    try {
        const response = await fetch(
            "https://smar-edu-suite-backend.vercel.app/web/crudMaestro/maestros",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, token }),
            }
        );
        const data = await response.json();
        if (response.status === 401) {
            handleLogout();
            return;
        }
        if (!response.ok) {
            throw new Error(data.message || `Error HTTP: ${response.status}`);
        }
        return data;
    } catch (error) {
        throw new Error(`Error al obtener los maestros: ${error.message}`);
    }
};

export const addMaestro = async (nombre, apellidoMa, apellidoPa, correo, status, huella, idUsuario, token, handleLogout) => {
    try {
        const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaestro/addMaestro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellidoMa, apellidoPa, correo, status, huella, idUsuario, token })
        });

        const data = await response.json();

        if (response.status === 401) {
            handleLogout();
            throw new Error('Token inválido o expirado');
        }

        if (!response.ok) {
            throw new Error(data.message || 'Error en la solicitud');
        }

        return data.message;
    } catch (error) {
        throw new Error(`Error al agregar el maestro: ${error.message}`);
    }
};

export const updateMaestro = async (idMaestro, nombre, apellidoMa, apellidoPa, correo, status, huella, idUsuario, token, handleLogout) => {
    try {
        const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaestro/updateMaestro', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idMaestro, nombre, apellidoMa, apellidoPa, correo, status, huella, idUsuario, token })
        });

        const data = await response.json();

        if (response.status === 401) {
            handleLogout();
            throw new Error('Token inválido o expirado');
        }

        if (!response.ok) {
            throw new Error(data.message || 'Error en la solicitud');
        }

        return data.message;
    } catch (error) {
        throw new Error(`Error al actualizar el maestro: ${error.message}`);
    }
};

// maestroServices.js
export const getMaestroById = async (idMaestro, idUsuario, token, handleLogout) => {
    try {
        const response = await fetch(
            "https://smar-edu-suite-backend.vercel.app/web/crudMaestro/maestroById",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idMaestro, idUsuario, token }), 
            }
        );
        const data = await response.json();
        if (response.status === 401) {
            handleLogout(); 
        }
        if (!response.ok) {
            throw new Error(data.message || `Error HTTP: ${response.status}`);
        }
        return data; 
    } catch (error) {
        throw new Error(`Error al obtener el maestro: ${error.message}`);
    }
};

export const searchMaestro = async (nombre, idUsuario, token, handleLogout) => {
    try {
        const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaestro/findMaestro', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, idUsuario, token })
        });

        const data = await response.json();

        if (response.status === 401) {
            handleLogout();
            throw new Error('Token inválido o expirado');
        }

        if (!response.ok) {
            throw new Error(data.message || 'Error en la solicitud');
        }

        return data;
    } catch (error) {
        throw new Error(`Error al buscar maestros: ${error.message}`);
    }
};