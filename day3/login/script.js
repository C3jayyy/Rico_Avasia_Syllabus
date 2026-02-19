const form = document.querySelector("#sign-up-form");
const output = document.getElementById("signUpOutput");
/** 
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
});*/

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

$(function () {
  saveInputs();
  function saveInputs() {
    $("#sign-up-form").on("submit", function (event) {
      event.preventDefault();

      const newUser = {
        fullname: $("#fullname").val().trim(),
        nickname: $("#nickname").val().trim(),
        username: $("#username").val().trim(),
        email: $("#email").val().trim(),
        address: $("#address").val().trim(),
        contact: $("#contact").val().trim(),
        password: $("#password").val().trim(),
        confirmPassword: $("#confirm-password").val().trim(),
      };

      if (newUser.password !== newUser.confirmPassword) {
        alert("Password do not match");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.some((u) => u.username === newUser.username)) {
        alert("Username already taken");
        return;
      }

      delete newUser.confirmPassword;
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! Please Login");
      window.location.href = "login.html";
    });
  }

  //Login
  $("#login-form").on("submit", function (event) {
    event.preventDefault();
    const username = $("#username").val().trim();
    const password = $("#password").val().trim();

    let users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((u) => u.username === username);

    if (user.password !== password) {
      alert("Incorrect password");
      return;
    } else if (!user) {
      alert("User not found!");
      return;
    } else {
      localStorage.setItem("currentUrser", JSON.stringify(user));
      alert("Login Successful");
      window.location.href = "index.html";
    }
  });
});
/**
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
}); **/
