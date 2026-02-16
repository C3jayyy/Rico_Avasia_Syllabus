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

$(function () {
  let userArray = [];

  $("#save").on("click", function (event) {
    event.preventDefault(); // ✅

    const firstname = $("#first-name").val();
    const lastname = $("#last-name").val();

    if (!firstname || !lastname) return;

    userArray.push([firstname, lastname]);

    $("#first-name, #last-name").val("");
  });

  $("#print-btn").on("click", function () {
    const $output = $("#print-values");

    if (!userArray.length) {
      $output.text("No data input yet");
      return;
    }

    let html = "";
    $.each(userArray, function (i, user) {
      html += `User ${i + 1}: ${user[0]} ${user[1]}<br>`;
    });

    $output.html(html);

    console.log("Users:", userArray)
  });
});
