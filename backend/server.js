// Imports
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConfig");

// define port with fallback to 4000
const port = process.env.PORT || 4000;

// Connect to database - console will log whether successful
connectDB();
