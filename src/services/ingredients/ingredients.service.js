import { db } from '../../../firebase.js';
import {
    collection, query, where, getDocs, orderBy,
    doc,
    setDoc,
    getDoc,
    deleteDoc,
    updateDoc,
    limit,
    serverTimestamp
} from "firebase/firestore";

/**
 * Función para recuperar todas las ingredientes de la base de datos
 * @returns {Object[]} Array de ingredientes
 */
export const ingredientsRequest = async () => {
    try {
        const ingredientsCollection = collection(db, "ingredients");
        const q = query(ingredientsCollection, orderBy("id", "desc"));
        const querySnapshot = await getDocs(q);
        const ingredients = await querySnapshot.docs.map((doc) => {
            return {
                ...doc.data()
            }
        });
        return ingredients;
    } catch (error) {
        console.log(error);
        return error;
    }
};

//Create a method to get a single ingredient by id
export const getIngredientById = async (id) => {
    try {
        const ingredientRef = doc(db, "ingredients", id);
        const ingredient = await getDoc(ingredientRef);
        return { ...ingredient.data() };
    } catch (error) {
        console.log(error);
        return error;
    }
};

//Create a method that gives us an array of ingredients by id
export const getIngredientsById = async (ids) => {
    try {
        const ingredients = [];
        for (let i = 0; i < ids.length; i++) {
            const ingredient = await getIngredientById(ids[i]);
            ingredients.push(ingredient);
        }
        return ingredients;
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
export const createIngredient = async (data) => {
    try {
        const ingredientRef = doc(collection(db, "ingredients"));
        const id = ingredientRef.id;
        data.id = id;

        await setDoc(ingredientRef, data);

        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * Función crear un nuevo ingrediente
 * @param {Object} data Datos del ingrediente
 * @return {Bool} Retorna un verdadero si se agrego correctamente
 */
export const updateIngredient = async (data) => {
    try {
        const ingredientsCollection = collection(db, "ingredients");
        const ingredientRef = doc(ingredientsCollection, data.id);
        await updateDoc(ingredientRef, data);
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}


/**
 * Función eliminar un ingrediente
 * @param {string} id Id del ingrediente
 * @return {Bool} Retorna un verdadero si se actualizó correctamente
 */
export const deleteIngredient = async (id) => {
    try {
        const docRef = doc(db, "ingredients", id);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}