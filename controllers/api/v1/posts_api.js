const Post = require('../../../models/posts');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user ',
      },
    });
  return res.status(200).json({
    message: 'Post Api',
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({ post: req.params.id });

      return res.json(200, {
        message: 'Post deleted successfully',
      });
    } else {
      return res.status(401).json({
        message: 'You can not Delete it ',
      });
    }
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};
