// Función para mostrar el contenido de la pestaña seleccionada
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-light-grey", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " w3-light-grey";
}

// Función para cargar los informes
function loadReports() {
    fetchGradeReport();
    fetchGradeSexReport(); // Cambiada para reflejar grado y sexo
}

// Función para obtener el informe por grado desde Back4App
function fetchGradeReport() {
    const Student = Parse.Object.extend('Students');
    const query = new Parse.Query(Student);
    query.find()
        .then(results => {
            const reportContainer = document.getElementById('gradoReport');
            const grades = {};
            results.forEach(student => {
                const grade = student.get('grade');
                if (!grades[grade]) {
                    grades[grade] = { count: 0 };
                }
                grades[grade].count++;
            });

            let html = '<table class="w3-table-all"><thead><tr><th>Grado</th><th>Numero de Estudiantes</th></tr></thead><tbody>';
            for (const [grade, data] of Object.entries(grades)) {
                html += `<tr><td>${grade}</td><td>${data.count}</td></tr>`;
            }
            html += '</tbody></table>';

            reportContainer.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching grade report:', error);
        });
}

// Función para obtener el informe por grado y sexo desde Back4App
function fetchGradeSexReport() {
    const Student = Parse.Object.extend('Students');
    const query = new Parse.Query(Student);
    query.find()
        .then(results => {
            const reportContainer = document.getElementById('gradoSexoReport');
            const gradeSexReport = {};

            results.forEach(student => {
                const grade = student.get('grade');
                const gender = student.get('gender'); // Verificar que "gender" sea la columna en Back4App
                
                if (!gradeSexReport[grade]) {
                    gradeSexReport[grade] = { M: 0, F: 0 }; // Inicializa con contadores para M y F
                }
                
                if (gender === 'M' || gender === 'F') {
                    gradeSexReport[grade][gender]++;
                }
            });

            let html = '<table class="w3-table-all"><thead><tr><th>Grado</th><th>Masculino</th><th>Femenino</th></tr></thead><tbody>';
            for (const [grade, data] of Object.entries(gradeSexReport)) {
                html += `<tr><td>${grade}</td><td>${data.M}</td><td>${data.F}</td></tr>`;
            }
            html += '</tbody></table>';

            reportContainer.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching grade and sex report:', error);
        });
}

// Cargar los reportes cuando la página esté lista
window.onload = function() {
    loadReports();
}
