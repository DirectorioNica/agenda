// js/asistencia.js

document.addEventListener('DOMContentLoaded', function() {
    loadSchools();
    loadGrades();
    loadSections();

    // Agregar listeners para los botones
    document.getElementById('filterButton').addEventListener('click', filterData);
    document.getElementById('saveAttendanceButton').addEventListener('click', saveAttendance);
});

// Cargar escuelas en el select
function loadSchools() {
    const Student = Parse.Object.extend('Students');
    const query = new Parse.Query(Student);
    query.select('school');

    query.find().then(results => {
        const schools = results.map(result => result.get('school'));
        const uniqueSchools = [...new Set(schools)];

        const schoolSelect = document.getElementById('schoolSelect');
        uniqueSchools.forEach(school => {
            const option = document.createElement('option');
            option.value = school;
            option.text = school;
            schoolSelect.appendChild(option);
        });
    }).catch(error => {
        console.error('Error al cargar las escuelas:', error.message);
    });
}

// Cargar grados en el select
function loadGrades() {
    const Student = Parse.Object.extend('Students');
    const query = new Parse.Query(Student);
    query.select('grade');

    query.find().then(results => {
        const grades = results.map(result => result.get('grade'));
        const uniqueGrades = [...new Set(grades)];

        const gradeSelect = document.getElementById('gradeSelect');
        uniqueGrades.forEach(grade => {
            const option = document.createElement('option');
            option.value = grade;
            option.text = `Grado ${grade}`;
            gradeSelect.appendChild(option);
        });
    }).catch(error => {
        console.error('Error al cargar los grados:', error.message);
    });
}

// Cargar secciones en el select
function loadSections() {
    const Student = Parse.Object.extend('Students');
    const query = new Parse.Query(Student);
    query.select('seccion');

    query.find().then(results => {
        const sections = results.map(result => result.get('seccion'));
        const uniqueSections = [...new Set(sections)];

        const sectionSelect = document.getElementById('seccionSelect');
        uniqueSections.forEach(section => {
            const option = document.createElement('option');
            option.value = section;
            option.text = section;
            sectionSelect.appendChild(option);
        });
    }).catch(error => {
        console.error('Error al cargar las secciones:', error.message);
    });
}

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
