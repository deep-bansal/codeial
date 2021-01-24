const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/codeial_development-two");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to mongoose"));

db.once("open", function () {
  console.log("Connected to db");
});

module.exports = db;
