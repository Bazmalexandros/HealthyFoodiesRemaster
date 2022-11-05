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
    deleteUser
} from "firebase/auth";

/**
 * Función para recuperar todas las ingredientes de la base de datos
 * @returns {Object[]} Array de ingredientes
 */
export const patientsRequest = async () => {
    try {
        const patientsCollection = collection(db, "users");
        const q = query(patientsCollection, where("typeUser", "==", "3"));
        const querySnapshot = await getDocs(q);
        const patients = await querySnapshot.docs.map((doc) => {
            return {
                ...doc.data()
            }
        });
        return patients;
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
export const createPatient = async (data, password) => {
    try {
        const patientAuth = await createUserWithEmailAndPassword(auth, data.email, password);
        await updateProfile(patientAuth.user, {
            displayName: data.name,
            phoneNumber: data.phone,
            photoURL: null,
        });
        const documentRef = doc(db, "users", patientAuth.user.uid);
        data.mealPlanId = null;
        data.typeUser = "3";
        data.active = "1";
        data.id = patientAuth.user.uid;

        await setDoc(documentRef, data);

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
export const updatePatient = async (data, password, lastEmail,lastPassword) => {
    try {
        const patientAuth = await signInWithEmailAndPassword(auth, lastEmail, lastPassword);
        await updateEmail(patientAuth.user, data.email);
        await updatePassword(patientAuth.user, password);
        await updateProfile(patientAuth.user, {
            displayName: data.name,
            phoneNumber: data.phone,
            photoURL: null,
        });
        const patientsCollection = collection(db, "users");
        const patientRef = doc(patientsCollection, data.id);
        await updateDoc(patientRef, data);
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//creat a method that updates only mealPlanId by userId
export const updateMealPlanId = async (userId, mealPlanId) => {
    try {
        const patientsCollection = collection(db, "users");
        const patientRef = doc(patientsCollection, userId);
        await updateDoc(patientRef, { mealPlanId });
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
export const deletePatient = async (id, email, password) => {
    try {
        const docRef = doc(db, "users", id);
        await deleteDoc(docRef);
        const patientAuth = await signInWithEmailAndPassword(auth, email, password);
        await deleteUser(patientAuth.user);
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}