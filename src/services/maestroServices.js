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

        switch (response.status) {
            case 200:
                return data;
            case 400:
                throw new Error(data.message || 'ID y token son requeridos');
            case 401:
                handleLogout();
                throw new Error(data.message || 'Token inválido o expirado');
            case 500:
                throw new Error(data.message || 'Error en el servidor');
            default:
                throw new Error(data.message || `Error HTTP: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error al obtener los maestros: ${error.message}`);
    }
};

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

        switch (response.status) {
            case 200:
                return data;
            case 400:
                throw new Error(data.message || 'Id de maestro es requerido');
            case 401:
                handleLogout();
                throw new Error(data.message || 'Token inválido o expirado');
            case 404:
                throw new Error(data.message || 'Maestro no encontrado');
            case 500:
                throw new Error(data.message || 'Error en el servidor');
            default:
                throw new Error(data.message || `Error HTTP: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error al obtener el maestro: ${error.message}`);
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

        switch (response.status) {
            case 200:
                return data.message;
            case 400:
                throw new Error(data.message || 'Todos los campos son requeridos');
            case 401:
                handleLogout();
                throw new Error(data.message || 'Token inválido o expirado');
            case 500:
                throw new Error(data.message || 'Error en el servidor');
            default:
                throw new Error(data.message || `Error HTTP: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error al agregar el maestro (Correo duplicado): ${error.message}`);
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

        switch (response.status) {
            case 200:
                return data.message;
            case 400:
                throw new Error(data.message || 'Todos los campos son requeridos');
            case 401:
                handleLogout();
                throw new Error(data.message || 'Token inválido o expirado');
            case 404:
                throw new Error(data.message || 'Maestro no encontrado');
            case 500:
                throw new Error(data.message || 'Error en el servidor');
            default:
                throw new Error(data.message || `Error HTTP: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error al actualizar el maestro: ${error.message}`);
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

        switch (response.status) {
            case 200:
                return data;
            case 400:
                throw new Error(data.message || 'Nombre de maestro es requerido');
            case 401:
                handleLogout();
                throw new Error(data.message || 'Token inválido o expirado');
            case 404:
                throw new Error(data.message || 'Maestro no encontrado');
            case 500:
                throw new Error(data.message || 'Error en el servidor');
            default:
                throw new Error(data.message || `Error HTTP: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error al buscar maestros: ${error.message}`);
    }
};