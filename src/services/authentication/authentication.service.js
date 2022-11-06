import { auth, db } from '../../../firebase.js';
import moment from "moment/moment";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    updateEmail,
    sendPasswordResetEmail
} from "firebase/auth";
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    serverTimestamp,
    collection
} from 'firebase/firestore';

/** 
 * Función para iniciar sesión con email y contraseña
 * @param {string} email Correo del usuario
 * @param {string} password Contraseña del usuario
 * @returns {UserCredential} Credenciales del usuario
*/
export const loginRequest = async (email, password) => {
    try {
        console.log(`email: ${email} password: ${password}`);
        const userAuth = await signInWithEmailAndPassword(auth, email, password);
        return userAuth;
    } catch (error) {
        console.log(error);
        return error;
    }
};

/** 
 * Función para registrar un nuevo usuario
 * @param {Object} user Objetos con los datos del usuario
 * @returns {UserCredential} Credenciales del usuario
*/
export const createUserRequest = async (user) => {
    const { name,
        email,
        password,
        phoneNumber,
        controlNumber } = user;
    try {
        const userAuth = await createUserWithEmailAndPassword(auth, email, password);
        const joinedAt = moment().format("DD-MM-YYYY");
        const documentRef = doc(db, "users", userAuth.user.uid);
        const data = {
            id: userAuth.user.uid,
            name,
            email,
            imgUrl: null,
            phoneNumber,
            controlNumber,
            joinedAt,
            createdAt: serverTimestamp(),
        }

        await setDoc(documentRef, data);

        await updateProfile(userAuth.user, {
            displayName: name,
            phoneNumber,
            photoURL: null,
        });

        return userAuth;
    } catch (error) {
        console.log(error);
        return error;
    }
};

/** Función para cerrar sesión del usuario */
export const logout = async () => {
    await signOut(auth);
};

//create a method that gets the user by id
export const getUserInfo = async (id) => {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        return userSnap.data();
    } else {
        console.log("No such document!");
    }
}

/**
 * Función para actualizar la información del usuario, esta información no es la de la colección.
 * Es la información de propiedades del usuario.
 * @param {string} name Nombre del usuario
 * @param {string} phone Teléfono del usuario
 * @return {Bool} Retorna verdadero si se actualizó correctamente
 */
const updateUserProfile = async (name, phone) => {
    const user = auth.currentUser;
    try {
        await updateProfile(user, {
            displayName: name,
            phoneNumber: phone,
        });
        return true;
    } catch (error) {
        return error;
    }

}

/**
 * Función para actualizar el correo electrónico del usuario
 * @param {string} email Correo del usuario a actualizar
 * @return {Bool} Retorna verdadero si se actualizó correctamente
 */
const updateUserEmail = async (email) => {
    const user = auth.currentUser;

    try {
        await updateEmail(user, email);
        return true;
    } catch (error) {
        return error;
    }
}

/** 
 * Método para actualizar la información del usuario de la colección
 * @param {Object} data Objecto del usuario con la información a actualizar
 * @return {Bool} Retorna verdadero si se actualizó correctamente
*/
export const updateUserData = async (data) => {
    const user = auth.currentUser;

    const { name, phoneNumber } = data;

    // Actualizamos la información del usuario de la autenticación y validamos si es correcta
    const userProfileResponse = await updateUserProfile(name, phoneNumber);

    if (typeof userProfileResponse !== "boolean") {
        return userProfileResponse;
    }

    //Verificamos que los correos son diferentes, en caso de serlo actualizamos el correo
    // if (email !== user.email) {
    //     const userEmailResponse = await updateUserEmail(email);
    //     console.log("tercer log",userEmailResponse);
    //     if (typeof userEmailResponse !== "boolean") {
    //         return userEmailResponse;
    //     }
    // }

    const docRef = doc(db, "users", user.uid);
    try {
        await updateDoc(docRef, data);
    } catch (error) {
        return error;
    }
    return true;
}

/**
 * Función para servicio de mandar para restablecer la contraseña
 * @param {string} email Correo del usuario
 * @return {Bool} Retorna verdadero si se envió correctamente
 */
export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return true;
    } catch (error) {
        return error;
    }
}

