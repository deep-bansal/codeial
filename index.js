const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(
  session({
    name: "codeial",
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
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
