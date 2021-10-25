const editButton = document.querySelectorAll(".edit-button");
const sessionElem = document.querySelector('.session')



if(sessionElem.getAttribute('data-isloggedin') === 'true'){
  const userid = sessionElem.getAttribute('data-userid')
  
  const commentIcon = `
  <a href="#">
    <i class="fas fa-plus fa-2x new-comment"></i>
  </a>
  <p class="d-flex fs-4 text ps-2"> Add Comment</p>
  `
  $('#add-comment').append(commentIcon);

  // ITERATE OVER THE CLASS AND CONVERT DATE PROPERLY
  for (let i = 0; i < editButton.length; i++) {
    const commenterid = editButton[i].getAttribute('data-commenterid');
    const commentid = editButton[i].getAttribute('data-commentid');
    if(commenterid === userid){
      editIcon = `
      <a href="#">
        <i data-editid="${commentid}" class="edit-post far fa-edit fa-2x pb-2"></i>
      </a>`
      $(editButton[i]).append(editIcon)
    }
  }
} else {
  $('.divider').append('<p class="text-center text-secondary"> If you would like to leave a comment, please Login! </p>')
}

const editCommentHandler = (event) => {

  const commentId = event.target.getAttribute('data-editid');

  document.location.replace(`/comment/edit/${commentId}`);
}

const newCommentHandler = () => {

  const postId = document.querySelector('#post-title').getAttribute('data-postid');

  document.location.replace(`/comment/add/${postId}`);
}

$(document).ready(function () {

  $(document).on('click', '.edit-button', editCommentHandler)
  $(document).on('click', '.new-comment', newCommentHandler)

})

