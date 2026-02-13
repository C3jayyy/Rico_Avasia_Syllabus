const form = document.querySelector("#signup");
const output = document.getElementById("signUpOutput");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  const formObject = Object.fromEntries(formData.entries());

  output.innerHTML = "<h3>Submitted Data:</h3>";

  for (let key in formObject) {
    output.innerHTML += `<p><strong>${key}:</stronog> ${formObject[key]}</p>`;
  }

  function validateForm(){
    let x = document.forms["signup"]["fname"].value;
    if (x == ""){
      alert("Name must be filled out");
      return false;
    }

  }

  return validateForm();
  console.log(formObject);
});
