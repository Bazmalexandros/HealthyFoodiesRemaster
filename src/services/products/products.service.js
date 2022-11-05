import { db, storage } from '../../../firebase.js';
import { ref, updateMetadata, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import {
    collection, query, where, getDocs, orderBy,
    doc,
    setDoc,
    deleteDoc,
    updateDoc,
    limit,
    serverTimestamp
} from "firebase/firestore";
import moment from 'moment';
import { DB_CONSTANTS } from '../../constants/db.constants.js';

/**
 * Función para recuperar todos los productos de la base de datos
 * @returns {Object[]} Array de productos
 */
export const productsRequest = async () => {
    try {
        const productsCollection = collection(db, "main/products/product");
        const q = query(productsCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map((doc) => {
            return {
                ...doc.data()
            }
        });
        return products;
    } catch (error) {
        return error;
    }
};

/**
 * Función para recuperar todos los productos de la base de datos limitados
 * @param {Number} limit Número de productos a recuperar
 * @returns {Object[]} Array de productos
 */
export const productsLimitRequest = async (limitValue) => {
    try {
        const productsCollection = collection(db, "main/products/product");
        const q = query(productsCollection, orderBy("createdAt", "desc"), limit(limit));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map((doc) => {
            return {
                ...doc.data()
            }
        });
        return products;
    } catch (error) {
        return error;
    }
};



/**
 * Función para recuperar todos los productos de la base de datos basados en la palabra clave
 * @param {string} searchKeyword Palabra clave a buscar
 * @returns {Object[]} Array de productos
 */
export const productsRequestKeyword = async (searchKeyword) => {
    try {
        const productsCollection = collection(db, "main/products/product");
        const q = query(productsCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map((doc) => {
            const title = doc.data().productTitle.toLowerCase();
            if (title.includes(searchKeyword.toLowerCase())) {
                return {
                    ...doc.data()
                }
            }
        });
        return products;
    } catch (error) {
        return error;
    }
};

/**
 * Función para recuperar los productos registrados por el usuario
 * @param {string} userId UID del usuario
 * @returns {Object[]} Lista de productos
 */
export const getUserProducts = async (userId) => {
    try {
        const productsCollection = collection(db, "main/products/product");
        const q = query(productsCollection, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map((doc) => {
            return {
                ...doc.data()
            }
        });
        return products;

    } catch (error) {
        return error;
    }
};

/**
 * Función crear un nuevo producto
 * @param {Object} data Datos del producto
 * @return {Bool} Retorna un verdadero si se agrego correctamente
 */
export const createProduct = async (data) => {
    const { userId, productTitle, productImage, categoryId } = data;
    try {
        if (!(productImage === DB_CONSTANTS.LOGO_URL)) {
            const date = moment().format('DDMMYYYYh:mm:ss');
            const filename = `${userId}-${productTitle}-${date}`;
            const storageRef = ref(storage, `main/products/product/${categoryId}/${filename}`);
            //Convert image
            const img = await fetch(productImage);
            const bytes = await img.blob();
            await uploadBytesResumable(storageRef, bytes);
            await updateMetadata(storageRef, {
                contentType: 'image/jpeg'
            })
            data.imageRef = filename;
            const imageUrl = await getDownloadURL(storageRef);
            data.productImage = imageUrl
        } else {
            data.imageRef = productImage;
        }

        const productRef = doc(collection(db, "main/products/product"));
        const id = productRef.id;

        data.id = id;
        data.productId = id;

        data.createdAt = serverTimestamp();
        data.updatedAt = serverTimestamp();

        await setDoc(productRef, data);

        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * Función actualizar un producto
 * @param {Object} data Datos del producto
 * @return {Bool} Retorna un verdadero si se actualizó correctamente
 */
export const updateProduct = async (data) => {
    const { userId, productTitle, productImage, categoryId } = data;
    const imgUrlProduct = productImage.split(':')[0];

    try {
        if (!(imgUrlProduct === 'https')) {
            const date = moment().format('DDMMYYYYh:mm:ss');
            const filename = `${userId}-${productTitle}-${date}`;
            const storageRef = ref(storage, `main/products/product/${categoryId}/${filename}`);
            //Convert image
            const img = await fetch(productImage);
            const bytes = await img.blob();
            await uploadBytesResumable(storageRef, bytes);
            await updateMetadata(storageRef, {
                contentType: 'image/jpeg'
            })
            data.imageRef = filename;
            const imageUrl = await getDownloadURL(storageRef);
            data.productImage = imageUrl;
        } else {
            data.imageRef = productImage;
        }

        const docRef = doc(db, "main/products/product", data.id);
        data.updatedAt = serverTimestamp();
        try {
            await updateDoc(docRef, data);
        } catch (error) {
            console.log(error);
            return error;
        }
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}


/**
 * Función eliminar un producto
 * @param {Object} product Información del producto
 * @return {Bool} Retorna un verdadero si se actualizó correctamente
 */
export const deleteProduct = async (product) => {
    const { id, imageRef, categoryId } = product;
    try {
        const docRef = doc(db, "main/products/product", id);
        await deleteDoc(docRef);
        if (!(imageRef === DB_CONSTANTS.LOGO_URL)) {
            const storageRef = ref(storage, `main/products/product/${categoryId}/${imageRef}`);
            await deleteObject(storageRef);
        }
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}