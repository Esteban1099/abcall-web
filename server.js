const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the locale-specific build folder
app.use(express.static(path.join(__dirname, "dist/abcall-web/browser/es-CO")));

// Serve static files for requests that match JS, CSS, and other static resources
app.get(/.*\.(js|css|png|jpg|svg|woff2|woff|ttf|eot|ico)$/, function (req, res) {
  res.sendFile(path.join(__dirname, "dist/abcall-web/browser/es-CO", req.path));
});

// For all other routes, serve the Angular app's index.html
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/abcall-web/browser/es-CO/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("Server running on port " + PORT);
});
