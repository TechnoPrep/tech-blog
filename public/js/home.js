const viewPostHandler = (event) => {

  const postId = event.target.getAttribute('data-postid');

  document.location.replace(`/post/${postId}`);
}

$(document).ready(function () {

  $(document).on('click', '.post-title', viewPostHandler)

})