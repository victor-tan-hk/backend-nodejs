const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Define the path for the log file
const logFilePath = path.join(__dirname, 'requests.log');

// Define custom logging middleware to log request details to a file
function logToFile(req, res, next) {

  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

  // Append the log entry to the file
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });

  console.log(`Logged incoming request: ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware/route handler

}

// Use the custom middleware
app.use(logToFile);

// Define a few sample routes
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

app.get('/about', (req, res) => {
  res.send('This is the About Page.');
});

app.post('/submit', (req, res) => {
  res.send('POST request received on /submit');
});

// Handle 404 - for any unmatched routes
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

