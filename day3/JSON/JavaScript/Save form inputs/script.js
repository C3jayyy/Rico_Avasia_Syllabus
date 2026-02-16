/*
document.addEventListener("DOMContentLoaded", function () {
  event.preventDefault();
  const form = document.getElementById("print");
  let userArray = [];

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formElements = form.elements;
    let values = [];

    for (let i = 0; i < formElements.length; i++) {
      if (formElements[i].type !== "submit") {
        values.push(formElements[i].value);
      }
    }

    userArray.push(values);
  });

  document.getElementById("print-btn").addEventListener("click", function () {
    if (userArray.length > 0) {
      let html = "";
      userArray.forEach((user, i) => {
        html += `User: ${i + 1} ${user[0]} ${user[1]}<br>`;

        document.getElementById("print-values").innerHTML = html;
      });
    } else {
      document.getElementById("print-values").textContent =
        `No data input yet.`;
    }
  });
  console.log({ userArray });
}); */

let userArray = [];

function saveUser(firstname, lastname) {
  let values = [firstname, lastname];

  userArray.push(values);
}

saveUser();

function printUser() {
  const output = document.getElementById("print-values");
  if (userArray.length === 0) {
    output.textContent = "No data input yet";
    return;
  }

  let html = "";
  userArray.forEach((user, i) => {
    html += html += `User: ${i + 1} ${user[0]} ${user[1]}<br>`;
  });

  output.innerHTML = html;
}

const user = saveUser("Carl Jayson", "Rico");
document.getElementById("print-values").textContent = `name is ${userArray} years`;
