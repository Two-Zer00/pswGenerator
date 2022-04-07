import { getDate } from "./initialize.js";

let a, b, c; // type of characters used for password "a" for upper letter "b" for number and "c" for symbols.
let copyBtn = document.querySelectorAll("#clipboard,#copyBtn");
let clipboard = new ClipboardJS(copyBtn);
document.getElementById("date").textContent = getDate();
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "1234567890";
const symbols = "@%+!#$^?-_*&<>";

const passLenght = document.getElementById("lenght");
const upperCaseInput = document.getElementById("upperCase");
const numbersInput = document.getElementById("numbers");
const symbolsInput = document.getElementById("symbols");
const resetBtn = document.getElementById("reset");
const clipboardBtn = document.getElementById("clipboard");

const passContainer = document.getElementById("pass");

const buttons = document.getElementById("buttons");

const passLenghtContainer = document.getElementById("passlength");
passLenghtContainer.textContent = passLenght.value;

setPassword();

passLenght.addEventListener("input", () => {
  setPassword();
  passLenghtContainer.textContent = event.target.value;
});
upperCaseInput.addEventListener("change", () => {
  addToHistory(passContainer.textContent);
  setPassword();
});
numbersInput.addEventListener("change", () => {
  addToHistory(passContainer.textContent);
  setPassword();
});
passLenght.addEventListener("change", () => {
  addToHistory(passContainer.textContent);
});
symbolsInput.addEventListener("change", () => {
  addToHistory(passContainer.textContent);
  setPassword();
});
resetBtn.addEventListener("click", (event) => {
  event.target.classList.add("disabled");
  passContainer.classList.add(
    "animate__animated",
    "animate__pulse",
    "animate__faster"
  );
  event.preventDefault();
  addToHistory(passContainer.textContent);
  setPassword();
  setTimeout(() => {
    passContainer.classList.remove(
      "animate__animated",
      "animate__pulse",
      "animate__faster"
    );
    event.target.classList.remove("disabled");
  }, 800);
});
clipboardBtn.addEventListener("click", (event) => {
  event.preventDefault();
});
buttons.addEventListener("mouseenter", (event) => {
  //event.target.style.opacity = '1';
  event.target.classList.remove("opacityin");
  event.target.classList.add("opacityout");
});
buttons.addEventListener("mouseleave", (event) => {
  //event.target.style.opacity = '0.5';
  event.target.classList.remove("opacityout");
  event.target.classList.add("opacityin");
});

function generatePassword() {
  let lenght = passLenght.value;
  let password = "";
  let flags = checkFlags();
  for (let i = 0; i < lenght; i++) {
    let randomFunction = Math.floor(Math.random() * flags.length);
    switch (flags[randomFunction]) {
      case 1:
        a = true;
        password += getDifferentChar(password, 1);
        break;
      case 2:
        b = true;
        password += getDifferentChar(password, 2);
        break;
      case 3:
        c = true;
        password += getDifferentChar(password, 3);
        break;
      case 0:
        password += getDifferentChar(password, 0);
        break;
    }
  }
  return password;
}
function checkFlags() {
  let flags = [0];
  if (upperCaseInput.checked) {
    a = false;
    flags[flags.length] = 1;
  } else {
    a = undefined;
  }
  if (numbersInput.checked) {
    b = false;
    flags[flags.length] = 2;
  } else {
    b = undefined;
  }
  if (symbolsInput.checked) {
    c = false;
    flags[flags.length] = 3;
  } else {
    c = undefined;
  }
  return flags;
}
function getLowerCase() {
  return lowerCase[Math.floor(Math.random() * lowerCase.length)];
}
function getUpperCase() {
  return upperCase[Math.floor(Math.random() * upperCase.length)];
}
function getNumberCase() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}
function getSymbolCase() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}
function getDifferentChar(pass, fnc) {
  let result = 0;
  let letter = getByFunction(fnc);

  if (pass.length > 0) {
    result = pass.charCodeAt(pass.length - 1) - letter.charCodeAt(0);
    if (result >= -1 && result <= 1) {
      //console.warn(result,pass[pass.length-1],letter);
      while (result >= -1 && result <= 1) {
        letter = getByFunction(fnc);
        result = pass.charCodeAt(pass.length - 1) - letter.charCodeAt(0);
      }
    }
  }
  return letter;
}
function getByFunction(func) {
  switch (func) {
    case 1:
      return getUpperCase();
      break;
    case 2:
      return getNumberCase();
      break;
    case 3:
      return getSymbolCase();
      break;
    case 0:
      return getLowerCase();
      break;
  }
}
function setPassword() {
  let result = a === false || b === false || c === false;
  let pass;
  do {
    pass = generatePassword();
    result = a === false || b === false || c === false;
  } while (result);
  passContainer.textContent = pass;
}
function addToHistory(pass) {
  let history = document.getElementById("history");
  let element = document.createElement("p");
  element.textContent = pass;
  element.style.transform = "rotate(0)";
  element.classList.add(
    "m-0",
    "d-flex",
    "align-items-center",
    "justify-content-center"
  );
  element.style.height = "50px";
  let copyE = `${escapeHtml(
    pass
  )}<a href="javascript:void(0)" id="copyBtn" data-clipboard-text="${pass}" class="link-dark bi bi-clipboard mx-1 stretched-link"></a>`;
  element.innerHTML = copyE;
  history.insertBefore(element, document.getElementById("history").firstChild);
  copyBtn = document.querySelectorAll("#clipboard,#copyBtn");
  clipboard = new ClipboardJS(copyBtn);
  addNewListener(clipboard);
  history.scrollTop = 0;
}
function addNewListener(clipboard) {
  clipboard.on("success", function (e) {
    //console.log(e.trigger);
    let target = e.trigger;
    target.classList.remove("bi-clipboard");
    target.classList.add("bi-clipboard-check");
    setTimeout(() => {
      target.classList.remove("bi-clipboard-check");
      target.classList.add("bi-clipboard");
    }, 1000);
  });
  clipboard.on("error", function (e) {
    console.error(e);
    let target = e.trigger;
    target.classList.remove("bi-clipboard");
    target.classList.add("bi-clipboard-x");
    setTimeout(() => {
      target.classList.remove("bi-clipboard-x");
      target.classList.add("bi-clipboard");
    }, 1000);
  });
}
function escapeHtml(text) {
  var map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
