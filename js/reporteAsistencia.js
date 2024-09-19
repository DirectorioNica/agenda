document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('viewAttendanceButton').addEventListener('click', viewAttendance);
});

// Ver la asistencia basada en los filtros seleccionados
function viewAttendance() {
    const selectedSchool = document.getElementById('schoolSelect').value;
    const selectedGrade = document.getElementById('gradeSelect').value;
    const selectedSection = document.getElementById('seccionSelect').value;
    const date = document.getElementById('dateInput').value;

    // Validar que se hayan seleccionado los filtros
    if (!selectedSchool || !selectedGrade || !selectedSection || !date) {
        alert('Por favor selecciona todos los filtros y una fecha.');
        return;
    }

    const attendanceDate = new Date(date);
    const month = attendanceDate.getMonth() + 1; // Los meses en JS van de 0 a 11
    const day = attendanceDate.getDate();
    const year = attendanceDate.getFullYear();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`; // Formato YYYY-MM-DD

    // Limpiar la tabla de resultados
    const attendanceTableBody = document.getElementById('attendanceTableBody');
    attendanceTableBody.innerHTML = '';

    // Consulta para obtener la asistencia de los estudiantes
    const Attendance = Parse.Object.extend('Attendance');
    const query = new Parse.Query(Attendance);

    // Filtros: escuela, grado, sección y fecha
    query.equalTo('school', selectedSchool);
    query.equalTo('grade', selectedGrade);
    query.equalTo('section', selectedSection);
    query.equalTo('date', formattedDate);

    query.find().then(results => {
        if (results.length > 0) {
            results.forEach(attendance => {
                const studentId = attendance.get('student'); // Obtenemos el studentId referenciado
                loadStudentName(studentId, attendance.get('isPresent'));  // Cargar el nombre del estudiante
            });
        } else {
            const row = attendanceTableBody.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 2;
            cell.innerText = 'No hay registros de asistencia para los filtros seleccionados.';
        }
    }).catch(error => {
        console.error('Error al obtener la asistencia:', error.message);
    });
}

// Cargar el nombre del estudiante desde su ID y agregarlo a la tabla
function loadStudentName(studentId, isPresent) {
    const Student = Parse.Object.extend('Students');
    const query = new Parse.Query(Student);

    query.get(studentId).then(student => {
        const row = document.getElementById('attendanceTableBody').insertRow();
        row.insertCell(0).innerText = student.get('name');
        row.insertCell(1).innerText = isPresent ? 'Sí' : 'No';
    }).catch(error => {
        console.error('Error al obtener el estudiante:', error.message);
    });
}
