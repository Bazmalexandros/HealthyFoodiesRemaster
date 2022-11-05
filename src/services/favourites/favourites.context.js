import React, { useState, createContext, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
    const { user } = useContext(AuthenticationContext);
    const [favourites, setFavourites] = useState([]);

    /**
     * Función para almacenar los favoritos en el dispositivo
     * @param {string} value Valor a almacenar
     * @param {string} uid UID del usuario
     */
    const saveFavourites = async (value, uid) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue)
        } catch (e) {
            console.log('error storing', e);
        }
    }

    /**
     * Función para cargar los favoritos del dispositivo
     * @param {string} uid UID del usuario
     */
    const loadFavourites = async (uid) => {
        try {
            const jsonValue = await AsyncStorage.getItem(`@favourites-${uid}`);
            if (jsonValue != null) {
                setFavourites(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.log('error loading', e);
        }
    }

    /** 
     * Función para agregar un favorito al arreglo 
     * @param {Object} product Objeto con la información del producto
    */
    const addToFavourites = (product) => setFavourites([...favourites, product])

    /**
     * Función para remover un favorito al arreglo 
     * @param {Object} product Objeto con la información del producto
    */
    const removeToFavourites = (product) => {
        const newFavourites = favourites.filter((x) => x.id !== product.id);
        setFavourites(newFavourites);
    };

    useEffect(() => {
        if (user && user.uid) {
            loadFavourites(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (user && user.uid && favourites.length) {
            saveFavourites(favourites, user.uid);
        }
    }, [favourites, user]);

    return (
        <FavouritesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeToFavourites
            }}
        >
            {children}
        </FavouritesContext.Provider>
    );
};