

// Función para cargar los informes
function loadReports() {
   
    fetchGradeSexReport(); // Cambiada para reflejar grado y sexo
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
