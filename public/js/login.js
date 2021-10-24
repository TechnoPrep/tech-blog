const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if(email === '' || password === ''){
    swal.fire('Please enter your Email and Password')
    document.querySelector("#email-login").classList.add('is-danger');
    document.querySelector("#password-login").classList.add('is-danger');
  }

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      swal.fire("Incorrect email or password, please try again");
      document.querySelector("#email-login").classList.add('is-danger');
      document.querySelector("#password-login").classList.add('is-danger');
      document.querySelector('#password-login').value = ""
    }
  }
};

document
  .querySelector('#login-button')
  .addEventListener('click', loginFormHandler);
