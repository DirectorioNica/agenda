// js/notas.js

document.addEventListener('DOMContentLoaded', function() {
    loadSchools();
    document.getElementById('schoolSelect').addEventListener('change', loadStudents);
});

// Cargar escuelas en el select
function loadSchools() {
    const Student = Parse.Object.extend('Students');
    const query = new Parse.Query(Student);
    query.select('school'); // Seleccionar solo el campo de la escuela

    query.find().then(results => {
        const schools = results.map(result => result.get('school'));
        const uniqueSchools = [...new Set(schools)]; // Eliminar duplicados

        const schoolSelect = document.getElementById('schoolSelect');
        uniqueSchools.forEach(school => {
            const option = document.createElement('option');
            option.value = school;
            option.text = school;
            schoolSelect.appendChild(option);
        });
    }).catch(error => {
        alert('Error al cargar las escuelas: ' + error.message);
    });
}

// Cargar estudiantes de la escuela seleccionada
function loadStudents() {
    const selectedSchool = document.getElementById('schoolSelect').value;
    const Student = Parse.Object.extend('Students');
    const query = new Parse.Query(Student);
    query.equalTo('school', selectedSchool);

    query.find().then(results => {
        const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
        studentsTable.innerHTML = ''; // Limpiar la tabla

        results.forEach(student => {
            const row = studentsTable.insertRow();
            row.insertCell(0).innerText = student.get('name');
            row.insertCell(1).innerText = student.get('grade');
            row.insertCell(2).innerText = student.get('primerCorte') || '';
            row.insertCell(3).innerText = student.get('segundoCorte') || '';

            // Hacer que la fila sea editable al hacer doble clic
            row.addEventListener('dblclick', () => editStudent(student));
        });
    }).catch(error => {
        alert('Error al cargar los estudiantes: ' + error.message);
    });
}

// Editar un estudiante para actualizar primerCorte y segundoCorte
function editStudent(student) {
    const primerCorte = prompt('Ingrese la nota para el Primer Corte:', student.get('primerCorte') || '');
    const segundoCorte = prompt('Ingrese la nota para el Segundo Corte:', student.get('segundoCorte') || '');

    if (primerCorte !== null && segundoCorte !== null) {
        student.set('primerCorte', primerCorte);
        student.set('segundoCorte', segundoCorte);

        student.save().then(() => {
            alert('Notas actualizadas con éxito');
            loadStudents(); // Recargar la tabla de estudiantes
        }).catch(error => {
            alert('Error al actualizar las notas: ' + error.message);
        });
    }
}
