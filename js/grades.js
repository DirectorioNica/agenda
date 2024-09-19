// js/grades.js

function showGrade(grade) {
    const studentsList = document.getElementById('students-list');
    studentsList.innerHTML = `<h3>Estudiantes del grado ${grade}</h3>`;
    
    // Aquí puedes obtener los datos de los estudiantes desde Back4App y mostrarlos
    // Por ejemplo, supongamos que tienes una clase 'Student' con los datos.
    
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    query.equalTo("grade", grade);
    
    query.find().then(students => {
        students.forEach(student => {
            const studentName = student.get("name");
            studentsList.innerHTML += `<p>${studentName}</p>`;
        });
    }).catch(error => {
        console.error("Error al obtener estudiantes:", error);
    });
}
