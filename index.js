// Declare
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authorRoute = require("./routes/author");
const bookRoute = require("./routes/book");

dotenv.config();
// Connect database
mongoose.connect(process.env.NODE_MONGODB_URL, () => {
	console.log("Connected to MongoDB ...");
});

// Use
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(morgan("common"));

// Routes
app.use("/v1/author", authorRoute);
app.use("/v1/book", bookRoute);

app.listen("8000", () => {
	console.log(`
    ----------
    Server is running ...
    ----------
    `);
});
