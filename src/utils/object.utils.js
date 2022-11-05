import TypeUser from "../helpers/typeUser";
/**
 * Función para determinar si alguna llave está vacía
 * @param {Object} obj Objeto a evaluar
 */
export const keysAreEmpty = (obj) => {
    let c = 0;
    for (let key in obj) {
        if (key !== 'uid' && key !== 'id' && key !== 'ingredients' && key !== 'lastPassword' && key !== 'mealPlanId') {
            if (!(key === 'typeUser' && obj[key] !== TypeUser.admin)) {
                if ((obj[key] === '' || obj[key] === null || obj[key] === undefined)) {
                    console.log(key);
                    c++;
                }
            }
        }
    }
    return c == 0;
}

/**
 * Función para eliminar campos vacíos de los valores de un objeto
 * @param {Object} obj Objeto a evaluar
 * @return {Object} Objeto transformado
 */
export const trimObject = (obj) => {
    const newObj = {};
    for (let key in obj) {
        if (typeof obj[key] !== 'object') {
            newObj[key] = obj[key].toString().trim();
        } else {
            newObj[key] = obj[key];
        }
    }

    return newObj;
}