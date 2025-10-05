const express = require('express')
const app = express()

// Using built-in middleware to parse JSON content
// in body of HTTP requests
app.use(express.json());

// Global Middleware at the start to add common headers
// in response returned

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json'); // Set JSON content type
  res.setHeader('Cache-Control', 'no-cache');        // Disable caching
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (CORS)
  next();
});

// can also add header info in the route handler itslef
app.get('/data', (req, res) => {
  // Optionally set  headers here
  res.setHeader('X-Custom-Header', 'MyAppHeaderValue');
  res.status(200).json({
    message: 'This is a sample JSON response with custom headers'
  });
});

// Resource creation with Location header
app.post('/data', (req, res) => {
  const newId = 'abc123';
  res.setHeader('Location', `/data/${newId}`);
  res.status(201).json({ message: 'Resource created', id: newId });
});


const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

