// Imports
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/dbConfig");

// define port with fallback to 4000
const port = process.env.PORT || 4000;

// Connect to database - console will log whether successful
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/issues", require("./routes/issueRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`.yellow.bold);
});
