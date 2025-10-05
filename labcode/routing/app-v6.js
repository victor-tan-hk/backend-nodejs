const express = require('express')
const app = express()

// Using built-in middleware to parse JSON content
// in body of HTTP requests
app.use(express.json());

// ---------------------------------------
// POST request example: Create new user
// ---------------------------------------
app.post('/users', (req, res) => {
  // Extract specific fields from JSON body
  const { name, email } = req.body;

  console.log('POST request received:');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);

  // Send response using extracted fields
  res.send({
    message: 'User created successfully!',
    nameReceived: name,
    emailReceived: email
  });
});

// ---------------------------------------
// PUT request example: Replace user info
// ---------------------------------------
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body; // Extract fields

  console.log(`PUT request received for user ID: ${userId}`);
  console.log(`Updated Name: ${name}`);
  console.log(`Updated Email: ${email}`);

  res.send({
    message: `User ${userId} updated successfully!`,
    updatedName: name,
    updatedEmail: email
  });
});


const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

