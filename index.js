const express = require("express");
const app = express();
const port = 8000;

app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
    return;
  }
  console.log(`Server up and running on ${port}`);
});
