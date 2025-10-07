const mysql = require('mysql')

// make sure to set the username and password correctly before running
// this script

const con = mysql.createConnection({
  host: 'localhost',
  user: 'basicuser',
  password: 'password'
})

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server !");

  // Execute queries one by one

  con.query("CREATE DATABASE IF NOT EXISTS workshopdb;", (err, results) => {
    if (err) throw err;
    console.log("Created database workshopdb successfully");
  });

  con.query("SHOW DATABASES;", (err, results) => {
    if (err) throw err;
    console.log("Showing databases\n");
    for (result of results) {
      console.log(JSON.stringify(result));
    }
  });

  con.query("USE workshopdb;", (err, results) => {
    if (err) throw err;
    console.log("Selected workshopdb\n");
  });

  // Use a string literal to define the entire 
  // CREATE TABLE statement

  let createStatement = `CREATE TABLE employees(
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(50) DEFAULT NULL,
     country VARCHAR(50) DEFAULT NULL,
	 age INT DEFAULT NULL,
	  salary FLOAT DEFAULT NULL);`;

  con.query(createStatement, (err, results) => {
    if (err) throw err;
    console.log("Created table employees successfully");
  });

  con.query("SHOW TABLES;", (err, results) => {
    if (err) throw err;
    console.log("Showing tables\n");
    for (result of results) {
      console.log(JSON.stringify(result));
    }
  });

  // Hardcoded data to populate table
  let tabledata = [

    ['Peter', 'Malaysia', 35, 2700.16],
    ['James', 'Singapore', 22, 3200.22],
    ['Ali', 'Indonesia', 27, 5400.00],
    ['Sally', 'Thailand', 60, 10200.20],
    ['Muthu', 'Malaysia', 44, 8200.30],
    ['Emma', 'Singapore', 52, 9500.00],
    ['Sophia', 'Thailand', 30, 15800.10]

  ];

  let insertStatement = `INSERT INTO employees(name, country, age, salary) VALUES(?,?,?,?);`;

  for (row of tabledata) {
    con.query(insertStatement, row, (err, result) => {
      if (err) throw err;
      console.log("New record inserted successfully");
    })
  };


  con.end();
});
