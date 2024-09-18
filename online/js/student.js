// Función para registrar un nuevo estudiante
function registerStudent() {
    const studentName = document.getElementById('studentName').value;
    const studentGrade = document.getElementById('studentGrade').value;
    const studentSchool = document.getElementById('studentSchool').value;
    const studentSeccion = document.getElementById('studentSeccion').value;
	studentSeccion=studentSeccion.toUpperCase();
	const studentGender = document.getElementById('studentGender').value;

    if (!studentName || !studentGrade || !studentSchool || !studentSeccion) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Crear una consulta para verificar si el estudiante ya existe
    const Student = Parse.Object.extend('Students');
    const query = new Parse.Query(Student);
    query.equalTo('name', studentName);
    query.equalTo('grade', studentGrade);
    query.equalTo('seccion', studentSeccion);

    query.first()
        .then(existingStudent => {
            if (existingStudent) {
                // Estudiante ya existe
                alert("El estudiante ya está registrado.");
                return; // Salir de la función para evitar el registro
            } else {
                // Crear una nueva instancia de la clase Student en Back4App
                const newStudent = new Student();
                newStudent.set('name', studentName);
                newStudent.set('grade', studentGrade);
				newStudent.set('gender', studentGender);
				newStudent.set('school', studentSchool);
                newStudent.set('seccion', studentSeccion);

                // Guardar en la base de datos
                return newStudent.save();
            }
        })
        .then(() => {
            // Si se llegó aquí, es porque el estudiante no existía y ahora se ha registrado exitosamente
            alert('Estudiante registrado con éxito');
            // Limpiar el formulario
            document.getElementById('studentName').value = '';
            document.getElementById('studentGrade').value = '';
            document.getElementById('studentSchool').value = '';
           
	    document.getElementById('studentGender').value = '';
        })
        .catch(error => {
            alert('Error al registrar estudiante: ' + error.message);
        });
}
