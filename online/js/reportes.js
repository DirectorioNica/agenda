// Función para cargar los informes
function loadReports() {
    // No es necesario cargar las escuelas si se ingresan manualmente en el HTML
}

// Función para obtener el informe por grado y sexo desde Back4App
function fetchGradeSexReport(school) {
    const Student = Parse.Object.extend('Students');
    const query = new Parse.Query(Student);
    if (school) query.equalTo('school', school);
    query.find()
        .then(results => {
            const reportContainer = document.getElementById('gradoSexoReport');
            const gradeSexReport = {};

            results.forEach(student => {
                const grade = student.get('grade');
                const section = student.get('seccion');
                const gender = student.get('gender');

                if (!gradeSexReport[grade]) {
                    gradeSexReport[grade] = {};
                }

                if (!gradeSexReport[grade][section]) {
                    gradeSexReport[grade][section] = { M: 0, F: 0 };
                }

                if (gender === 'M' || gender === 'F') {
                    gradeSexReport[grade][section][gender]++;
                }
            });

            let html = '<table class="w3-table-all"><thead><tr><th>Grado</th><th>Sección</th><th>Masculino</th><th>Femenino</th></tr></thead><tbody>';
            for (const [grade, sections] of Object.entries(gradeSexReport)) {
                for (const [section, data] of Object.entries(sections)) {
                    html += `<tr class="w3-border w3-hover-opacity w3-hover-red"><td>${grade}</td><td>${section}</td><td>${data.M}</td><td>${data.F}</td></tr>`;
                }
            }
            html += '</tbody></table>';

            reportContainer.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching grade and sex report:', error);
        });
}

// Función para obtener el informe de notas desde Back4App
function fetchNotesReport(school, cut) {
    const Note = Parse.Object.extend('Students');
    const query = new Parse.Query(Note);
    if (school) query.equalTo('school', school);
    query.find()
        .then(results => {
            const reportContainer = document.getElementById('notesReport');
            const notesReport = {};
            const uniqueNotes = new Set();

            results.forEach(note => {
                const grade = note.get('grade');
                const gender = note.get('gender');
                const noteValue = note.get(cut);

                // Añadir el valor de la nota al conjunto de notas únicas
                if (noteValue) uniqueNotes.add(noteValue);

                if (!notesReport[grade]) {
                    notesReport[grade] = { M: {}, F: {} };
                }

                if (!notesReport[grade][gender]) {
                    notesReport[grade][gender] = {};
                }

                if (!notesReport[grade][gender][noteValue]) {
                    notesReport[grade][gender][noteValue] = 0;
                }
                notesReport[grade][gender][noteValue]++;
            });

            // Convertir el conjunto en un array y ordenar
            const possibleNotes = Array.from(uniqueNotes).sort();

            let html = '<table class="w3-table-all"><thead><tr><th>Grado</th><th>Corte</th><th>Nota</th><th>M </th><th>F</th></tr></thead><tbody>';

            for (const [grade, genders] of Object.entries(notesReport)) {
                possibleNotes.forEach(note => {
                    const maleCount = genders.M[note] || 0;
                    const femaleCount = genders.F[note] || 0;

                    html += `<tr class="w3-border w3-hover-opacity w3-hover-red"><td>${grade}</td><td>${cut}</td><td>${note}</td><td>${maleCount}</td><td>${femaleCount}</td></tr>`;
                });
            }

            html += '</tbody></table>';

            reportContainer.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching notes report:', error);
        });
}





// Generar el informe cuando se haga clic en el botón
document.getElementById('generateReportButton').addEventListener('click', function() {
    const selectedSchool = document.getElementById('schoolSelect').value;
    const selectedCut = document.getElementById('cutSelect').value;

    if (selectedSchool && selectedCut) {
        fetchGradeSexReport(selectedSchool);
        fetchNotesReport(selectedSchool, selectedCut);
    } else {
        alert('Por favor, seleccione una escuela y un corte.');
    }
});
