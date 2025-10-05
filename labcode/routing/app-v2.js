const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Request send to root route')
})

app.get('/home', (req, res) => {
  res.send('Request send to /home route')
})

app.get('/order', (req, res) => {
  res.send('Request send to /order route')
})

app.get('/order/cars', (req, res) => {
  res.send('Request send to /order/cars route')
})

app.get('/redirect', (req, res) => {
  res.redirect('/home');
});

// Catch-all for non-matching routes using middleware
app.use((req, res) => {
  res.status(404).send('Sorry, page not found!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

