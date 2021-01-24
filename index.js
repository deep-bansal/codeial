const express = require("express");
const app = express();
const port = 8000;
const path = require("path");

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
    return;
  }
  console.log(`Server up and running on ${port}`);
});
