const saveButtonHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-postid');

  // Collect values from the login form
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  if (title && content ) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
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
        document.location.replace(`/dashboard`);
      } 

    } else {
      alert(response.statusText);
    }
  }
};

const deleteButtonHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-postid');

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will delete your post, and will not be recoverable',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, cancel!',
    cancelButtonText: 'No, I will complete'
  })
  
  if (result.isConfirmed) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      
      const result = await Swal.fire({
        title: 'Congratulations!',
        text: 'You successfully deleted your Post!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Thank you!',
      })
      
      if (result.isConfirmed) {
        document.location.replace(`/dashboard`);
      } 

    } else {
      alert(response.statusText);
    }

  } else if (result.dismiss === Swal.DismissReason.cancel) {
    return
  }

};


document
  .querySelector('#update-post')
  .addEventListener('click', saveButtonHandler);

document
  .querySelector('#delete-post')
  .addEventListener('click', deleteButtonHandler);


