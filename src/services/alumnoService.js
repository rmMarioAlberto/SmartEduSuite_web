export const getAlumnos = async (idUsuario, token, handleLogout) => {
    try {
        const response = await fetch(
            "https://smar-edu-suite-backend.vercel.app/web/crudAlumno/alumnos",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idUsuario, token }),
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
            case 404:
                throw new Error(data.message || 'No se encontraron alumnos');
            case 500:
                throw new Error(data.message || 'Error en el servidor');
            default:
                throw new Error(data.message || `Error HTTP: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error al obtener los alumnos: ${error.message}`);
    }
};

export const getAlumnoById = async (idAlumno, idUsuario, token, handleLogout) => {
    try {
        const response = await fetch(
            "https://smar-edu-suite-backend.vercel.app/web/crudAlumno/alumnosById",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idAlumno, idUsuario, token }),
            }
        );
        const data = await response.json();

        switch (response.status) {
            case 200:
                return data;
            case 400:
                throw new Error(data.message || 'ID de alumno es requerido');
            case 401:
                handleLogout();
                throw new Error(data.message || 'Token inválido o expirado');
            case 404:
                throw new Error(data.message || 'Alumno no encontrado');
            case 500:
                throw new Error(data.message || 'Error en el servidor');
            default:
                throw new Error(data.message || `Error HTTP: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error al obtener el alumno: ${error.message}`);
    }
};

export const searchAlumno = async (busqueda, idUsuario, token, handleLogout) => {
    try {
        const response = await fetch(
            "https://smar-edu-suite-backend.vercel.app/web/crudAlumno/searchAlumno",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ busqueda, idUsuario, token }),
            }
        );
        const data = await response.json();

        switch (response.status) {
            case 200:
                return data;
            case 400:
                throw new Error(data.message || 'Término de búsqueda es requerido');
            case 401:
                handleLogout();
                throw new Error(data.message || 'Token inválido o expirado');
            case 404:
                throw new Error(data.message || 'No se encontraron alumnos con ese nombre');
            case 500:
                throw new Error(data.message || 'Error en el servidor');
            default:
                throw new Error(data.message || `Error HTTP: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error al buscar alumnos: ${error.message}`);
    }
};

export const addAlumno = async (nombre, apellidoMa, apellidoPa, correo, status, idGrupo, idCreate, tokenCreate, handleLogout) => {
    try {
        const response = await fetch(
            "https://smar-edu-suite-backend.vercel.app/web/crudAlumno/addAlumno",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre, apellidoMa, apellidoPa, correo, status, idGrupo, idCreate, tokenCreate }),
            }
        );
        const data = await response.json();

        switch (response.status) {
            case 201:
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
        throw new Error(`Error al agregar el alumno: ${error.message}`);
    }
};

export const updateAlumno = async (idUsuario, nombre, apellidoMa, apellidoPa, correo, status, idGrupo, idCreate, tokenCreate, handleLogout) => {
    try {
        const response = await fetch(
            "https://smar-edu-suite-backend.vercel.app/web/crudAlumno/updateAlumno",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idUsuario, nombre, apellidoMa, apellidoPa, correo, status, idGrupo, idCreate, tokenCreate }),
            }
        );
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
                throw new Error(data.message || 'Alumno no encontrado');
            case 500:
                throw new Error(data.message || 'Error en el servidor');
            default:
                throw new Error(data.message || `Error HTTP: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error al actualizar el alumno: ${error.message}`);
    }
};

export const getGruposAlumnos = async (idUsuario, token, handleLogout) => {
    try {
        const response = await fetch(
            "https://smar-edu-suite-backend.vercel.app/web/crudAlumno/getGruposAlumnos",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idUsuario, token }),
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
            case 404:
                throw new Error(data.message || 'Grupos no encontrados');
            case 500:
                throw new Error(data.message || 'Error en el servidor');
            default:
                throw new Error(data.message || `Error HTTP: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error al obtener los grupos y alumnos: ${error.message}`);
    }
};