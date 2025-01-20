const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectionWithDB = require("./connection/DB");
const cors = require("cors");

dotenv.config();

const app = express();

// Our port number
const port = process.env.PORT || 5000;

// Our Middlewares
// app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Our Connection to MongoDB
connectionWithDB();

// Our Routes
const bookRoute = require("./routes/bookRoute");
app.use("/api/v1", bookRoute);

// Routes for my checking routes
app.get("/", (req, res) => {
  res.send(
    "<h1>P3 API</h1><ol>endpoints: <br/><li> books - /api/v1</li> <li> </li> <li> </li> <ol>"
  );
});

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
