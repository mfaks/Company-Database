//function utilitzed in module: 'Weeks 9 & 10: Node.js' NodeJs.pptx slide 8; cited 12/4/2023
function filterEmployeeByProject() {

    //get the selected project number from the dropdown menu
    var project_pno = document.getElementById('projectFilter').value;

    //construct the URL and redirect to it
    window.location = '/employee/filter/' + parseInt(project_pno)
}

//navigate back to the unfiltered list of all employees
function clearProjectFilter() {
    window.location.href = '/employee';
}