// Función para generar el reporte de asistencia
function generateAttendanceReport() {
    let allAttendance = JSON.parse(localStorage.getItem('attendance')) || {};
    let reportHtml = `
        <button class="w3-button w3-blue" onclick="generateAndShowReport()">Generar Informe</button>
        <table class="w3-table w3-bordered w3-striped w3-hoverable">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Clase</th>
                    <th>Estudiantes Presentes</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let date in allAttendance) {
        for (let studentClass in allAttendance[date]) {
            const attendance = allAttendance[date][studentClass];
            const presentCount = Object.values(attendance).filter(status => status === 'present').length;
            reportHtml += `
                <tr ondblclick="showStudentDetails('${date}', '${studentClass}')">
                    <td>${date}</td>
                    <td>${studentClass}</td>
                    <td>${presentCount}</td>
                </tr>
            `;
        }
    }

    reportHtml += `
            </tbody>
        </table>
    `;
    return reportHtml;
}

// Función para mostrar los detalles de los estudiantes al hacer doble clic en una fila
function showStudentDetails(date, studentClass) {
    let allAttendance = JSON.parse(localStorage.getItem('attendance')) || {};
    let attendance = allAttendance[date] ? allAttendance[date][studentClass] : null;

    if (attendance) {
        let studentsHtml = `
            <h3>Estudiantes de la clase ${studentClass} el ${date}</h3>
            <h4>Presentes:</h4>
            <ul class="w3-ul w3-card-4">
        `;

        for (let student in attendance) {
            if (attendance[student] === 'present') {
                studentsHtml += `<li class="w3-bar">${student}</li>`;
            }
        }

        studentsHtml += `
            </ul>
            <h4>Ausentes:</h4>
            <ul class="w3-ul w3-card-4">
        `;

        for (let student in attendance) {
            if (attendance[student] === 'absent') {
                studentsHtml += `<li class="w3-bar">${student}</li>`;
            }
        }

        studentsHtml += '</ul>';
        document.getElementById('report-content').innerHTML = studentsHtml;
    } else {
        alert('No hay datos de asistencia para esta fecha y clase.');
    }
}

// Función para mostrar el reporte en el HTML
function showAttendanceReport() {
    toggleVisibility('date-form', false);
    toggleVisibility('attendance-form', false);
    toggleVisibility('add-student-form', false);
    toggleVisibility('attendance-report', true);
    toggleVisibility('student-search', false);
    toggleVisibility('class-management', false);

    const reportContent = document.getElementById('report-content');
    reportContent.innerHTML = generateAttendanceReport();
}

// Exportar las funciones globalmente
window.showAttendanceReport = showAttendanceReport;
window.showStudentDetails = showStudentDetails;
