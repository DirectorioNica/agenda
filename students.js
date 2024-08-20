// students.js
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

function addStudentToLocalStorage(name, studentClass) {
    let students = getLocalStorageItem('students');
    students.push({ name, studentClass });
    setLocalStorageItem('students', students);
}
