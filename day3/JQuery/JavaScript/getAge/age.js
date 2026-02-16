function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

$(function () {
  $("#age-form").on("submit", function (e) {
    e.preventDefault();

    const birthDateValue = $("#birthday").val();
    if (!birthDateValue) return;

    const age = calculateAge(new Date(birthDateValue));
    $("#current-age").text(`Your age is ${age} years`);
  });
});
