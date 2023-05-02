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


function getDepartments() {
    db.query(`SELECT * FROM departments`, (err, result) => {
        if (err) {
            console.error(err);
            return 'error: failed to retrieve department list.';
        }
        console.table(result);
    });
}

function getRoles() {
    db.query(`SELECT * FROM roles`, (err, result) => {
        if (err) {
            console.error(err);
            return 'error: failed to retrieve department list.';
        }
        console.table(result);
    }); 
}

getDepartments();
getRoles();


module.exports = db;

