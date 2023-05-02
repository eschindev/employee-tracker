const mysql = require('mysql2');
const inquirer = require('inquirer');


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password', // add your own password here
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);


function viewDepartments() {
    db.query(`SELECT * FROM departments`, (err, result) => {
        if (err) {
            console.error(err);
            return 'error: failed to retrieve department list.';
        }
        console.table(result);
    });
}

function viewRoles() {
    db.query(`SELECT * FROM roles`, (err, result) => {
        if (err) {
            console.error(err);
            return 'error: failed to retrieve department list.';
        }
        console.table(result);
    }); 
}

function viewEmployees() {
    db.query(`SELECT * FROM employees`, (err, result) => {
        if (err) {
            console.error(err);
        }
        console.table(result);
    });
}

function addDepartment(departmentName) {
    db.query(`INSERT INTO departments (name) VALUES ("${departmentName}");`, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`${departmentName} successfully added!`);
    });
}

function addRole(title, salary, departmentId) {
    db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${title}", ${salary}, ${departmentId});`, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`${title} successfully added!`);
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the ID of their role?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the ID of their manager?'
        }
    ]).then((data) => {
        const { firstName, lastName, roleId, managerId } = data;
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                    VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId});`, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`${firstName} successfully added!`);
            init();
        });
    });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Which employee would you like to update?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What would you like their new role to be?'
        }
    ]).then((data) => {
        const { employeeId, roleId } = data;
        db.query(`UPDATE employees
                    SET role_id = ${roleId}
                    WHERE id = ${employeeId}`, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Employee ${employeeId} successfully updated!`);
            init();
        });
    });
}


function init() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View departments', 'View roles', 'View employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee\'s role']
    }]).then((choice) => {
        switch(choice.action) {
            case 'View departments':
                viewDepartments();
                break;
            case 'View roles':
                viewRoles();
                break;
            case 'View employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee\'s role':
                updateEmployeeRole();
                break;
        }
    })
}

init();


