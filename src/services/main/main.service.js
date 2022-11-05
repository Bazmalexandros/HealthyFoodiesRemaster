import { db } from '../../../firebase.js';
import {
    collection, query, getDocs, where, orderBy,
} from "firebase/firestore";

/**
 * Función para recuperar todos los banners de la base de datos
 * @returns {Object[]} Array de banners
 */
export const bannersRequest = async () => {
    try {
        const bannersCollection = collection(db, "main/home/banners");
        const q = query(bannersCollection, where("active", "==", true), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const banners = querySnapshot.docs.map((doc) => {
            return {
                ...doc.data()
            }
        });
        return banners;
    } catch (error) {
        return error;
    }
};