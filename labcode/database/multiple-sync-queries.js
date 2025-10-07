const mysql = require('mysql');

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

// Helper function to promisify con.query()
function runQuery(qry) {
  return new Promise((resolve, reject) => {
    con.query(qry, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

con.connect(async (err) => {
  if (err) throw err;
  console.log("Connected to MySQL server!");

  let queries = [
    `SELECT * FROM employees;`,
    `SELECT * FROM employees ORDER BY salary DESC;`,
    `SELECT * FROM employees WHERE age > 40;`,
    `SELECT * FROM employees WHERE salary < 9000;`,
    `SELECT * FROM employees WHERE country = 'Malaysia';`,
  ];

  try {
    for (const qry of queries) {
      console.log(`Running query: ${qry}`);

      // await ensures synchronous execution
      const results = await runQuery(qry);   

      console.log(results);
    }
  } catch (err) {
    console.error("Error executing query:", err);
  } finally {
    con.end();
  }
});
