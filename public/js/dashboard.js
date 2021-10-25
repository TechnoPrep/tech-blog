const editButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-postid')) {

    const id = event.target.getAttribute('data-postid');

    
    document.location.replace(`/post/edit/${id}`);
  };
}

const newPostButtonHandler = async (event) => {
  console.log('I got here');
  document.location.replace(`/post/new`);
}


$(document).ready(function () {

  $(document).on('click', '.edit-post', editButtonHandler)

})

$(document).ready(function () {

  $(document).on('click', '.new-post', newPostButtonHandler)

})

$(document).ready(function () {

  $(document).on('click', '.signout', signoutButtonHandler)

})