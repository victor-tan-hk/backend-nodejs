const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(`Home page`);
});

// Access single route parameter using req.params
app.get('/orders/:orderId', (req, res) => {
  res.send(`For orders received route parameter order ID: ${req.params.orderId}`);
});

// Access multiple route parameter using req.params
app.get('/books/:category/:title', (req, res) => {
  res.send(`For Books received route parameter category: ${req.params.category} and title ${req.params.title}`);

  // Alternative statement using object destructuring assignment
  // to extract nested properties
  // const {category, title} = req.params; 
  // res.send(`For Books received category: ${category} and title ${title}` );  

});

// Access multiple query parameters using req.params
app.get('/search', (req, res) => {
  res.send(`For search, retrieved query parameters : ${req.query.first} and ${req.query.second}`);

  // Alternative statement using object destructuring assignment
  // to extract nested properties
  // const {first, second} = req.query;
  // res.send(`Retrieved parameters : ${first} and ${second}`);

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

