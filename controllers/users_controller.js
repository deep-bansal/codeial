const User = require("../models/user");

module.exports.profile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);

    return res.render("user_profile", {
      title: "Profie Page",
      profile_user: user,
    });
  } catch (err) {
    console.log("error", err);
  }
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect(`/users/profile/${req.user.id}`);
  }
  return res.render("user_signup", {
    title: "Codeial | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect(`/users/profile/${req.user.id}`);
  }
  return res.render("user_signin", {
    title: "Codeial | Sign In",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    console.log(user);
    if (!user) {
      User.create(req.body, function (err, user) {
        return res.redirect("/users/signin");
      });
    }
  });
};

module.exports.createSession = function (req, res) {
  return res.redirect(`/users/profile/${req.user.id}`);
};
module.exports.signout = function (req, res) {
  res.clearCookie("codeial");
  return res.redirect("/");
};

module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      return res.redirect("back");
    });
  } else {
    return res.status(401).send("UNauthorized");
  }
};
