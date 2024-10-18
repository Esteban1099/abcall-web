const express = require("express");
const path = require("path");
const axios = require("axios"); // Use axios for HTTP requests

const app = express();
app.use(express.json()); // Parse JSON request bodies

// Serve static files from the Angular app's locale-specific build folder
app.use(express.static(path.join(__dirname, "dist/abcall-web/browser/es-CO")));

// Serve static files correctly, without duplicating "es-CO" in the path
app.get(
  /.*\.(js|css|png|jpg|svg|woff2|woff|ttf|eot|ico)$/,
  function (req, res) {
    // Remove the '/es-CO' prefix from the requested path, if present
    const filePath = req.path.replace("/es-CO", "");
    res.sendFile(
      path.join(__dirname, "dist/abcall-web/browser/es-CO", filePath)
    );
  }
);

// For all other routes, serve the Angular app's index.html
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "dist/abcall-web/browser/es-CO/index.html")
  );
});

// Proxy API requests (adjust paths as needed)
app.use("/auth/clients/token", async (req, res) => {
  try {
    const targetUrl =
      "http://abcall-load-balancer-1563043008.us-east-1.elb.amazonaws.com/auth/clients/token";
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: { "Content-Type": "application/json" },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error forwarding request:", error.message);
    res
      .status(error.response?.status || 500)
      .json({
        message: error.response?.data?.message || "Error forwarding request",
      });
  }
});

app.use("/auth/agents/token", async (req, res) => {
  try {
    const targetUrl =
      "http://abcall-load-balancer-1563043008.us-east-1.elb.amazonaws.com/auth/agents/token";
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: { "Content-Type": "application/json" },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error forwarding request:", error.message);
    res
      .status(error.response?.status || 500)
      .json({
        message: error.response?.data?.message || "Error forwarding request",
      });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("Server running on port " + PORT);
});
