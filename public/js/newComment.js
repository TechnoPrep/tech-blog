const saveButtonHandler = async (event) => {
  event.preventDefault();

  const postId = event.target.getAttribute('data-postid');

  // Collect values from the login form
  const comment = document.querySelector('#comment').value.trim();

  if (comment) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      body: JSON.stringify({ comment, postId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      
      const result = await Swal.fire({
        title: 'Congratulations!',
        text: 'You successfully updated your Post!',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Thank you!',
      })
      
      if (result.isConfirmed) {
        document.location.replace(`/post/${postId}`);
      } 

    } else {
      alert(response.statusText);
    }
  }
};

const cancelButtonHandler = async (event) => {
  event.preventDefault();

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will not save your post, and it will not be recoverable',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, cancel!',
    cancelButtonText: 'No, I will complete'
  })
  
  if (result.isConfirmed) {

    document.location.replace(`/dashboard`);

  } else if (result.dismiss === Swal.DismissReason.cancel) {
    return
  }

};


document
  .querySelector('#add-comment')
  .addEventListener('click', saveButtonHandler);

document
  .querySelector('#cancel-comment')
  .addEventListener('click', cancelButtonHandler);


