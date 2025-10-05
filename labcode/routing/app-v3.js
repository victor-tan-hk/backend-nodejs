const express = require('express')
const app = express()
const port = 3000

app.get('/tryme', (req, res) => {
  res.send('GET request received')
})

app.post('/tryme', (req, res) => {
  res.send('POST request received')
})

app.put('/tryme', (req, res) => {
  res.send('PUT request received')
})

app.patch('/tryme', (req, res) => {
  res.send('PATCH request received')
})

app.delete('/tryme', (req, res) => {
  res.send('DELETE request received')
})

// Catch-all for non-matching routes using middleware
app.use((req, res) => {
  res.status(404).send('Sorry, page not found!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

