const Post = require('../models/posts');
const Comment = require('../models/comment');
const Like = require('../models/like');
module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    if (req.xhr) {
      await post.populate('user').execPopulate();
      return res.status(200).json({
        data: {
          post: post,
        },
        message: 'Post created!',
      });
    }
    req.flash('success', 'Post Published!');
    return res.redirect('back');
  } catch (err) {
    console.log(err);
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      await Like.deleteMany({ likeable: post._id, onModel: 'Post' });
      await Like.deleteMany({ _id: { $in: post.comments } });
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: 'Post deleted',
        });
      }
      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.log(err);
  }
};
