const express = require('express')
const app = express()


// First global middleware which runs for all incoming requests
app.use((req, res, next) => {
  console.log("Processing global Middleware 1 at " + new Date());
  next();
});

// Second middleware runs after the next call in the global 1st middleware
app.use((req, res, next) => {
  console.log('Processing global Middleware 2');
  next();
});

// First middleware mounted on a specific path: things
app.use('/things', (req, res, next) => {
   console.log("Processing middleware for things at " + new Date());
   next();
});

// Route handler runs after the next call in the 2nd middleware
app.get('/', (req, res) => {
  res.send('Root route reached ');
});

// Route handler for things
app.get('/things', (req, res) => {
   res.send('Things route');
});


const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

