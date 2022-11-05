/**
 * Función para retornar la excepción ocurrida en firebase traducida
 * @param {string} code Código de error de firebase
 * @returns {string} Mensaje de error
 */
export const getFirebaseMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/user-not-found':
            return 'El usuario no existe';
        case 'auth/user-disabled':
            return 'El usuario se encuentra deshabilitado';
        case 'auth/wrong-password':
            return 'Contraseña incorrecta';
        case 'auth/invalid-email':
            return 'Correo inválido, formato incorrecto';
        case 'auth/email-already-exists':
            return 'El correo ya se encuentra registrado';
        case 'auth/invalid-password':
            return 'La contraseña debe tener al menos 6 caracteres';
        case 'auth/invalid-credential':
            return 'Credenciales inválidas';
        case 'auth/internal-error':
            return 'Ocurrió un error en el servidor';
        case 'auth/uid-already-exists':
            return 'El uid ya se encuentra registrado';
        default:
            return 'Error en la comunicación con el servidor';
    }
}
