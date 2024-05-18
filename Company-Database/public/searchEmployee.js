//function utilitzed in module: 'Weeks 9 & 10: Node.js' NodeJs.pptx slide 9; cited 12/4/2023
function searchEmployeeByFirstName () {

    //get the text from the input field
    var first_name_search_string = document.getElementById('first_name_search_string').value;
    
    //if the input field is not empty, navigate to the search route with the encoded search string
    if (first_name_search_string !== ''){
        window.location = '/employee/search/' + encodeURI(first_name_search_string);
    }

    //if the input field is empty, navigate to the list of all employees if the search is empty
    else{
        window.location = '/employee';
    }
}

//navigate back to the unfiltered list of all employees
function clearFirstNameSearch() {
    document.getElementById('first_name_search_string').value = '';
    window.location = '/employee';
}