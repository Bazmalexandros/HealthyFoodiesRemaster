import { auth, db } from '../../../firebase.js';
import {
    collection, query, where, getDocs, orderBy,
    doc,
    setDoc,
    getDoc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

import {
    createUserWithEmailAndPassword,
    updateProfile,
    updateEmail,
    updatePassword,
    signInWithEmailAndPassword,
    deleteUser,
    signOut
} from "firebase/auth";
import { getUserInfo } from '../authentication/authentication.service.js';

/**
 * Función para recuperar todas las ingredientes de la base de datos
 * @returns {Object[]} Array de ingredientes
 */
export const assistantsRequest = async () => {
    try {
        const assistantsCollection = collection(db, "users");
        const q = query(assistantsCollection, where("typeUser", "==", "2"));
        const querySnapshot = await getDocs(q);
        const assistants = await querySnapshot.docs.map((doc) => {
            return {
                ...doc.data()
            }
        });
        return assistants;
    } catch (error) {
        console.log(error);
        return error;
    }
};

/**
 * Función crear un nuevo ingrediente
 * @param {Object} data Datos del ingrediente
 * @return {Bool} Retorna un verdadero si se agrego correctamente
 */
export const createAssistant = async (data, password, userId) => {
    try {
        const assistantAuth = await createUserWithEmailAndPassword(auth, data.email, password);
        await updateProfile(assistantAuth.user, {
            displayName: data.name,
            phoneNumber: data.phone,
            photoURL: null,
        });
        const documentRef = doc(db, "users", assistantAuth.user.uid);
        data.typeUser = "2";
        data.active = "1";
        data.id = assistantAuth.user.uid;

        await setDoc(documentRef, data);
        await signOut(auth);

        const user = await getUserInfo(userId);

         await signInWithEmailAndPassword(auth, user.email, user.password);
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * Función crear un nuevo paciente
 * @param {Object} data Datos del paciente
 * @return {Bool} Retorna un verdadero si se agrego correctamente
 */
export const updateAssistant = async (data, password, lastEmail, lastPassword, userId) => {
    try {
        const assistantAuth = await signInWithEmailAndPassword(auth, lastEmail, lastPassword);
        await updateEmail(assistantAuth.user, data.email);
        await updatePassword(assistantAuth.user, password);
        await updateProfile(assistantAuth.user, {
            displayName: data.name,
            phoneNumber: data.phone,
            photoURL: null,
        });
        const assistantsCollection = collection(db, "users");
        const assistantRef = doc(assistantsCollection, data.id);
        await updateDoc(assistantRef, data);
        await signOut(auth);
        
        const user = await getUserInfo(userId);
        await signInWithEmailAndPassword(auth, user.email, user.password);
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}


/**
 * Función eliminar un paciente
 * @param {string} id Id del paciente
 * @return {Bool} Retorna un verdadero si se actualizó correctamente
 */
export const deleteAssistant = async (id, email, password, userId) => {
    try {
        const docRef = doc(db, "users", id);
        await deleteDoc(docRef);
        const assistantAuth = await signInWithEmailAndPassword(auth, email, password);
        await deleteUser(assistantAuth.user);
        await signOut(auth);
        const user = await getUserInfo(userId);
        await signInWithEmailAndPassword(auth, user.email, user.password);
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}