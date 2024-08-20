// Función para mostrar u ocultar elementos
function toggleVisibility(elementId, show) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = show ? 'block' : 'none';
    }
}

// Función para obtener un item del localStorage
function getLocalStorageItem(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Función para guardar un item en el localStorage
function setLocalStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Función para eliminar un item del localStorage
function removeLocalStorageItem(key) {
    localStorage.removeItem(key);
}

// Exportar las funciones globalmente
window.toggleVisibility = toggleVisibility;
window.getLocalStorageItem = getLocalStorageItem;
window.setLocalStorageItem = setLocalStorageItem;
window.removeLocalStorageItem = removeLocalStorageItem;
