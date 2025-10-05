const express = require('express')
const app = express()

// Middleware to parse JSON request body
app.use(express.json());

/* ------------------------------------------------------------------
   Example 1: Synchronous Error (e.g. Incorrect or missing Input)
-------------------------------------------------------------------*/
app.post('/divide', (req, res, next) => {
  try {
    const { firstnum, secondnum } = req.body;
    console.log('POST request received:');
    console.log(`firstnum: ${firstnum}`);
    console.log(`secondnum: ${secondnum}`);


    if (secondnum === 0) {
      // Throw synchronous error
      throw new Error("Division by zero is not allowed");
    }
    if (firstnum === undefined || secondnum === undefined) {
      throw new Error("Missing parameters 'firstnum' or 'secondnum'");
    }
    res.json({ result: firstnum / secondnum });
  } catch (err) {
    next(err); // forward to centralized error handling middleware
  }
});


/* ------------------------------------------------------------------
   Example 2: Handling asynchronous Error (e.g. error interacting with database)
-------------------------------------------------------------------*/

app.get('/user/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    // Simulate async error 
    // For e.g. attempting to retrieve a missing record from a database
    // or not able to connected to the database
    await new Promise((_, reject) => setTimeout(() => reject(new Error("User not found in DB")), 3000));
    res.json({ id: userId, name: "John Doe" });
  } catch (err) {
    next(err); // forward to centralized error handling middleware
  }
});

/* ------------------------------------------------------------------
Example 3: Catch-all for non-matching routes using middleware
-------------------------------------------------------------------*/
app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.status = 404;
  next(error); // forward to centralized error handling middleware
});

/* ------------------------------------------------------------------
   Centralized Error Handling Middleware
-------------------------------------------------------------------*/
app.use((err, req, res, next) => {
  console.error(`Error occurred ! ${err.message}`);

  // Set appropriate error status code to retunr in response
  const errorCode = err.status || 500;

  // Send JSON error response
  res.status(errorCode).json({
    errorMessage: err.message,
  });
});


const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

