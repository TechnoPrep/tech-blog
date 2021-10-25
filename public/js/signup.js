const createFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const display_name = document.querySelector('#display-name').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirmPassword = document.querySelector('#confirm-password').value.trim();
  const email = document.querySelector('#email').value.trim();

  const validName = await validateName(display_name)
  const passMatch = await validatePass(password, confirmPassword);
  const validEmail = await validateEmail(email);

  if(!validName){
    blankPass();
    return;
  }
  
  if(!validEmail){
    blankPass();
    return;
  } 

   if(!passMatch) {
    blankPass();
    document.querySelector('#password').focus();
    return;
  } 
    
  if (display_name && email && password ) {

    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ display_name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      const result = await Swal.fire({
        title: 'Account Already Exists:',
        text: 'Seems an account already exists with that email',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Create with different email',
      })

      if (result.isConfirmed) {
        document.querySelector('#email').focus();
        return;
      } 
    }
  }
};

/**
 * Validates that the Name fields are not blank
 * @param {STRING} name 
 * @returns {BOOLEAN}
 */
const validateName = async (name) => {

  if(name == ''){
    swal.fire("Please Enter your Name");
    document.querySelector('#display-name').focus();
    return false;
  }

  return true;
}

/**
 * Validates the Password field and length and Confirm Password fields match
 * @param {STRING} pass 
 * @param {STRING} confirmPass 
 * @returns {BOOLEAN}
 */
const validatePass = async (pass, confirmPass) => {

  if(pass === ''){
    swal.fire("Please Enter a Password");
    return false;
  }

  if(pass.length < 8){
    swal.fire("Password must be atleast 8 Characters");
    return false;
  }

  if(pass !== confirmPass) {
    swal.fire("Passwords do not match!");
    return false;
  } else {
    return true;
  }

}

/**
 * Validates the Email matches proper email formatting with RegEx
 * @param {STRING} email 
 * @returns {BOOLEAN}
 */
const validateEmail = async (email) => {

  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(!email.match(mailFormat)) {
    swal.fire("Please Enter a valid Email!");
     return false;
  } else {
    return true;
  }

}

/**
 * Blanks out the Password fields
 */
const blankPass = () => {
  document.querySelector('#password').value = ""
  document.querySelector('#confirm-password').value = ""
}

document
  .querySelector('#create-account')
  .addEventListener('click', createFormHandler);

