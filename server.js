const express = require("express");
const path = require("path");
const axios = require("axios");
const { exec } = require("child_process");

const app = express();
app.use(express.json()); // Parse JSON request bodies

// Proxy API requests (define these first to prevent them from being caught by the wildcard route)
app.use("/api/auth/clients/token", async (req, res) => {
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
    res.status(error.response?.status || 500).json({
      error_code:
        error.response?.data?.error_code || "Error forwarding request",
      error_message:
        error.response?.data?.error_message || "Error forwarding request",
    });
  }
});

app.use("/api/auth/agents/token", async (req, res) => {
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
    res.status(error.response?.status || 500).json({
      error_code:
        error.response?.data?.error_code || "Error forwarding request",
      error_message:
        error.response?.data?.error_message || "Error forwarding request",
    });
  }
});

app.use(
  "/api/consumers/identification_type/:identification_type/identification_number/:identification_number",
  async (req, res) => {
    console.log("consumer details ---- entered");
    try {
      // Extract Authorization header from incoming request
      const authHeader = req.headers["authorization"];
      console.log("Authorization Header:", authHeader);

      const { identification_type, identification_number } = req.params;
      const targetUrl = `http://abcall-load-balancer-1563043008.us-east-1.elb.amazonaws.com/consumers/identification_type/${identification_type}/identification_number/${identification_number}`;

      const response = await axios({
        method: req.method,
        url: targetUrl,
        data: req.body,
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader, // Forward the Authorization header if it exists
        },
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error forwarding request:", error.message);
      res.status(error.response?.status || 500).json({
        error_code:
          error.response?.data?.error_code || "Error forwarding request",
        error_message:
          error.response?.data?.error_message || "Error forwarding request",
      });
    }
  }
);

app.use(
  "/api/companies/:companyId/consumers/:consumerId/pccs",
  async (req, res) => {
    try {
      // Extract Authorization header from incoming request
      const authHeader = req.headers["authorization"];
      console.log("Authorization Header:", authHeader);

      const { companyId, consumerId } = req.params;
      const targetUrl = `http://abcall-load-balancer-1563043008.us-east-1.elb.amazonaws.com/companies/${companyId}/consumers/${consumerId}/pccs`;

      const response = await axios({
        method: req.method,
        url: targetUrl,
        data: req.body,
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader, // Forward the Authorization header if it exists
        },
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error forwarding request:", error.message);
      res.status(error.response?.status || 500).json({
        error_code:
          error.response?.data?.error_code || "Error forwarding request",
        error_message:
          error.response?.data?.error_message || "Error forwarding request",
      });
    }
  }
);

app.use("/api/agents/pccs", async (req, res) => {
  try {
    // Extract Authorization header from incoming request
    const authHeader = req.headers["authorization"];
    console.log("Authorization Header:", authHeader);

    const targetUrl =
      "http://abcall-load-balancer-1563043008.us-east-1.elb.amazonaws.com/agents/pccs";

    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader, // Forward the Authorization header if it exists
      },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error forwarding request:", error.message);
    res.status(error.response?.status || 500).json({
      error_code:
        error.response?.data?.error_code || "Error forwarding request",
      error_message:
        error.response?.data?.error_message || "Error forwarding request",
    });
  }
});

// Serve static files from the Angular app's production build folder
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "dist/abcall-web/browser/es-CO"))
  );

  // Serve static files correctly, without duplicating "es-CO" in the path
  app.get(
    /.*\.(js|css|png|jpg|svg|woff2|woff|ttf|eot|ico)$/,
    function (req, res) {
      const filePath = req.path.replace("/es-CO", "");
      res.sendFile(
        path.join(__dirname, "dist/abcall-web/browser/es-CO", filePath)
      );
    }
  );

  // Fallback route to serve index.html for any other routes (this should come after API routes)
  app.get("/*", function (req, res) {
    res.sendFile(
      path.join(__dirname, "dist/abcall-web/browser/es-CO/index.html")
    );
  });
} else {
  // If in development mode, run `ng serve` automatically
  exec("ng serve", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Ng serve output: ${stdout}`);
  });
}

// Start the server on a dynamic port or default to 4200 for local development
const PORT = process.env.PORT || 4200;

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
