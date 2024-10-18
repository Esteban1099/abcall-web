const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the Angular app (locale-specific)
app.use(express.static(__dirname + "/dist/abcall-web/browser/es-CO"));

// Serve index.html for any route that is not a static file
app.get('/*', (req, res) => {
  const allowedExtensions = ['.js', '.css', '.png', '.jpg', '.svg', '.woff', '.woff2', '.ttf', '.eot', '.ico'];
  if (allowedExtensions.some(ext => req.url.endsWith(ext))) {
    res.sendFile(path.join(__dirname, '/dist/abcall-web/browser/es-CO', req.url));
  } else {
    res.sendFile(path.join(__dirname + '/dist/abcall-web/browser/es-CO/index.html'));
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("Server running on port " + PORT);
});
