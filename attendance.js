// attendance.js

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
    const attendance = {};

    checkboxes.forEach(checkbox => {
        const studentId = checkbox.dataset.studentId;
        const status = checkbox.checked ? 'present' : 'absent';
        attendance[studentId] = status;
    });

    saveAttendanceToLocalStorage(date, attendance);
    alert('Asistencia guardada exitosamente.');
    showAddDateForm();
}

// Obtener el elemento del localStorage
function getLocalStorageItem(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Guardar asistencia en el localStorage
function saveAttendanceToLocalStorage(date, attendance) {
    let allAttendance = JSON.parse(localStorage.getItem('attendance')) || {};
    allAttendance[date] = attendance;
    localStorage.setItem('attendance', JSON.stringify(allAttendance));
}

// Función para agregar estudiantes al localStorage
function addStudentToLocalStorage(name, studentClass) {
    let students = getLocalStorageItem('students');
    students.push({ name, studentClass });
    localStorage.setItem('students', JSON.stringify(students));
}

// Función para generar el reporte de asistencia
function generateAttendanceReport() {
    let dates = getLocalStorageItem('dates');
    let reportHtml = '<ul>';
    dates.forEach(date => {
        reportHtml += `<li>${date}: ${getAttendanceForDate(date)}</li>`;
    });
    reportHtml += '</ul>';
    return reportHtml;
}

// Función para generar la lista de clases y estudiantes
function generateClassList() {
    let students = getLocalStorageItem('students');
    let classList = {};
    students.forEach(student => {
        if (!classList[student.studentClass]) {
            classList[student.studentClass] = [];
        }
        classList[student.studentClass].push(student.name);
    });
    let classHtml = '<ul>';
    for (let className in classList) {
        classHtml += `<li><strong>${className}</strong><ul>`;
        classList[className].forEach(studentName => {
            classHtml += `<li>${studentName}</li>`;
        });
        classHtml += '</ul></li>';
    }
    classHtml += '</ul>';
    return classHtml;
}

// Obtener la asistencia para una fecha específica
function getAttendanceForDate(date) {
    let attendance = JSON.parse(localStorage.getItem('attendance')) || {};
    return attendance[date] ? Object.values(attendance[date]).filter(status => status === 'present').length : 'No data';
}

// Buscar estudiantes por nombre
function searchStudentByName(name) {
    let students = getLocalStorageItem('students');
    let resultHtml = '<ul>';
    students.forEach(student => {
        if (student.name.includes(name)) {
            resultHtml += `<li>${student.name} - Clase: ${student.studentClass}</li>`;
        }
    });
    resultHtml += '</ul>';
    return resultHtml;
}

// Exportar las funciones globalmente
window.prepareAttendanceForm = prepareAttendanceForm;
window.saveAttendance = saveAttendance;
window.getLocalStorageItem = getLocalStorageItem;
