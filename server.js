const mysql = require('mysql2');
const Helper = require('./helpers/helpers.js');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password', // add your own password here
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

const helper = new Helper(db);

helper.init();
