const express = require('express')
const app = express()

const userRouter = express.Router();
const adminRouter = express.Router();
const bookRouter = express.Router();

// Definitions for use and get for userRouter

userRouter.use((req, res, next) => {
  console.log('User router middleware: processing request for users...');
  next();
});

userRouter.get('/', (req, res) => {
  res.send('List of users');
});

userRouter.get('/:id', (req, res) => {
  res.send(`Details for user with ID: ${req.params.id}`);
});


// Definitions for use and get for adminRouter

adminRouter.use((req, res, next) => {
  console.log('Admin router middleware triggered.');
  next();
});

adminRouter.get('/', (req, res) => {
  res.send('Welcome to the Admin dashboard.');
});

adminRouter.get('/settings', (req, res) => {
  res.send('Admin settings page.');
});


// Definitions for use and get for bookRouter

bookRouter.use('/:title', (req, res, next) => {
  console.log('Book request URL: ', req.originalUrl);
  next();
}, (req, res, next) => {
  console.log('Book request Type: ', req.method);
  next();
});

bookRouter.get('/:title', (req, res) => {
  res.send(`Response for book with title : ${req.params.title}`);
});


// Mount the various routers on the app
app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/books', bookRouter);



const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

