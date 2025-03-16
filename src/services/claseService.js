// Función para obtener materias activas
export const getMateriasActivas = async (idUsuario, token, handleLogout) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudClase/getMateriasActivas", {
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

// Función para obtener grupos activos
export const getGruposActivos = async (idUsuario, token, handleLogout) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudClase/getGruposActivos", {
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

// Función para obtener maestros activos
export const getMaestrosActivos = async (idUsuario, token, handleLogout) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudClase/getMaestrosActivos", {
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

// Función para obtener salones activos
export const getSalonesActivos = async (idUsuario, token, handleLogout) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudClase/getSalonesActivos", {
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

export const getClases = async (idUsuario, token, handleLogout) => {
    const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudClase/getClases", {
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

export const searchClase = async (busqueda, idUsuario, token, handleLogout) => {
    try {
        const response = await fetch(
            "https://smar-edu-suite-backend.vercel.app/web/crudClase/searchClase", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idUsuario, token, busqueda })
        }
        );

        if (!response.ok) {
            const errorData = await response.json();
            switch (response.status) {
                case 400:
                    throw new Error(errorData.message || 'Solicitud incorrecta');
                case 401:
                    handleLogout();
                    throw new Error('Token inválido o expirado');
                case 404:
                    throw new Error("Clase no encontrada");
                case 500:
                    throw new Error('Error en el servidor');
                default:
                    throw new Error(errorData.message || 'Error desconocido');
            }
        }

        // Si la respuesta es exitosa, procesar los datos
        const data = await response.json();
        return data;

    } catch (error) {
        // Manejo de errores en la solicitud
        throw new Error(`Error al buscar clases: ${error.message}`);
    }
};

export const addClase = async (status, inicio, final, dia, idMaestro, idGrupo, idMateria, idSalon, idCreate, token, handleLogout) => {
    try {
        const response = await fetch("https://smar-edu-suite-backend.vercel.app/web/crudClase/addClase", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status, inicio, final, dia, idMaestro, idGrupo, idMateria, idSalon, idCreate, token })
        });

        const data = await response.json();

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error(data.message || 'Solicitud incorrecta');
                case 401:
                    handleLogout();
                    throw new Error('Token inválido o expirado');
                case 500:
                    throw new Error(`Error en el servidor: ${data.message}`);
                default:
                    throw new Error(data.message || 'Error desconocido');
            }
        }

        return data;
    } catch (error) {
        throw error;
    }
};


export const getHoras = async (idUsuario, token, p_id_salon, p_dia, handleLogout) => {
    try {
        const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudClase/getHoras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idUsuario, token, p_id_salon, p_dia })
        });

        const data = await response.json();

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error(data.message || 'Solicitud incorrecta');
                case 401:
                    handleLogout();
                    throw new Error('Token inválido o expirado');
                case 404:
                    throw new Error("No se encontraron datos de disponibilidad");
                case 500:
                    throw new Error(`Error en el servidor: ${data.message}`);
                default:
                    throw new Error(data.message || 'Error desconocido');
            }
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateClase = async (idClase, status, inicio, final, dia, idMaestro, idGrupo, idMateria, idSalon, idCreate, token, handleLogout) => {
    try {
        const response = await fetch(
            'https://smar-edu-suite-backend.vercel.app/web/crudClase/updateClase',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idClase, status, inicio, final, dia, idMaestro, idGrupo, idMateria, idSalon, idCreate, token })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error(data.message || 'Solicitud incorrecta');
                case 401:
                    handleLogout();
                    throw new Error('Token inválido o expirado');
                case 404:
                    throw new Error('Clase no encontrada');
                case 500:
                    throw new Error(data.message || 'Error en el servidor');
                default:
                    throw new Error('Error desconocido');
            }
        }

        return data; // Devuelve los datos si la actualización fue exitosa
    } catch (error) {
        console.error('Error en updateClase:', error);
        throw error; // Re-lanza el error para que pueda ser manejado por el llamador
    }
}

export const getClasesById = async (idUsuario, token, idClase, handleLogout) => {
    try {
        const response = await fetch(
            'https://smar-edu-suite-backend.vercel.app/web/crudClase/getClasesById', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idUsuario, token, idClase })
        }
        );

        const data = await response.json();

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error(data.message || 'Solicitud incorrecta');
                case 401:
                    handleLogout();
                    throw new Error('Token inválido o expirado');
                case 404:
                    throw new Error('Clase no encontrada');
                case 500:
                    throw new Error(data.message || 'Error en el servidor');
                default:
                    throw new Error('Error desconocido');
            }
        }

        return data; // Devuelve los datos si la solicitud fue exitosa
    } catch (error) {
        console.error('Error en getClasesById:', error);
        throw error; // Re-lanza el error para que pueda ser manejado por el llamador
    }
}