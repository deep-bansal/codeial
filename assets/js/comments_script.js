{
  let createComment = function () {
    let newCommentForm = $('#new-comment-form');
    newCommentForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: '/comments/create',
        data: newCommentForm.serialize(),
        success: function (data) {
          console.log(data);
          let newComment = newCommentDom(data.data.comment);
          $('#post-comments-list>ul').append(newComment);
          deleteComment($(' .delete-comment-btn', newComment));
          new ToggleLike($(' .toggle-like-btn', newComment));
        },

        error: function (err) {
          console.log(err);
        },
      });
    });
  };

  let newCommentDom = function (comment) {
    return $(`<li id = "comment-${comment._id}">
      <p>
        <small>
          <a class="delete-comment-btn" href="/comments/destroy/<%=comment.id%>">X</a>
        </small>
    
        ${comment.content}
        <br />
        <small>${comment.user.name} </small>
      </p>
      <small>
        <a class = "toggle-like-btn" href="/likes/toggle/?id=${comment._id}&type=Comment">
    0 Likes</a
  >
        </small>
    </li>
    `);
  };

  let deleteComment = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();
        },
        error: function (err) {
          console.log(err);
        },
      });
    });
  };

  let convertToAjx = function () {
    let deleteLinks = $('.delete-comment-btn');
    for (deleteLink of deleteLinks) {
      deleteComment(deleteLink);
    }
  };
  createComment();
  convertToAjx();
}
