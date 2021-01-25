const Posts = require("../models/posts");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie("user_id", 25);
  // Posts.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "Home",
  //     posts: posts,
  //   });
  // });
  Posts.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      return res.render("home", {
        title: "Home",
        posts: posts,
      });
    });
};
