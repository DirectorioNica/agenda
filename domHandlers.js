// Función para mostrar u ocultar formularios
function toggleVisibility(id, show) {
    const element = document.getElementById(id);
    if (show) {
        element.classList.remove('w3-hide');
    } else {
        element.classList.add('w3-hide');
    }
}

// Mostrar el formulario para agregar una fecha
function showAddDateForm() {
    toggleVisibility('date-form', true);
    toggleVisibility('attendance-form', false);
    toggleVisibility('add-student-form', false);
    toggleVisibility('attendance-report', false);
    toggleVisibility('student-search', false);
    toggleVisibility('class-management', false);
}

// Mostrar el formulario para agregar un estudiante
function showAddStudentForm() {
    toggleVisibility('date-form', false);
    toggleVisibility('attendance-form', false);
    toggleVisibility('add-student-form', true);
    toggleVisibility('attendance-report', false);
    toggleVisibility('student-search', false);
    toggleVisibility('class-management', false);
}

// Mostrar el reporte de asistencia
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

// Mostrar el formulario de búsqueda de estudiantes
function showStudentSearch() {
    toggleVisibility('date-form', false);
    toggleVisibility('attendance-form', false);
    toggleVisibility('add-student-form', false);
    toggleVisibility('attendance-report', false);
    toggleVisibility('student-search', true);
    toggleVisibility('class-management', false);
}

// Mostrar la gestión de clases
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

// Función para agregar una fecha al localStorage y preparar el formulario de asistencia
function prepareAttendanceForm() {
    const date = document.getElementById('date-input').value;
    if (date) {
        showAttendanceForm(date);
    }
}

// Función para agregar un estudiante al localStorage
function addStudent() {
    const name = document.getElementById('student-name-input').value;
    const studentClass = document.getElementById('student-class-input').value;
    if (name && studentClass) {
        addStudentToLocalStorage(name, studentClass);
        document.getElementById('student-name-input').value = '';
        document.getElementById('student-class-input').value = '';
        alert('Estudiante agregado exitosamente.');
    } else {
        alert('Por favor, ingrese el nombre y la clase del estudiante.');
    }
}

// Función para buscar un estudiante por nombre
function searchStudent() {
    const name = document.getElementById('student-search-input').value;
    if (name) {
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = searchStudentByName(name);
    } else {
        alert('Por favor, ingrese el nombre del estudiante.');
    }
}

// Función para generar la lista de clases con opción de eliminar estudiantes
function generateClassList() {
    let students = getLocalStorageItem('students') || [];
    let classList = {};
    
    // Agrupar estudiantes por clase
    students.forEach(student => {
        if (!classList[student.studentClass]) {
            classList[student.studentClass] = [];
        }
        classList[student.studentClass].push(student);
    });
    
    let classHtml = '<ul>';
    for (let className in classList) {
        classHtml += `<li><strong>${className}</strong><ul>`;
        classList[className].forEach(student => {
            classHtml += `
                <li>
                    ${student.name}
                    <button class="w3-button w3-red w3-small" onclick="deleteStudent('${student.id}')">Borrar</button>
                </li>`;
        });
        classHtml += '</ul></li>';
    }
    classHtml += '</ul>';
    return classHtml;
}

// Función para eliminar estudiante
window.deleteStudent = function(studentId) {
    let students = getLocalStorageItem('students') || [];
    students = students.filter(student => student.id !== studentId);
    setLocalStorageItem('students', students);

    // Actualizar la lista de clases
    document.getElementById('class-list').innerHTML = generateClassList();
};








// Función para eliminar estudiante
function deleteStudent(studentId) {
    let students = getLocalStorageItem('students') || [];
    students = students.filter(student => student.id !== studentId);
    setLocalStorageItem('students', students);

    // Actualizar la lista de clases
    document.getElementById('class-list').innerHTML = generateClassList();
}

// Exportar funciones globalmente
window.showAddDateForm = showAddDateForm;
window.showAddStudentForm = showAddStudentForm;
window.showAttendanceReport = showAttendanceReport;
window.showStudentSearch = showStudentSearch;
window.showClassManagement = showClassManagement;
window.prepareAttendanceForm = prepareAttendanceForm;
window.addStudent = addStudent;
window.searchStudent = searchStudent;
window.generateClassList = generateClassList;
window.deleteStudent = deleteStudent;
