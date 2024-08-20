// Inicializar el select de clases en el formulario de asistencia
function initializeClassSelect() {
    const classSelect = document.getElementById('class-select');
    const students = getLocalStorageItem('students');
    const classes = [...new Set(students.map(student => student.studentClass))];

    classSelect.innerHTML = '<option value="">Seleccionar Clase</option>';
    classes.forEach(className => {
        classSelect.innerHTML += `<option value="${className}">${className}</option>`;
    });
}

// Llamar a la función de inicialización cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeClassSelect();
});

// Función para mostrar el formulario para agregar una nueva fecha
function showAddDateForm() {
    toggleVisibility('date-form', true);
    toggleVisibility('attendance-form', false);
    toggleVisibility('add-student-form', false);
    toggleVisibility('attendance-report', false);
    toggleVisibility('student-search', false);
    toggleVisibility('class-management', false);
}

// Función para mostrar el formulario para agregar un nuevo estudiante
function showAddStudentForm() {
    toggleVisibility('date-form', false);
    toggleVisibility('attendance-form', false);
    toggleVisibility('add-student-form', true);
    toggleVisibility('attendance-report', false);
    toggleVisibility('student-search', false);
    toggleVisibility('class-management', false);
}

// Función para mostrar el formulario de búsqueda de estudiantes
function showStudentSearch() {
    toggleVisibility('date-form', false);
    toggleVisibility('attendance-form', false);
    toggleVisibility('add-student-form', false);
    toggleVisibility('attendance-report', false);
    toggleVisibility('student-search', true);
    toggleVisibility('class-management', false);
}

// Función para mostrar el formulario de gestión de clases
function showClassManagement() {
    toggleVisibility('date-form', false);
    toggleVisibility('attendance-form', false);
    toggleVisibility('add-student-form', false);
    toggleVisibility('attendance-report', false);
    toggleVisibility('student-search', false);
    toggleVisibility('class-management', true);

    // Lógica para mostrar la gestión de clases
    const classList = document.getElementById('class-list');
    classList.innerHTML = generateClassList();
}

// Función para mostrar el reporte de asistencia
function showAttendanceReport() {
    toggleVisibility('date-form', false);
    toggleVisibility('attendance-form', false);
    toggleVisibility('add-student-form', false);
    toggleVisibility('attendance-report', true);
    toggleVisibility('student-search', false);
    toggleVisibility('class-management', false);

    // Lógica para mostrar el reporte de asistencia
    const reportContent = document.getElementById('report-content');
    reportContent.innerHTML = generateAttendanceReport();
}

// Función para agregar un nuevo estudiante
function addStudent() {
    const name = document.getElementById('student-name-input').value.trim();
    const studentClass = document.getElementById('student-class-input').value.trim();

    if (name && studentClass) {
        addStudentToLocalStorage(name, studentClass);
        alert('Estudiante agregado exitosamente.');
        document.getElementById('student-name-input').value = '';
        document.getElementById('student-class-input').value = '';
        showAddStudentForm(); // Volver al formulario de agregar estudiante
        initializeClassSelect(); // Actualizar el select de clases
    } else {
        alert('Por favor, ingresa el nombre y la clase del estudiante.');
    }
}

// Función para buscar estudiantes por nombre
function searchStudent() {
    const name = document.getElementById('student-search-input').value.trim();
    const searchResults = document.getElementById('search-results');

    if (name) {
        searchResults.innerHTML = searchStudentByName(name);
    } else {
        alert('Por favor, ingresa el nombre del estudiante.');
    }
}

// Función para mostrar la lista de fechas en el reporte de asistencia
function generateAttendanceReport() {
    let dates = getLocalStorageItem('dates') || [];
    let reportHtml = '<ul>';
    dates.forEach(date => {
        reportHtml += `<li>${date}: ${getAttendanceForDate(date)}</li>`;
    });
    reportHtml += '</ul>';
    return reportHtml;
}

// Función para guardar la fecha en el localStorage
function saveDate() {
    const date = document.getElementById('date-input').value.trim();
    if (date) {
        let dates = getLocalStorageItem('dates') || [];
        if (!dates.includes(date)) {
            dates.push(date);
            localStorage.setItem('dates', JSON.stringify(dates));
        }
        prepareAttendanceForm();
    } else {
        alert('Por favor, ingresa una fecha.');
    }
}

// Exportar funciones globalmente
window.showAddDateForm = showAddDateForm;
window.showAddStudentForm = showAddStudentForm;
window.showStudentSearch = showStudentSearch;
window.showClassManagement = showClassManagement;
window.showAttendanceReport = showAttendanceReport;
window.addStudent = addStudent;
window.searchStudent = searchStudent;
window.saveDate = saveDate;
