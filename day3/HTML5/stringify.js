const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("storage");

const object = {
  firstname: "Carl Jayson",
  lastname: "Rico",
};

const array = ["Carl", "Rico", 21];

const stringifiedObject = JSON.stringify(object);
const stringifiedArray = JSON.stringify(array);

localStorage.setItem("object", stringifiedObject);
localStorage.setItem("array", stringifiedArray);

const objectFromStorage = localStorage.getItem("object");
const arrayFromStorage = localStorage.getItem("array");

const objectParsed = JSON.parse(objectFromStorage);
const arrayParsed = JSON.parse(arrayFromStorage);

const objectremovedFromStorage = localStorage.removeItem("lastname");
const arrayremovedFromStorage = localStorage.removeItem("lastname");
