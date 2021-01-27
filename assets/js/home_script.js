{
  let createPost = function () {
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: '/posts/new-post',
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $('#posts>ul').prepend(newPost);
          new Noty({
            theme: 'relax',
            text: 'Post Published',
            type: 'success',
            layout: 'topRight',
            timeout: 1500,
            progressBar: false,
          }).show();
          deletePost($(' .delete-post-btn', newPost));
          new ToggleLike($(' .toggle-like-btn', newPost));
        },
        error: function (err) {
          new Noty({
            theme: 'relax',
            text: error,
            type: 'error',
            layout: 'topRight',
            timeout: 1500,
            progressBar: false,
          }).show();
        },
      });
    });
  };

  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
      <p>
       
        <small>
          <a class="delete-post-btn" href="/posts/destroy/${post._id}">X</a>
        </small>
        ${post.content}
        <br />
        <small>${post.user.name}</small>
       
      </p>
      <div className="posts-comments">
       
        <form action="/comments/create" method="post">
          <input type="text" name="content" placeholder="type your comment" />
          <input type="hidden" name="post" value="${post._id}" />
          <input type="submit" value="Add Comment" />
        </form>
        <small>
        <a class = "toggle-like-btn" href="/likes/toggle/?id=${post._id}&type=Post">
    0 Likes</a
  >
        </small>
    
        <div class="post-comments-list">
          <ul id="posts-comments-${post._id}">
          </ul>
        </div>
      </div>
    </li>
    `);
  };

  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme: 'relax',
            text: 'Post Deleted',
            type: 'success',
            layout: 'topRight',
            timeout: 1500,
            progressBar: false,
          }).show();
        },
        error: function (error) {
          new Noty({
            theme: 'relax',
            text: error,
            type: 'error',
            layout: 'topRight',
            timeout: 1500,
            progressBar: false,
          }).show();
        },
      });
    });
  };

  let convertPostToAjax = function () {
    let deleteLinks = $('.delete-post-btn');
    for (deleteLink of deleteLinks) {
      deletePost(deleteLink);
    }
  };

  createPost();
  convertPostToAjax();
}
