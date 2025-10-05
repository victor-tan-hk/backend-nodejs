const express = require('express');
const app = express();

// Define the expected token value
const EXPECTED_TOKEN = 'Basic mysecrettoken';

// Custom authentication middleware
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (authHeader === EXPECTED_TOKEN) {
    // Token is valid; proceed to the route handler
    next();
  } else {
    // Token is missing or invalid
    res.status(403).json({ error: 'Forbidden: Invalid or missing Authorization header' });
  }
}

// Public route — no authentication required
app.get('/', (req, res) => {
  res.send('Welcome to the public route!');
});

// Protected route — authentication required
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Access granted to protected route', user: 'dummyUser' });
});


const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

