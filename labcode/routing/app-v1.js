const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Cool stuff!')
})

app.listen(port, () => {
  // Use template literal syntax
  console.log(`Example app listening on port ${port}`)
})

