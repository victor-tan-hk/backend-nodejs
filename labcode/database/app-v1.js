const express = require('express');
const mysql = require('mysql2/promise');   // mysql2 supports async/await
const cors = require('cors'); // to enable CORS support
const app = express();

//Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'basicuser',       // replace with your MySQL username
  password: 'password',    // replace with your MySQL password
  database: 'workshopdb'
});

// ----------------------------------------
// GET /employees : Retrieve all employees
// ----------------------------------------
app.get('/employees', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees');
    res.json(rows);
  } catch (err) {
    console.error('Error retrieving employees:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// ----------------------------------------
// POST /employees : Add a new employee
// ----------------------------------------
app.post('/employees', async (req, res) => {
  const { name, country, age, salary } = req.body;

  if (!name || !country || !age || !salary) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO employees (name, country, age, salary) VALUES (?, ?, ?, ?)',
      [name, country, age, salary]
    );
    res.status(201).json({
      message: 'Employee added successfully',
      employeeId: result.insertId
    });
  } catch (err) {
    console.error('Error inserting employee:', err);
    res.status(500).json({ error: 'Failed to insert employee' });
  }
});

// -------------------------------------------------------
// PUT /employees/:id : Update an employee by its ID
// -------------------------------------------------------
app.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name, country, age, salary } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE employees SET name = ?, country = ?, age = ?, salary = ? WHERE id = ?',
      [name, country, age, salary, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee updated successfully' });
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

// -------------------------------------------------------
// DELETE /employees/:id : Delete an employee by its ID
// -------------------------------------------------------
app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

// -------------------------------------------------------
// Start the Express server
// -------------------------------------------------------
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
