document.addEventListener('DOMContentLoaded', function() {
    // Agregar listeners para los botones
    document.getElementById('filterButton').addEventListener('click', filterData);
    document.getElementById('saveAttendanceButton').addEventListener('click', saveAttendance);
});

// Filtrar y cargar estudiantes según los valores seleccionados
function filterData() {
    document.getElementById('loadingMessage').style.display = 'block';
    loadStudents().finally(() => {
        document.getElementById('loadingMessage').style.display = 'none';
    });
}

// Cargar estudiantes según los filtros seleccionados
function loadStudents() {
    return new Promise((resolve, reject) => {
        const selectedSchool = document.getElementById('schoolSelect').value;
        const selectedGrade = document.getElementById('gradeSelect').value;
        const selectedSection = document.getElementById('seccionSelect').value;

        const Student = Parse.Object.extend('Students');
        const query = new Parse.Query(Student);
        
        if (selectedSchool) query.equalTo('school', selectedSchool);
        if (selectedGrade) query.equalTo('grade', selectedGrade);
        if (selectedSection) query.equalTo('seccion', selectedSection);

        query.find().then(results => {
            const studentsTableBody = document.getElementById('studentsTableBody');
            if (!studentsTableBody) {
                console.error('El tbody con id "studentsTableBody" no se encontró en el DOM.');
                return;
            }
            studentsTableBody.innerHTML = ''; // Limpiar la tabla

            results.forEach(student => {
                const row = studentsTableBody.insertRow();
                row.insertCell(0).innerText = student.get('name');
                
                // Crear un checkbox para marcar presencia
                const checkboxCell = row.insertCell(1);
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.dataset.objectId = student.id; // Usar objectId en lugar de studentId
                checkboxCell.appendChild(checkbox);
            });
            resolve();
        }).catch(error => {
            console.error('Error al cargar los estudiantes:', error.message);
            reject(error);
        });
    });
}

// Guardar asistencia de los estudiantes
function saveAttendance() {
    const date = document.getElementById('dateInput').value;
    const studentsTableBody = document.getElementById('studentsTableBody');
    const rows = studentsTableBody.getElementsByTagName('tr');

    // Convertir la fecha a solo mes y día (MM-DD)
    const attendanceDate = new Date(date);
    const month = attendanceDate.getMonth() + 1;  // Los meses son de 0 a 11, por eso sumamos 1
    const day = attendanceDate.getDate();
    const formattedDate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`; // Formato MM-DD

    Array.from(rows).forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        const studentObjectId = checkbox.dataset.objectId;  // Obtener el objectId del dataset
        const isPresent = checkbox.checked;  // Obtener si el estudiante está presente o no

        // Crear una nueva instancia de la clase Attendance en Back4App
        const Attendance = Parse.Object.extend('Attendance');
        const attendance = new Attendance();
        attendance.set('date', formattedDate);  // Guardar solo el mes y día en formato MM-DD
        attendance.set('isPresent', isPresent);  // Guardar si el estudiante estuvo presente
        attendance.set('student', studentObjectId);  // Guardar el objectId del estudiante como String

        // Guardar la asistencia en la base de datos
        attendance.save()
            .then(() => {
                console.log('Asistencia guardada con éxito para el estudiante:', studentObjectId);
            })
            .catch(error => {
                console.error('Error al guardar la asistencia:', error.message);
            });
    });

    // Opcionalmente, mostrar un mensaje al usuario indicando que la asistencia se guardó
    alert('Asistencia guardada con éxito.');
}
