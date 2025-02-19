export const login = async (correo, contra) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contra }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    // Guardar la información del usuario en localStorage
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);

    return { user: data.user, token: data.token };
};

export const changePassword = async (newPassword, id) => {
    const response = await fetch('https://smar-edu-suite-backend.vercel.app/web/auth/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword, id }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.message;
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