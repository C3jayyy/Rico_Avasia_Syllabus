function calculateAge(month, day, year) {
  const birthDateValue = document.getElementById("birthday").value;

  //const birthDate = new Date(birthDateValue);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

const age = calculateAge(5, 29, 2004);
document.getElementById("currentAge").textContent = `Your age is ${age} years`;
