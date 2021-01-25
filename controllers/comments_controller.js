const Comment = require("../models/comment");
const Post = require("../models/posts");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);

    if (post !== undefined) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
    }
    return res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};

module.exports.destroy = async function (req, res) {
  let comment = await Comment.findById(req.params.id).populate("post");

  if (comment.user == req.user.id || req.user.id == comment.post.user) {
    let postId = comment.post;
    comment.remove();
    let post = await Post.findByIdAndUpdate(postId, {
      $pull: { comments: req.params.id },
    });
    return res.redirect("back");
  } else {
    return res.redirect("back");
  }
};
