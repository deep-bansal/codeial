const Posts = require('../models/posts');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie("user_id", 25);
  // Posts.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "Home",
  //     posts: posts,
  //   });
  // });
  try {
    let posts = await Posts.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user ',
        },
        populate: {
          path: 'likes',
        },
      })
      .populate('likes');
    let users = await User.find({});

    return res.render('home', {
      title: 'Home',
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log('Error', err);
    return;
  }
};
