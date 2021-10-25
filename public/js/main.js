const postInfo = document.querySelectorAll(".post-info");

// ITERATE OVER THE CLASS AND CONVERT DATE PROPERLY
for (let i = 0; i < postInfo.length; i++) {
  const date = postInfo[i].getAttribute("data-date").split(" ");
  const month = date[1];
  const day = date[2];
  const year = date[3];
  if (postInfo[i].hasAttribute("data-user")) {
    const user = postInfo[i].getAttribute("data-user");
    postInfo[i].innerHTML = `Created by ${user} on ${month}. ${day}, ${year}`;
  } else {
    postInfo[i].innerHTML = `Created on ${month}. ${day}, ${year}`;
  }
}


//FUNCTIONS FOR EVENT LISTENERS
const homeButtonHandler = async (event) => {
  document.location.replace(`/`);
};

const dashboardButtonHandler = async (event) => {
  document.location.replace(`/dashboard`);
};

const loginButtonHandler = async (event) => {
  document.location.replace(`/login`);
};

const signupButtonHandler = async (event) => {
  document.location.replace(`/signup`);
};

const signoutButtonHandler = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

//EVENT LISTENERS
if(document.querySelector('.session')){

    const loginButton = document.querySelector('#login')
    const signupButton = document.querySelector('#signup')
    const signoutButton = document.querySelector('#signout')
    
    if(document.querySelector('.session').getAttribute('data-isloggedin') === 'true'){
      loginButton.classList.toggle("hidden");
      signupButton.classList.toggle("hidden");
      signoutButton.classList.toggle("visible")
    } else {
      loginButton.classList.toggle("visible");
      signupButton.classList.toggle("visible");
      signoutButton.classList.toggle("hidden")
    }

}

if (document.querySelector("#home-header")) {
  document
    .querySelector("#home-header")
    .addEventListener("click", homeButtonHandler);
}

if (document.querySelector("#home-footer")) {
  document
    .querySelector("#home-footer")
    .addEventListener("click", homeButtonHandler);
}

if (document.querySelector("#dashboard-header")) {
  document
    .querySelector("#dashboard-header")
    .addEventListener("click", dashboardButtonHandler);
}

if (document.querySelector("#dashboard-footer")) {
  document
    .querySelector("#dashboard-footer")
    .addEventListener("click", dashboardButtonHandler);
}

if (document.querySelector("#login")) {
  document
    .querySelector("#login")
    .addEventListener("click", loginButtonHandler);
}

if (document.querySelector("#signin")) {
  document
    .querySelector("#signin")
    .addEventListener("click", loginButtonHandler);
}

if (document.querySelector("#signup")) {
  document
    .querySelector("#signup")
    .addEventListener("click", signupButtonHandler);
}

if (document.querySelector("#create")) {
  document
    .querySelector("#create")
    .addEventListener("click", signupButtonHandler);
}

if(document.querySelector('#signout')){
  document
  .querySelector("#signout")
  .addEventListener("click", signoutButtonHandler);
}
