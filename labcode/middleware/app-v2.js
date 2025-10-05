const express = require('express')
const app = express()

// Middleware substack within an app.use 
app.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
}, (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
})

app.get('/user/:id', (req, res) => {
  res.send(`Response for user with ID: ${req.params.id}`);
});

// Middleware substack within an app.get 
app.get('/books/:title', (req, res, next) => {
  console.log('Books title : ', req.params.title)
  next();
}, (req, res, next) => {
  res.send('Response for books');
})

// Demonstrating conditional execution of middleware in a stack
app.get('/order/:id', (req, res, next) => {
  // if the order ID is 0, skip to the next route
  if (req.params.id === '0') next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next();
}, (req, res, next) => {
  // send a regular response
  res.send(`Sending back a regular response for order with id ${req.params.id}`);
})

// handler for the /user/:id path, which sends a special response
app.get('/order/:id', (req, res, next) => {
  res.send(`Sending back a special response for order with id ${req.params.id}`);
})


const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

