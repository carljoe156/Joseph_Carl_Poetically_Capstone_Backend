const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectionWithDB = require("./connection/DB");

dotenv.config();

const app = express();

// Our port number
const port = process.env.PORT || 5000;

// Our Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// Our Connection to MongoDB
connectionWithDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
