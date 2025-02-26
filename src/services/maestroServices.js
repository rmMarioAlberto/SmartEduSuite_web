export const getMaestro = async (id, token) => {
    try {
        const response = await fetch(
            "http://localhost:3000/web/crudMaestro/maestros",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, token }),
            }
        );

        // Verificar el tipo de contenido primero
        const contentType = response.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            console.error("Respuesta no JSON:", text);
            throw new Error(`Respuesta no JSON: ${text.substring(0, 100)}...`);
        }

        const data = await response.json();

        // Imprimir la respuesta completa en la consola
        console.log("Respuesta de la API:", JSON.stringify(data, null, 2));

        if (!response.ok) {
            throw new Error(data.message || `Error HTTP: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error("Error en getMaestro:", error);
        throw new Error(`Error al obtener los maestros: ${error.message}`);
    }
};

export const getMaestroById = async (idMaestro, idUsuario, token) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaestro/maestroById', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ idMaestro, idUsuario, token })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error en la solicitud');
    }

    return data;
};

export const addMaestro = async (nombre, apellidoMa, apellidoPa, correo, status, huella, idUsuario, token) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaestro/addMaestro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre, apellidoMa, apellidoPa, correo, status, huella, idUsuario, token })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error en la solicitud');
    }

    return data.message;
};

export const updateMaestro = async (idMaestro, nombre, apellidoMa, apellidoPa, correo, status, huella, idUsuario, token) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaestro/updateMaestro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ idMaestro, nombre, apellidoMa, apellidoPa, correo, status, huella, idUsuario, token })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error en la solicitud');
    }

    return data.message;
};

export const searchMaestro = async (nombre, idUsuario, token) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/crudMaestro/findMaestro', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre, idUsuario, token })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error en la solicitud');
    }

    return data;
};
