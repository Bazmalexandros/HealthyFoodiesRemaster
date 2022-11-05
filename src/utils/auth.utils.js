/**
 * Función para validar el correo
 * @param {string} email Correo a validar
 * @returns {boolean} Resultado de la validación
 */
export const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
}

/**
 * Función para validar la contraseña
 * @param {string} password Contraseña a validar
 * @returns {boolean} Resultado de la validación
 */
export const isValidPassword = (password) => {
    return password.length >= 6;
}