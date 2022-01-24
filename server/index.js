const path = require("path");
const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT || 8080;
const app = express();

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Path to API routes on router
app.use("/api", require("./api/index"));

// Static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// Sends index.html and public files
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// Error handling endware
app.use((err, req, res) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
