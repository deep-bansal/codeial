const Comment = require('../models/comment');
const Post = require('../models/posts');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
      comment = await comment.populate('user').execPopulate();
      commentsMailer.newComment(comment);
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: 'comment Created',
        });
      }
      return res.redirect('back');
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.destroy = async function (req, res) {
  let comment = await Comment.findById(req.params.id).populate('post').exec();
  if (comment.user == req.user.id || req.user.id == comment.post.user) {
    let postId = comment.post;
    comment.remove();
    let post = await Post.findByIdAndUpdate(postId, {
      $pull: { comments: req.params.id },
    });

    if (req.xhr) {
      return res.status(200).json({
        data: {
          comment_id: req.params.id,
        },
        message: 'Comment Deleted',
      });
    }
    return res.redirect('back');
  } else {
    return res.redirect('back');
  }
};
