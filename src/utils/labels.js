/**
 * Función para tranformar un arreglo en un arreglo para dropdown
 * @param {Object[]} array Arreglo a transformar
 * @param {string} label Nombre de la propiedad que se usará como etiqueta
 * @param {string} value Nombre de la propiedad que se usará como valor
 * @returns {Object[]} Arreglo transformado
 */
export const labelsTransform = (array, key, value) => {
    const newArray = array.map((item) => { 
        return {
            key: item[key],
            value: item[value]
        }
    });
    return newArray;
}