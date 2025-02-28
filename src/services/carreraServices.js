export const getCarrera = async (id, token, handleLogout) => {
    try {
        const response = await fetch(
            "https://smar-edu-suite-backend.vercel.app/web/crudCarrera/carrera",
            {
                method: 'POST',
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
        throw new Error(`Error al obtener los carreras: ${error.message}`);
    }
}

export const addCarera = async (nombre, status, idUsuario, token, handleLogout) => {
    try {
        const response = await fetch(
            'https://smar-edu-suite-backend.vercel.app/web/crudCarrera/addCarrera',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, status, idUsuario, token })
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
        throw new Error(`Error al agregar la carrera: ${error.message}`);
    }
}

export const updateCarrera = async (idCarrera, nombre, status, idUsuario, token, handleLogout) => {
    try {
        const response = await fetch( 
            'https://smar-edu-suite-backend.vercel.app/web/crudCarrera/updateCarrera',
            {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idCarrera, nombre, status, idUsuario, token })
            }
        );

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
        throw new Error(`Error al actualizar la carrera: ${error.message}`);
    }
}
export const getCarreraById = async (id, token, idCarrera, handleLogout) => {
    try {
        const response = await fetch(
            'https://smar-edu-suite-backend.vercel.app/web/crudCarrera/carreraById',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, token, idCarrera })
            });

        const data = await response.json();
        if (response.status === 401) {
            handleLogout();
        }
        if (!response.ok) {
            throw new Error(data.message || `Error HTTP: ${response.status}`);
        }
        return data;
    } catch (error) {
        throw new Error(`Error al obtener la carerea: ${error.message}`);
    }
}

export const searchCarrera = async (nombre, idUsuario, token, handleLogout) => {
    try {
        const response = await fetch(
            'https://smar-edu-suite-backend.vercel.app/web/crudCarrera/findCarrera',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nombre, idUsuario, token })
            }
        );

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
        throw new Error(`Error al buscar la carrera: ${error.message}`);
    }
}