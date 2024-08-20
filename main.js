document.addEventListener('DOMContentLoaded', () => {
    // Función para mostrar u ocultar formularios
    function toggleVisibility(id, show) {
        const element = document.getElementById(id);
        if (show) {
            element.classList.remove('w3-hide');
        } else {
            element.classList.add('w3-hide');
        }
    }

    window.showAddDateForm = function() {
        toggleVisibility('date-form', true);
        toggleVisibility('attendance-form', false);
        toggleVisibility('add-student-form', false);
        toggleVisibility('attendance-report', false);
        toggleVisibility('student-search', false);
        toggleVisibility('class-management', false);
    };

    window.showAddStudentForm = function() {
        toggleVisibility('date-form', false);
        toggleVisibility('attendance-form', false);
        toggleVisibility('add-student-form', true);
        toggleVisibility('attendance-report', false);
        toggleVisibility('student-search', false);
        toggleVisibility('class-management', false);
    };

    window.showAttendanceReport = function() {
        toggleVisibility('date-form', false);
        toggleVisibility('attendance-form', false);
        toggleVisibility('add-student-form', false);
        toggleVisibility('attendance-report', true);
        toggleVisibility('student-search', false);
        toggleVisibility('class-management', false);

        // Lógica para mostrar el reporte de asistencia
        const reportContent = document.getElementById('report-content');
        reportContent.innerHTML = generateAttendanceReport();
    };

    window.showStudentSearch = function() {
        toggleVisibility('date-form', false);
        toggleVisibility('attendance-form', false);
        toggleVisibility('add-student-form', false);
        toggleVisibility('attendance-report', false);
        toggleVisibility('student-search', true);
        toggleVisibility('class-management', false);
    };

    window.showClassManagement = function() {
        toggleVisibility('date-form', false);
        toggleVisibility('attendance-form', false);
        toggleVisibility('add-student-form', false);
        toggleVisibility('attendance-report', false);
        toggleVisibility('student-search', false);
        toggleVisibility('class-management', true);

        // Lógica para mostrar la gestión de clases
        const classList = document.getElementById('class-list');
        classList.innerHTML = generateClassList();
    };

    window.prepareAttendanceForm = function() {
        const date = document.getElementById('date-input').value;
        if (date) {
            updateClassSelect();
            showAttendanceForm(date);
        }
    };

    window.saveAttendance = function() {
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
    };

    window.addStudent = function() {
        const name = document.getElementById('student-name-input').value;
        const studentClass = document.getElementById('student-class-input').value;

        if (name && studentClass) {
            addStudentToLocalStorage(name, studentClass);
            alert('Estudiante agregado exitosamente.');
            document.getElementById('student-name-input').value = '';
            document.getElementById('student-class-input').value = '';
        } else {
            alert('Por favor, complete todos los campos.');
        }
    };

    function showAttendanceForm(date) {
        toggleVisibility('date-form', false);
        toggleVisibility('attendance-form', true);
        toggleVisibility('add-student-form', false);
        toggleVisibility('attendance-report', false);
        toggleVisibility('student-search', false);
        toggleVisibility('class-management', false);

        const classSelect = document.getElementById('class-select');
        const attendanceList = document.getElementById('attendance-list');
        const selectedClass = classSelect.value;

        const students = JSON.parse(localStorage.getItem('students')) || [];
        let listHtml = '<ul>';

        students
            .filter(student => student.studentClass === selectedClass)
            .forEach(student => {
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

    function updateClassSelect() {
        const classSelect = document.getElementById('class-select');
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const classes = new Set(students.map(student => student.studentClass));
        
        classSelect.innerHTML = '<option value="">Seleccionar Clase</option>';
        classes.forEach(className => {
            classSelect.innerHTML += `<option value="${className}">${className}</option>`;
        });
    }

    function saveAttendanceToLocalStorage(date, attendance) {
        let allAttendance = JSON.parse(localStorage.getItem('attendance')) || {};
        allAttendance[date] = attendance;
        localStorage.setItem('attendance', JSON.stringify(allAttendance));
    }

    function addStudentToLocalStorage(name, studentClass) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.push({ name, studentClass });
        localStorage.setItem('students', JSON.stringify(students));
    }

    function generateAttendanceReport() {
        let dates = JSON.parse(localStorage.getItem('dates')) || [];
        let reportHtml = '<ul>';
        dates.forEach(date => {
            reportHtml += `<li>${date}: ${getAttendanceForDate(date)}</li>`;
        });
        reportHtml += '</ul>';
        return reportHtml;
    }

    function generateClassList() {
        let students = JSON.parse(localStorage.getItem('students')) || [];
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

    function getAttendanceForDate(date) {
        let attendance = JSON.parse(localStorage.getItem('attendance')) || {};
        return attendance[date] ? Object.values(attendance[date]).filter(status => status === 'present').length : 'No data';
    }

    function searchStudentByName(name) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        let resultHtml = '<ul>';
        students.forEach(student => {
            if (student.name.includes(name)) {
                resultHtml += `<li>${student.name} - Clase: ${student.studentClass}</li>`;
            }
        });
        resultHtml += '</ul>';
        return resultHtml;
    }
});
