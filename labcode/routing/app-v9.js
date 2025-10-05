const express = require('express')
const app = express()
const path = require('path');


// Serve static files from an existing directory public
// Files served can be images, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve additional static files from 'assets' using a virtual path prefix
// This virtual path prefix does not actually exist on the file system
app.use('/static', express.static(path.join(__dirname, 'assets')));

// 3️⃣ Basic route that returns an HTML page that uses the static files
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Static Files Demo</title>
      <!-- CSS from /public/css/styles.css -->
      <link rel="stylesheet" href="/css/styles.css">
    </head>
    <body>
      <h1>Express Static Files Demo</h1>


      <h3>What a cute cat !!!</h3>
      <!-- Image from /public/images/cat.jpg -->
      <img src="/images/cat.jpg" alt="Logo" width="200">

      <!-- JS from /public/js/script.js -->
      <script src="/js/script.js"></script>

      <!-- JS from /assets/extra.js (served via /static) -->
      <script src="/static/extra.js"></script>
    </body>
    </html>
  `);
});


const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

