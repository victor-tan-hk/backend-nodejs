const mysql = require('mysql')

// make sure to set the username and password correctly before running
// this script

// ensure that that the database workshopdb and table employees has already 
// been created

const con = mysql.createConnection({
    host: 'localhost',
    user: 'basicuser',
    password: 'password',
    database: 'workshopdb'
});

con.connect((err) => {

    if (err) throw err;
    console.log("Connected to MySQL server !");

    let queryStatement = `SELECT * FROM employees;`;

    console.log(`Executing query :  ${queryStatement}`);
    con.query(queryStatement, (err, results) => {
        if (err) throw err;
        console.log(results);
    });

	con.end();
});



