import { db } from '../../../firebase.js';
import {
    collection, query, where, getDocs, orderBy,
    doc,
    setDoc,
    deleteDoc,
    updateDoc,
    limit,
    serverTimestamp
} from "firebase/firestore";

import { getIngredientById, getIngredientsById } from '../ingredients/ingredients.service.js';

/**
 * Función para recuperar todas las recetas de la base de datos
 * @returns {Object[]} Array de recetas
 */
export const recipesRequest = async (isQueryComplete=false) => {
    try {
        const recipesCollection = collection(db, "recipes");
        const q = query(recipesCollection, orderBy("id", "desc"));
        const querySnapshot = await getDocs(q);
        const recipes = await querySnapshot.docs.map((doc) => {

            return {
                ...doc.data()
            }
        });

        if (isQueryComplete) {
            for (let i = 0; i < recipes.length; i++) {
                const ingredients = await getIngredientsById(recipes[i].ingredients);
                recipes[i].ingredients = ingredients;
            }
        }

        return recipes;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getRecipeById = async (id) => {
    try {
        const recipesCollection = collection(db, "recipes");
        const q = query(recipesCollection, where("id", "==", id));
        const querySnapshot = await getDocs(q);
        const recipe = await querySnapshot.docs.map((doc) => {

            return {
                ...doc.data()
            }
        })

        const ingredients = await getIngredientsById(recipe[0].ingredients);
        recipe[0].ingredients = ingredients;
        return recipe[0];
    } catch (error) {
        console.log(error);
        return error;
    }
}


//Create a method that gives us an array of ingredients by id
export const getRecipesById = async (ids) => {
    try {
        const recipes = [];
        for (let i = 0; i < ids.length; i++) {
            const recipe = await getRecipeById(ids[i]);
            recipes.push(recipe);
        }
        return recipes;
    } catch (error) {
        console.log(error);
        return error;
    }
};


/**
 * Función crear una receta
 * @param {Object} data Datos de una receta
 * @return {Bool} Retorna un verdadero si se agrego correctamente
 */
export const createRecipe = async (data) => {
    try {
        const recipeRef = doc(collection(db, "recipes"));
        const id = recipeRef.id;
        data.id = id;

        await setDoc(recipeRef, data);

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
export const updateRecipe = async (data) => {
    try {
        const recipesCollection = collection(db, "recipes");
        const recipeRef = doc(recipesCollection, data.id);
        await updateDoc(recipeRef, data);
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
export const deleteRecipe = async (id) => {
    try {
        const docRef = doc(db, "recipes", id);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}