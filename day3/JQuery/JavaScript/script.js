$(function () {
  // Arrays to store inputs
  let fullNameArr = [];
  let nicknameArr = [];
  let emailArr = [];
  let addressArr = [];
  let contactArr = [];
  let passwordArr = [];

  // Handle form submit
  $("#signup").on("submit", function (event) {
    event.preventDefault(); // Stop page refresh

    // Validate form
    if (!validateForm()) return;

    // Get form values
    const fullName = $("#fname").val().trim();
    const nickname = $("#nname").val().trim();
    const email = $("#email").val().trim();
    const address = $("#address").val().trim();
    const username = $("#uname").val().trim();
    const contact = $("#contact").val().trim();
    const password = $("#psw").val().trim();

    // Save inputs to arrays
    fullNameArr.push(fullName);
    nicknameArr.push(nickname);
    emailArr.push(email);
    addressArr.push(address);
    contactArr.push(contact);
    passwordArr.push(password);

    // Show submitted data in the page
    const $output = $("#signUpOutput");
    $output.html("<h3>Submitted Data:</h3>");
    $output.append(`<p><strong>Full Name:</strong> ${fullName}</p>`);
    $output.append(`<p><strong>Nickname:</strong> ${nickname}</p>`);
    $output.append(`<p><strong>Email:</strong> ${email}</p>`);
    $output.append(`<p><strong>Address:</strong> ${address}</p>`);
    $output.append(`<p><strong>Username:</strong> ${username}</p>`);
    $output.append(`<p><strong>Contact:</strong> ${contact}</p>`);
    $output.append(`<p><strong>Password:</strong> ${password}</p>`);

    // Log all arrays to console
    console.log({
      fullNameArr,
      nicknameArr,
      emailArr,
      addressArr,
      contactArr,
      passwordArr,
    });

    // Optional: reset form
    this.reset();
  });

  // Validate form function
  function validateForm() {
    let isValid = true;

    const fullName = $("#fname").val().trim();
    const nickname = $("#nname").val().trim();
    const email = $("#email").val().trim();
    const address = $("#address").val().trim();
    const username = $("#uname").val().trim();
    const contact = $("#contact").val().trim();
    const password = $("#psw").val().trim();

    // Clear previous errors
    $(".error").text("");

    // Full name
    if (fullName === "" || /\d/.test(fullName)) {
      $("#full-name-error").text("Please enter a valid full name");
      isValid = false;
    }

    // Nickname
    if (nickname === "" || /\d/.test(nickname)) {
      $("#nickname-error").text("Please enter a valid nickname");
      isValid = false;
    }

    // Email
    if (email === "" || !email.includes("@") || !email.includes(".")) {
      $("#email-error").text("Please enter valid email");
      isValid = false;
    }

    // Address
    if (address === "") {
      $("#address-error").text("Please enter your address");
      isValid = false;
    }

    // Username
    if (username === "") {
      $("#username-error").text("Please enter a username");
      isValid = false;
    }

    // Contact
    if (contact === "" || contact.length < 6) {
      $("#contact-error").text("Please enter a valid contact number");
      isValid = false;
    }

    // Password
    if (password === "" || password.length < 6) {
      $("#password-error").text("Please enter a valid password");
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully!");
    }

    return isValid;
  }
});
