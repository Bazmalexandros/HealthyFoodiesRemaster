import { db } from '../../../firebase.js';
import {
    collection, query, where, getDocs, orderBy,
    doc,
    setDoc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

import { getRecipesById } from '../recipes/recipes.service.js';

/**
 * Función para recuperar todas las recetas de la base de datos
 * @returns {Object[]} Array de recetas
 */
export const mealPlansRequest = async () => {
    try {
        const mealPlansCollection = collection(db, "mealPlans");
        const q = query(mealPlansCollection, orderBy("id", "desc"));
        const querySnapshot = await getDocs(q);
        const mealPlans = await querySnapshot.docs.map((doc) => {

            return {
                ...doc.data()
            }
        });

        return mealPlans;
    } catch (error) {
        return error;
    }
};

export const getMealPlanById = async (id) => {
    try {
        const mealsCollection = collection(db, "mealPlans");
        const q = query(mealsCollection, where("id", "==", id));
        const querySnapshot = await getDocs(q);
        const meal = await querySnapshot.docs.map((doc) => {

            return {
                ...doc.data()
            }
        })

        return meal[0];
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getMealDetails = async (mealPlan) => {
    const monday = await getRecipesById(mealPlan.monday);
    mealPlan.monday = monday;

    const tuesday = await getRecipesById(mealPlan.tuesday);
    mealPlan.tuesday = tuesday;

    const wednesday = await getRecipesById(mealPlan.wednesday);
    mealPlan.wednesday = wednesday;

    const thursday = await getRecipesById(mealPlan.thursday);
    mealPlan.thursday = thursday;

    const friday = await getRecipesById(mealPlan.friday);
    mealPlan.friday = friday;

    const saturday = await getRecipesById(mealPlan.saturday);
    mealPlan.saturday = saturday;

    const sunday = await getRecipesById(mealPlan.sunday);
    mealPlan.sunday = sunday;
    return mealPlan;
}

/**
 * Función crear una receta
 * @param {Object} data Datos de una receta
 * @return {Bool} Retorna un verdadero si se agrego correctamente
 */
export const createMealPlan = async (data) => {
    try {
        const mealPlanRef = doc(collection(db, "mealPlans"));
        const id = mealPlanRef.id;
        data.id = id;

        await setDoc(mealPlanRef, data);

        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * Función crear una receta
 * @param {Object} data Datos de una receta
 * @return {Bool} Retorna un verdadero si se agrego correctamente
 */
export const updateMealPlan = async (data) => {
    try {
        const mealPlansCollection = collection(db, "mealPlans");
        const mealPlanRef = doc(mealPlansCollection, data.id);
        await updateDoc(mealPlanRef, data);
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * Función eliminar la receta
 * @param {string} id Id de la receta
 * @return {Bool} Retorna un verdadero si se actualizó correctamente
 */
export const deleteMealPlan = async (id) => {
    try {
        const docRef = doc(db, "mealPlans", id);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}