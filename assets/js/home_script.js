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
          console.log(data);
          let newPost = newPostDom(data.data.post);
          $('#posts>ul').prepend(newPost);
        },
        error: function (err) {
          console.log(error.responseText);
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
    
        <div class="post-comments-list">
          <ul id="posts-comments-${post._id}">
          </ul>
        </div>
      </div>
    </li>
    `);
  };

  createPost();
}
