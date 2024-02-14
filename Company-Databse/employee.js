//functions and route structure inspired by cs340_sample_nodejs_app provided in the assignment instructions; cited 12/4/2022
module.exports = function () {

    var express = require('express');
    var router = express.Router();

    //get all employee data for table
    function getEmployees(req, res, next, context) {

        //retrieve relevant employee information
        var query = 'SELECT Fname, Lname, Salary, Dno FROM EMPLOYEE';
        var mysql = req.app.get('mysql');

        //store query results inside context, wait for the project data to load before rendereding combined context
        function handleRenderingOfEmployees(error, results, fields) {
            if (error) {
                return next(error);
            }
            context.employees = results;
            if (context.projects) {
                res.render('employee', context);
            }
        }

        //execute the SQL query
        mysql.pool.query(query, handleRenderingOfEmployees);
    }

    //get all project data for filtering
    function getProjects(req, res, next, context) {

        //retrieve relevant project information
        var query = 'SELECT Pnumber, Pname FROM PROJECT';
        var mysql = req.app.get('mysql');

        //store query results inside context, wait for the employee data to load before rendereding combined context
        function handleRenderingOfProjects(error, results, fields) {
            if (error) {
                return next(error);
            }
            context.projects = results;
            if (context.employees) {
                res.render('employee', context);
            }
        }

        //execute the SQL query
        mysql.pool.query(query, handleRenderingOfProjects);
    }

    //get relevant project info based on filter selected in the web page
    function getProjectInfo(req, res, next, context) {

        //query information on projectInfo by project
        var query = 'SELECT Pname, Pnumber, Plocation FROM PROJECT WHERE Pnumber = ?';
        var mysql = req.app.get('mysql');
        
        //store query results inside context, wait for updated employee information to be initalized before rendering the data
        function handleRenderingOfProjectInfo(error, results, fields) {
            if (error) {
                reject(error);
                return;
            }
            context.projectInfo = results[0];
            if (context.employees) {
                res.render('employee', context);
            }
        }
        
        //execute the SQL query
        mysql.pool.query(query, [req.params.project], handleRenderingOfProjectInfo);
    }
    
    //get relevant employee info based on project filter selected in the web page
    function getEmployeeByProject(req, res, next, context) {

        //query information on employees by project
        var query = 'SELECT Ssn, Fname, Lname, Salary, Dno, WO.Pno FROM EMPLOYEE E, WORKS_ON WO WHERE WO.Essn = E.Ssn AND Pno = ?';
        var mysql = req.app.get('mysql');
    
        //store query results inside context, wait for projectInfo to to be initailized before rendering the data
        function handleRenderingOfEmployeeByProject(error, results, fields) {
            if (error) {
                reject(error);
                return;
            }
            context.employees = results;
            if (context.projectInfo) {
                res.render('employee', context);
            }
        }
        //execute the SQL query
        mysql.pool.query(query, [req.params.project], handleRenderingOfEmployeeByProject);
    }   

    //get relevant employee info based on search filter selected in the web page
    function getEmployeeWithNameLike(req, res, next, context, searchQuery) {

        //write query to get the first names matching the search
        var mysql = req.app.get('mysql');
        var query = 'SELECT Ssn, Fname, Lname, Salary, Dno FROM EMPLOYEE WHERE Fname LIKE ' + mysql.pool.escape(req.params.s + '%');
    
        //store the results of the query and render the response
        function handleRenderingOfSearchResults(error, results, fields) {
            if (error) {
                return next(error);
            }    
            context.employees = results;
            res.render('employee', context);
        }
    
        //execute the SQL query
        mysql.pool.query(query, handleRenderingOfSearchResults);
    }  

    //router to return all employee and project information
    router.get('/', function(req, res, next) {
        var context = {};
        getEmployees(req, res, next, context);
        getProjects(req, res, next, context);
    });

    //router to return project information and employees filtered by project
    router.get('/filter/:project', function(req, res, next) {
        var context = {};    
        getProjectInfo(req, res, next, context);
        getEmployeeByProject(req, res, next, context);
    });
    
    //router to return the searched employee information
    router.get('/search/:s', function (req, res, next) {

        //set the searchQuery in the context and handle the employee search
        var context = {};    
        context.searchQuery = req.params.s;
        getEmployeeWithNameLike(req, res, next, context, '%' + req.params.s + '%');
    });

    return router;
}();