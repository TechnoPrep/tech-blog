const postInfo = document.querySelectorAll('.post-info');
  
// ITERATE OVER THE CLASS AND CONVERT DATE PROPERLY
for (let i = 0; i < postInfo.length; i++) {
  const date = postInfo[i].getAttribute('data-date').split(' ')
  const month = date[1]
  const day = date[2]
  const year = date[3]
  if(postInfo[i].hasAttribute('data-user')){
     const user = postInfo[i].getAttribute('data-user');
     postInfo[i].innerHTML = `Created by ${user} on ${month}. ${day}, ${year}`
  } else {
    postInfo[i].innerHTML = `Created on ${month}. ${day}, ${year}`
  }
}

const homeButtonHandler = async (event) => {
    document.location.replace(`/`);
}

const dashboardButtonHandler = async (event) => {
  document.location.replace(`/dashboard`);
}

const loginButtonHandler = async (event) => {
  document.location.replace(`/login`);
}

const signupButtonHandler = async (event) => {
  document.location.replace(`/signup`);
}

document
  .querySelector('#home-header')
  .addEventListener('click', homeButtonHandler);

document
  .querySelector('#home-footer')
  .addEventListener('click', homeButtonHandler);

document
  .querySelector('#dashboard-header')
  .addEventListener('click', dashboardButtonHandler);

document
  .querySelector('#dashboard-footer')
  .addEventListener('click', dashboardButtonHandler);
  
document
  .querySelector('#login')
  .addEventListener('click', loginButtonHandler);

if(document.querySelector('#signin')){
  document
    .querySelector('#signin')
    .addEventListener('click', loginButtonHandler);
}

document
  .querySelector('#signup')
  .addEventListener('click', signupButtonHandler);

if(document.querySelector('#create')){
  document
    .querySelector('#create')
    .addEventListener('click', signupButtonHandler);
}
