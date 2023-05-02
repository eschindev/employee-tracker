const inquirer = require('inquirer');


class Helper {
    constructor(db) {
        this.db = db;
    }

    init() {
        inquirer.prompt([{
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View departments', 'View roles', 'View employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee\'s role']
        }]).then((choice) => {
            switch(choice.action) {
                case 'View departments':
                    this.viewDepartments();
                    break;
                case 'View roles':
                    this.viewRoles();
                    break;
                case 'View employees':
                    this.viewEmployees();
                    break;
                case 'Add a department':
                    this.addDepartment();
                    break;
                case 'Add a role':
                    this.addRole();
                    break;
                case 'Add an employee':
                    this.addEmployee();
                    break;
                case 'Update an employee\'s role':
                    this.updateEmployeeRole();
                    break;
            }
        })
    }

    viewDepartments() {
        this.db.query(`SELECT * FROM departments`, (err, result) => {
            if (err) {
                console.error(err);
                return 'error: failed to retrieve department list.';
            }
            console.table(result);
            this.init();
        });
    }

    viewRoles() {
        this.db.query(`SELECT * FROM roles`, (err, result) => {
            if (err) {
                console.error(err);
                return 'error: failed to retrieve department list.';
            }
            console.table(result);
            this.init();
        }); 
    }

    viewEmployees() {
        this.db.query(`SELECT * FROM employees`, (err, result) => {
            if (err) {
                console.error(err);
            }
            console.table(result);
            this.init();
        });
    }

    addDepartment(departmentName) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the new department?'
            }
        ]).then((data) => {
            const { departmentName } = data;
            this.db.query(`INSERT INTO departments (name) VALUES ("${departmentName}");`, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`${departmentName} successfully added!`);
                this.init();
            });
        });
    }

    addRole() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the new role\'s title?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the new role\'s salary?'
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'What is the ID of the new role\'s department?'
            }
        ]).then((data) => {
            const { title, salary, departmentId } = data;
            this.db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${title}", ${salary}, ${departmentId});`, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`${title} successfully added!`);
                this.init();
            });
        });
    }

    addEmployee() {
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
            this.db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                        VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId});`, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`${firstName} successfully added!`);
                this.init();
            });
        });
    }

    updateEmployeeRole() {
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
            this.db.query(`UPDATE employees
                        SET role_id = ${roleId}
                        WHERE id = ${employeeId}`, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`Employee ${employeeId} successfully updated!`);
                this.init();
            });
        });
    }
}


module.exports = Helper;