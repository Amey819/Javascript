// get all div class selectors
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// send all 4 to the checkfield function

function checkField(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() == "") {
      showError(input, `${input.id} is required`);
    } else {
      showSuccess(input);
    }
  });
}
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkField([username, email, password, password2]);
  // check length
  checkLength(email, 10, 20);
  checkLength(password, 15, 25);
  // check email
  validateEmail(email);
  // match password
  passwordMatch(password, password2);
});

// onsubmit function

// onsuccess- onerror functions
function showError(input, message) {
  const parent = input.parentElement;
  parent.className = "form-control error";
  const small = parent.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const parent = input.parentElement;
  parent.className = "form-control success";
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value.trim())) {
    showSuccess(email);
  } else {
    showError(email, "Email is not Valid");
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${input.id} too small`);
  } else if (input.value.length > max) {
    showError(input, `${input.id} is too big`);
  } else {
    showSuccess(input);
  }
}

function passwordMatch(password1, password2) {
  if (password1.value != password2.value) {
    showError(password1, "Passwords do not match");
    showError(password2, "Passwords do not match");
  } else {
    showSuccess(password1);
    showSuccess(password2);
  }
}
