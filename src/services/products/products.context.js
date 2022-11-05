import React, { useState, createContext, useEffect } from "react";
import { productsRequest, productsRequestKeyword, createProduct, updateProduct, deleteProduct } from "./products.service";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [keyword, setKeyword] = useState("");

    /**
     * Recuperar los datos de la base de datos con un timer
     */
    const retrieveProducts = async () => {
        setIsLoading(true);
        setProducts([]);
        setTimeout(async () => {
            try {
                const productsResponse = await productsRequest();
                setIsLoading(false);
                setProducts(productsResponse);
            } catch (error) {
                setIsLoading(false);
                setError(error);
            }
        }, 1000);
    };

    /**
     * Recuperar los datos de la base de datos con un timer basado en la palabra clave
     * @param {string} searchKeyword Palabra clave a buscar
     */
    const onSearch = async (searchKeyword) => {
        setKeyword(searchKeyword);
        setIsLoading(true);
        setProducts([]);
        setTimeout(async () => {
            try {
                const productsResponse = await productsRequestKeyword(searchKeyword);
                setIsLoading(false);
                setProducts(productsResponse);
            } catch (error) {
                setIsLoading(false);
                setError(error);
            }
        }, 1000);
    };

    /**
     * Función para crear un nuevo producto
     * @param {Object} product Datos del producto
     */
    const onCreateProduct = async (product) => {
        setIsLoading(true);
        const result = await createProduct(product);
        setIsLoading(false);
        retrieveProducts();
        return result;
    }

    /**
     * Función para actualizar un producto
     * @param {Object} product Datos del producto
    */
    const onUpdateProduct = async (product) => {
        setIsLoading(true);
        const result = await updateProduct(product);
        setIsLoading(false);
        retrieveProducts();
        return result;
    }

    /**
     * Función para eliminar un producto
     * @param {Object} product Datos del producto
    */
    const onDeleteProduct = async (product) => {
        setIsLoading(true);
        const result = await deleteProduct(product);
        setIsLoading(false);
        retrieveProducts();
        return result;
    }

    useEffect(() => {
        if (keyword) {
            onSearch(keyword);
        } else {
            retrieveProducts();
        }
    }, [keyword]);

    return (
        <ProductsContext.Provider
            value={{
                products,
                isLoading,
                error,
                keyword,
                onSearch,
                retrieveProducts,
                onCreateProduct,
                onUpdateProduct,
                onDeleteProduct
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};