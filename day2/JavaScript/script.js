const form = document.querySelector("#signup");
const output = document.getElementById("#signUpOutput");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  const formObject = Object.fromEntries(formData.entries());

  document.getElementById("signUpOutput").innerHTML =
    "<h3>Submitted Data:</h3>";

  for (let key in formObject) {
    document.getElementById("signUpOutput").innerHTML +=
      `<p><strong>${key}:</strong> ${formObject[key]}</p>`;
  }

  console.log(formObject);
});

function validateForm() {
  const fullName = document.getElementById("fname").value.trim();
  const nickname = document.getElementById("nname").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const username = document.getElementById("uname").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const password = document.getElementById("psw").value.trim();

  const fullNameError = document.getElementById("full-name-error");
  const nicknameError = document.getElementById("nickname-error");
  const emailError = document.getElementById("email-error");
  const addressError = document.getElementById("address-error");
  const usernameError = document.getElementById("username-error");
  const contactError = document.getElementById("contact-error");
  const passwordError = document.getElementById("password-error");

  fullNameError.textContent = "";
  nicknameError.textContent = "";
  emailError.textContent = "";
  addressError.textContent = "";
  usernameError.textContent = "";
  contactError.textContent = "";
  passwordError.textContent = "";

  let isValid = true;

  if (fullName === " ") {
    fullNameError.textContent = "Please enter your full name";
    isValid = false;
  } else if (/\d/.test(fullName)) {
    fullNameError.textContent = "Please enter a valid full name";
    isValid = false;
  }

  if (nickname === " " || /\d/.test(nickname)) {
    nicknameError.textContent = "Please enter valid nickname";
    isValid = false;
  }

  if (email === " " || !email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Please enter valid email";
    isValid = false;
  }

  if (address === " ") {
    addressError.textContent = "Please enter your address";
    isValid = false;
  }

  if (username === " ") {
    usernameError.textContent = "Please enter a username";
    isValid = false;
  }

  if (contact === " " || contact.length < 6) {
    contactError.textContent = "Please enter a valid contact number";
    isValid = false;
  }

  if (password === " " || password.length < 6) {
    passwordError.textContent = "Please enter a valid password";
    isValid = false;
  }

  if (isValid) {
    alert("Form submitted successfully!");
    return true;
  } else {
    return false;
  }
}

function resetErrors() {
  document.getElementById("fullname-error").textContent = "";
  document.getElementById("nickname-error").textContent = "";
  document.getElementById("email-error").textContent = "";
  document.getElementById("address-error").textContent = "";
  document.getElementById("contact-error").textContent = "";
  document.getElementById("password-error").textContent = "";
}

var fullNameArr = [];
var nicknameArr = [];
var emailArr = [];
var addressArr = [];
var contactArr = [];
var passwordArr = [];

//Save form inputs into an Array

/**function saveInputs() {
  var fullNameInput = document.getElementById("fname").value;
  var nicknameInput = document.getElementById("nname").value;
  var emailInput = document.getElementById("email").value;
  var addressInput = document.getElementById("address").value;
  var contactInput = document.getElementById("contact").value;
  var passwordInput = document.getElementById("psw").value;

  fullNameArr.push(fullNameInput);
  nicknameArr.push(nicknameInput);
  emailArr.push(emailInput);
  addressArr.push(addressInput);
  contactArr.push(contactInput);
  passwordArr.push(passwordInput);

  console.log({
    fullNameArr,
    nicknameArr,
    emailArr,
    addressArr,
    contactArr,
    passwordArr,
  });
}**/

document.getElementById("signup").addEventListener("submit", function (event) {
  const form = event.target;
  const formElements = form.elements;
  const userArray = [];

  for (let i = 0; i < formElements.length; i++) {
    if (formElements[i].type !== "submit") {
      userArray.push(formElements[i].value);
    }
  }

  console.log(userArray);
});
