// js/export.js

function exportCSV() {
    const students = [];  // Aquí debes cargar los estudiantes de Back4App
    let csvContent = "data:text/csv;charset=utf-8,Nombre,Grado,Nota\n";

    // Supongamos que 'students' tiene la lista de estudiantes
    students.forEach(student => {
        const studentName = student.name;
        const grade = student.grade;
        const gradeValue = student.gradeValue;  // La nota del estudiante
        csvContent += `${studentName},${grade},${gradeValue}\n`;
    });

    // Crear un enlace de descarga
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "registro_notas.csv");
    document.body.appendChild(link);

    link.click();  // Ejecutar la descarga
}
