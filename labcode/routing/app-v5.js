const express = require('express')
const app = express()
const port = 3000

// Return plain text content
// Content-type response header: text/html; charset=utf-8
app.get('/', (req, res) => {
  res.send(`Home page`);
});

// Return HTML content
// Content-type response header: text/html; charset=utf-8
app.get('/gethtml', (req, res) => {
  res.send(`
    <body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
    </body>    
`);
});

// Return JSON content via a JavaScript object
// Content-type response header: application/json; charset=utf-8
app.get('/getjson', (req, res) => {
  person = {
    firstname: 'Peter',
    lastname: 'Parker',
    age: 34,
    married: false
  }
  res.send(person);
});


// Return XML content 
// Content-type response header: application/xml; charset=utf-8
app.get('/getxml', (req, res) => {
  xmlMessage = `
<?xml version="1.0" encoding="UTF-8"?>
<library>
  <book id="bk101">
    <title>The Hitchhiker's Guide to the Galaxy</title>
    <author>Douglas Adams</author>
    <genre>Science Fiction</genre>
    <publication_year>1979</publication_year>
  </book>
</library>
`;
  // need to explicitly specify the type here
  res.type('application/xml')
  res.send(xmlMessage);
});



// Return a downloadable text file in the same directory as app.js
// Content-type response header: text/plain; charset=utf-8
// content-disposition response header: attachment; filename="sample.txt" 
app.get('/downloadtext', (req, res) => {
  console.log(`Downloading text file from current directory :  ${__dirname}`);
  res.download(__dirname + '/sample.txt');
});

// Render an image file in the same directory as app.js
// Content-type response header: image/jpeg
app.get('/renderimage', (req, res) => {
  console.log(`Rendering image file from current directory :  ${__dirname}`);
  res.sendFile(__dirname + '/cat.jpg');
});

// Download image file in the same directory as app.js
// Content-type response header: image/jpeg
// content-disposition response header: attachment; filename="cat.jpg" 
app.get('/downloadimage', (req, res) => {
  console.log(`Downloading image file from current directory :  ${__dirname}`);
  res.download(__dirname + '/cat.jpg');
});

// Render a PDF file from the same directory as app.js
// Content-type response header: application/pdf
app.get('/renderpdf', (req, res) => {
  // need to explicitly specify the type here
  res.type('application/pdf');
  console.log(`Rendering PDF file from current directory :  ${__dirname}`);
  res.sendFile(__dirname + '/words.pdf'); // must exist
});

// Download a PDF file from the same directory as app.js
// Content-type response header: application/pdf
// content-disposition response header: attachment; filename="words.pdf" 
app.get('/downloadpdf', (req, res) => {
  // need to explicitly specify the type here
  res.type('application/pdf');
  console.log(`Downloading PDF file from current directory :  ${__dirname}`);
  res.download(__dirname + '/words.pdf'); // must exist
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

