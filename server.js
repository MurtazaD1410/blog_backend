const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
// const path = require("path");

// dotenv.config({ path: `${__dirname}/.env` });

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use("/uploads", express.static("uploads"));

// ~ middleware
app.use(express.json());

// ~ connect to mongodb

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected to MongoDB");
});

// app.use(express.static(path.join(__dirname, "../client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// ~ routes
app.use("/api/blog", require("./routes/blog"));
app.use("/api/user", require("./routes/user"));

// ~ start server
app.listen(process.env.PORT || 8000, () => {
  console.log("Backend server is running!");
});
