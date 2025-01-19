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

// Our Routes
const bookRoute = require("./routes/bookRoute");
app.use("/api/v1", bookRoute);

// default, catch-all route
app.get("/*", (req, res) => {
  res.redirect("/");
});

//Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("There was an issue on the server");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
