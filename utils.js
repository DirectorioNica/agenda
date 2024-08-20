// utils.js

/**
 * Función para mostrar u ocultar un elemento por su ID.
 * @param {string} id - El ID del elemento.
 * @param {boolean} show - Si se debe mostrar (true) o ocultar (false) el elemento.
 */
function toggleVisibility(id, show) {
    const element = document.getElementById(id);
    if (show) {
        element.classList.remove('w3-hide');
    } else {
        element.classList.add('w3-hide');
    }
}

/**
 * Función para obtener un ítem del almacenamiento local.
 * @param {string} key - La clave del ítem.
 * @returns {Object} El ítem obtenido del almacenamiento local.
 */
function getLocalStorageItem(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
