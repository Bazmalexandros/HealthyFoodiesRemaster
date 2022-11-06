import { useState, createContext, useEffect } from "react";
import Toast from "react-native-toast-message";
import { auth } from '../../../firebase.js';
import {
    loginRequest, createUserRequest, logout, getUserInfo,
    updateUserData, sendPasswordReset
} from './authentication.service';
import { getFirebaseMessage } from "../../utils/firebase.utils";
export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /** 
     * Función para validar que el usuario se encuentre autenticado, al iniciar 
     * nuevamente la aplicación después de cerrar sesión verifica si cuenta con las 
     * crendenciales activas 
    */
    const validateUser = () => {
        auth.onAuthStateChanged((userAuth) => {
            if (userAuth) setUser(userAuth);
        });

    }

    useEffect(() => validateUser(), []);

    /** 
     * Función para realizar la petición del inicio de sesión del usuario y asignar el usuario al contexto
     * @param {string} email Correo del usuario
     * @param {string} password Contraseña del usuario
     */
    const onLogin = async (email, password) => {
        setIsLoading(true);
        const authResponse = await loginRequest(email, password);
        if (authResponse.name === 'FirebaseError') {
            const message = getFirebaseMessage(authResponse.code);
            Toast.show({
                type: "error",
                text1: "Algo salió mal",
                text2: message,
                topOffset: 100,
            });
            setIsLoading(false);
            setError(message);
        } else {
            setIsLoading(false);
            setUser(authResponse.user);
            setError(null);
        }   
    }

    /**
    * Función para realizar la petición para el registro de un nuevo usuario y asignarlo al contexto
    * @param {Object} user Objetos con los datos del usuario
    */
    const onRegister = async (user) => {
        setIsLoading(true);
        const authResponse = await createUserRequest(user);
        if (authResponse.name === 'FirebaseError') {
            const message = getFirebaseMessage(authResponse.code);
            Toast.show({
                type: "error",
                text1: "Algo salió mal",
                text2: message,
                topOffset: 100,
            });
            setError(message);
        }
        else {
            setUser(authResponse.user);
            setError(null);
        }
        setIsLoading(false);
    }

    /** 
     * Función para realizar la petición del cierre de sesión y definiar al usuario del contexto como nulo 
    */
    const onLogout = async () => {
        await logout();
        setUser(null);
    }

    /** 
     * Método para obtener la información extra del usuario
     * @param {string} id Id del usuario
    */
    const onGetUserInfo = async (id) => {
        setIsLoading(true);
        const data = await getUserInfo(id);
        if (data.name === 'FirebaseError') {
            const message = getFirebaseMessage(data.code);
            Toast.show({
                type: "error",
                text1: "Algo salió mal",
                text2: message,
                topOffset: 100,
            });
            setError(message);
            return {
                "name": "",
                "email": "",
                "phoneNumber": "",
                "controlNumber": "",
                "error": true
            }
        }
        else {
            setError(null);
        }
        setIsLoading(false);
        return data;
    }

    /**
     * Método para actualizar la información del usuario
     * @param {Object} data Objeto con los datos del usuario
     * @return {Bool} Retorna verdadero si la respuesta es exitosa
     */
    const onUpdateUserInfo = async (data) => {
        setIsLoading(true);
        const response = await updateUserData(data);
        const result = true;
        if (response.name === 'FirebaseError') {
            const message = getFirebaseMessage(response.code);
            Toast.show({
                type: "error",
                text1: "Algo salió mal",
                text2: message,
                topOffset: 100,
            });
            setError(message);
            result = false;
        }
        setIsLoading(false);
        Toast.show({
            type: "success",
            text1: "Proceso completado",
            text2: "Usuario actualizado correctamente",
            topOffset: 100,
        });
        return result;
    }

    /**
     * Método para realizar el olvidar contraseña
     * @param {string} email Correo del usuario
     * @return {Bool} Retorna verdadero si se envió correctamente
     */
    const onForgotPassword = async (email) => {
        setIsLoading(true);
        const response = await sendPasswordReset(email);
        let result = true;
        if (typeof response !== "boolean") {
            const message = getFirebaseMessage(response.code);
            Toast.show({
                type: "error",
                text1: "Algo salió mal",
                text2: message,
                topOffset: 100,
            });
            setError(message);
            result = false;
        }
        else {
            setError(null);
            Toast.show({
                type: "success",
                text1: "Correo Enviado",
                text2: "El correo se envió correctamente.\nRevisa tu bandeja de entrada o spam",
                topOffset: 100,
            });
        }

        setIsLoading(false);
        return result;
    }

    return (
        <AuthenticationContext.Provider value={{
            isAuthenticated: !!user,
            user,
            isLoading,
            error,
            onLogin,
            onRegister,
            onLogout,
            onGetUserInfo,
            onUpdateUserInfo,
            onForgotPassword
        }}>
            {children}
        </AuthenticationContext.Provider>
    );
};