export const login = async (correo, contra) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contra }),
    });

    const data = await response.json();

    if (response.status === 300 && (data.user.tipo === 2 || data.user.tipo === 3)) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        throw new Error('Primer login');
    }

    if (response.status === 301) {
        throw new Error('Usuario deshabilitado');
    }

    if (response.status === 401) {
        throw new Error('Contraseña incorrecta');
    }

    if (response.status === 404) {
        throw new Error('Usuario no encontrado');
    }

    if (!response.ok) {
        throw new Error(data.message);
    }

    if (data.user.tipo === 1) {
        throw new Error('El tipo de usuario no tiene acceso al sistema');
    }

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);

    return { user: data.user, token: data.token };
};

export const changePassword = async (newPassword, id, token) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword, id, token }),
    });

    const data = await response.json();

    if (response.status === 400) {
        throw new Error(data.message || 'El id o la nueva contraseña es requerida');
    }

    if (response.status === 401) {
        throw new Error('Token inválido o expirado');
    }

    if (response.status === 404) {
        throw new Error('Usuario no encontrado');
    }

    if (response.status === 500) {
        throw new Error('Error en el servidor');
    }

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.message;
};

export const loginGoogle = async (correo, idGoogle) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/loginGoogle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, idGoogle }),
    });

    const data = await response.json();

    if (response.status === 400) {
        throw new Error(data.message || 'El correo y el ID de Google son requeridos');
    }

    if (response.status === 401) {
        throw new Error('No tienes permisos para acceder al sistema');
    }

    if (response.status === 301) {
        throw new Error('Usuario deshabilitado');
    }

    if (response.status === 404) {
        throw new Error('Usuario no encontrado');
    }

    if (response.status === 500) {
        throw new Error('Error en el servidor');
    }

    if (!response.ok) {
        throw new Error(data.message || 'Error desconocido');
    }

    return {
        message: data.message,
        user: data.user,
        token: data.token
    };
};


export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const getToken = () => {
    return localStorage.getItem('token');
};
