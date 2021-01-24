const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser());

//use express router
app.use("/", require("./routes"));
app.use(express.static("./assets"));

app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
    return;
  }
  console.log(`Server up and running on ${port}`);
});
