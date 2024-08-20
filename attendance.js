// Mostrar el formulario de asistencia para la fecha seleccionada
function prepareAttendanceForm() {
    const date = document.getElementById('date-input').value;
    if (date) {
        showAttendanceForm(date);
    }
}

// Mostrar el formulario de asistencia con estudiantes de la clase seleccionada
function showAttendanceForm(date) {
    toggleVisibility('date-form', false);
    toggleVisibility('attendance-form', true);
    toggleVisibility('add-student-form', false);
    toggleVisibility('attendance-report', false);
    toggleVisibility('student-search', false);
    toggleVisibility('class-management', false);

    const attendanceList = document.getElementById('attendance-list');
    const classSelect = document.getElementById('class-select');
    const selectedClass = classSelect.value;
    const students = getLocalStorageItem('students');
    let listHtml = '<ul>';

    students.filter(student => student.studentClass === selectedClass).forEach(student => {
        listHtml += `
            <li>
                <label>
                    <input type="checkbox" data-student-id="${student.name}">
                    ${student.name} - Clase: ${student.studentClass}
                </label>
            </li>
        `;
    });

    listHtml += '</ul>';
    attendanceList.innerHTML = listHtml;
}

// Guardar la asistencia en el localStorage
function saveAttendance() {
    const date = document.getElementById('date-input').value;
    const checkboxes = document.querySelectorAll('#attendance-list input[type=checkbox]');
    const selectedClass = document.getElementById('class-select').value;
    const attendance = {};

    checkboxes.forEach(checkbox => {
        const studentId = checkbox.dataset.studentId;
        const status = checkbox.checked ? 'present' : 'absent';
        attendance[studentId] = status;
    });

    saveAttendanceToLocalStorage(date, selectedClass, attendance);
    alert('Asistencia guardada exitosamente.');
    showAddDateForm();
}

// Obtener el elemento del localStorage
function getLocalStorageItem(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Guardar asistencia en el localStorage
function saveAttendanceToLocalStorage(date, studentClass, attendance) {
    let allAttendance = JSON.parse(localStorage.getItem('attendance')) || {};
    if (!allAttendance[date]) {
        allAttendance[date] = {};
    }
    allAttendance[date][studentClass] = attendance;
    setLocalStorageItem('attendance', allAttendance);
}

// Función para agregar estudiantes al localStorage
function addStudentToLocalStorage(name, studentClass) {
    let students = getLocalStorageItem('students');
    students.push({ name, studentClass });
    setLocalStorageItem('students', students);
}

// Exportar las funciones globalmente
window.prepareAttendanceForm = prepareAttendanceForm;
window.saveAttendance = saveAttendance;
window.getLocalStorageItem = getLocalStorageItem;
