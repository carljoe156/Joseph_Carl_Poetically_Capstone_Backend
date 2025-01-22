const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectionWithDB = require("./connection/DB");
const bookRoute = require("./routes/bookRoute");
const poemRoute = require("./routes/poemRoute");
// const seedRoute = require("./routes/seedRoute");
const postRoute = require("./routes/postRoute");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const cors = require("cors");

dotenv.config();

const app = express();

// Our port number
const PORT = process.env.PORT || 5000;

// Our Middlewares
// app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: ["http://localhost:5173"], // our origins frontend and backend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allow cookies or headers like authorization
  })
);

// Middleware Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Our Connection to MongoDB
connectionWithDB();

// Our Routes
// app.use("/api/v1/seed", seedRoute);
app.use("/api/v1", bookRoute);
app.use("/api/v1", poemRoute);
app.use("/api/v1", postRoute);

// Routes for my checking routes
app.get("/", (req, res) => {
  res.send(
    "<h1>P3 API</h1><ol><li>Books - /api/v1/books</li><li>Poems - /api/v1/poems</li><li>Posts - /api/v1/posts</li></ol>"
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
