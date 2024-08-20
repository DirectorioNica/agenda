// reports.js
function generateAttendanceReport() {
    let dates = getLocalStorageItem('dates');
    let reportHtml = '<ul>';
    dates.forEach(date => {
        reportHtml += `<li>${date}: ${getAttendanceForDate(date)}</li>`;
    });
    reportHtml += '</ul>';
    return reportHtml;
}

function generateClassList() {
    let students = getLocalStorageItem('students');
    let classList = {};
    students.forEach(student => {
        if (!classList[student.studentClass]) {
            classList[student.studentClass] = [];
        }
        classList[student.studentClass].push(student.name);
    });
    let classHtml = '<ul>';
    for (let className in classList) {
        classHtml += `<li><strong>${className}</strong><ul>`;
        classList[className].forEach(studentName => {
            classHtml += `<li>${studentName}</li>`;
        });
        classHtml += '</ul></li>';
    }
    classHtml += '</ul>';
    return classHtml;
}

function getAttendanceForDate(date) {
    let attendance = getLocalStorageItem('attendance');
    return attendance[date] ? Object.values(attendance[date]).filter(status => status === 'present').length : 'No data';
}

function searchStudentByName(name) {
    let students = getLocalStorageItem('students');
    let resultHtml = '<ul>';
    students.forEach(student => {
        if (student.name.includes(name)) {
            resultHtml += `<li>${student.name} - Clase: ${student.studentClass}</li>`;
        }
    });
    resultHtml += '</ul>';
    return resultHtml;
}

window.searchStudent = function() {
    const name = document.getElementById('student-search-input').value;
    if (name) {
        const results = searchStudentByName(name);
        document.getElementById('search-results').innerHTML = results;
    } else {
        alert('Por favor, ingrese un nombre para buscar.');
    }
};
