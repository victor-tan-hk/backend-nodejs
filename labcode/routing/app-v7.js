const express = require('express')
const app = express()

// Using built-in middleware to parse JSON content
// in body of HTTP requests
app.use(express.json());

// Global Middleware at the start to extract and log common headers
app.use((req, res, next) => {
  console.log("Request Headers Received:");
  console.log("Content-Type:", req.headers['content-type']);
  console.log("Authorization:", req.headers['authorization']);
  console.log("Accept:", req.headers['accept']);
  next(); // Sends on to the next middleware 
});

// Sample route: GET
app.get('/data', (req, res) => {
  res.send({ message: "GET request received with headers", headers: req.headers });
});

// Sample route: POST
app.post('/data', (req, res) => {
  res.send({ message: "POST request received with headers", headers: req.headers });
});


const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

