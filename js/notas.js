// js/notas.js

let selectedStudent = null;

document.addEventListener('DOMContentLoaded', function() {
    loadSchools();
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

// Filtrar y cargar estudiantes según los valores seleccionados
function filterData() {
    document.getElementById('loadingMessage').style.display = 'block';
    loadStudents().finally(() => {
        document.getElementById('loadingMessage').style.display = 'none';
    });
}

// Cargar estudiantes de la escuela seleccionada
function loadStudents() {
    return new Promise((resolve, reject) => {
        const selectedSchool = document.getElementById('schoolSelect').value;
        const selectedGrade = document.getElementById('gradeSelect').value;
        const selectedSeccion = document.getElementById('seccionSelect').value;

        const Student = Parse.Object.extend('Students');
        const query = new Parse.Query(Student);
        
        if (selectedSchool) query.equalTo('school', selectedSchool);
        if (selectedGrade) query.equalTo('grade', selectedGrade);
        if (selectedSeccion) query.equalTo('seccion', selectedSeccion);

        query.find().then(results => {
            const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
            studentsTable.innerHTML = ''; // Limpiar la tabla

            results.forEach(student => {
                const row = studentsTable.insertRow();
                row.insertCell(0).innerText = student.get('name');
                
                row.insertCell(1).innerText = student.get('primerCorte') || '';
                row.insertCell(2).innerText = student.get('segundoCorte') || '';
                row.insertCell(3).innerText = student.get('tercerCorte') || '';
                row.insertCell(4).innerText = student.get('cuartoCorte') || '';
                row.insertCell(5).innerText = student.get('notaFinal') || '';

                row.addEventListener('dblclick', () => openEditModal(student));
            });
            resolve();
        }).catch(error => {
            console.error('Error al cargar los estudiantes:', error.message);
            reject(error);
        });
    });
}

// Abrir el modal para editar notas
function openEditModal(student) {
    selectedStudent = student;
    document.getElementById('studentNameHeader').innerText = 'Editando notas de ' + student.get('name');
    document.getElementById('primerCorteInput').value = student.get('primerCorte') || '';
    document.getElementById('segundoCorteInput').value = student.get('segundoCorte') || '';
    document.getElementById('tercerCorteInput').value = student.get('tercerCorte') || '';
    document.getElementById('cuartoCorteInput').value = student.get('cuartoCorte') || '';
    document.getElementById('notaFinalInput').value = student.get('notaFinal') || '';
    document.getElementById('editModal').style.display = 'block';
}

// Guardar las notas del estudiante
function saveStudentNotes() {
    if (!selectedStudent) return;

    const primerCorte = document.getElementById('primerCorteInput').value;
    const segundoCorte = document.getElementById('segundoCorteInput').value;
    const tercerCorte = document.getElementById('tercerCorteInput').value;
    const cuartoCorte = document.getElementById('cuartoCorteInput').value;
    const notaFinal = document.getElementById('notaFinalInput').value;

    selectedStudent.set('primerCorte', primerCorte);
    selectedStudent.set('segundoCorte', segundoCorte);
    selectedStudent.set('tercerCorte', tercerCorte);
    selectedStudent.set('cuartoCorte', cuartoCorte);
    selectedStudent.set('notaFinal', notaFinal);

    selectedStudent.save().then(() => {
        document.getElementById('editModal').style.display = 'none';
        loadStudents(); // Recargar la lista de estudiantes
    }).catch(error => {
        console.error('Error al guardar las notas:', error.message);
    });
}
