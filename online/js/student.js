// js/student.js

// Función para registrar estudiantes
async function registerStudent(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const grade = document.getElementById('grade').value;
    const gender = document.getElementById('gender').value;
    const school = document.getElementById('school').value;
    const primerCorte = document.getElementById('primerCorte').value;
    const segundoCorte = document.getElementById('segundoCorte').value;
    const tercerCorte = document.getElementById('tercerCorte').value;
    const cuartoCorte = document.getElementById('cuartoCorte').value;
    const notaFinal = document.getElementById('notaFinal').value;

    // Crear un nuevo objeto Parse para guardar el estudiante
    const Student = Parse.Object.extend("Students");
    const student = new Student();

    student.set("name", name);
    student.set("grade", grade);
    student.set("gender", gender);
    student.set("school", school);
    student.set("primerCorte", primerCorte);
    student.set("segundoCorte", segundoCorte);
    student.set("tercerCorte", tercerCorte);
    student.set("cuartoCorte", cuartoCorte);
    student.set("notaFinal", notaFinal);

    try {
        // Guardar el estudiante en Back4App
        await student.save();
        document.getElementById("success-msg").style.display = "block";
    } catch (error) {
        console.error('Error al registrar el estudiante:', error);
    }
}
