import { burger } from "../functions/burger";
import TransferElements from "transfer-elements";
import GraphModal from "graph-modal";
import GraphTabs from "graph-tabs";
import { disableScroll } from "../functions/disable-scroll";
import { enableScroll } from "../functions/enable-scroll";
// Создание модалього окна
const modal = new GraphModal();
const tabsElem = document.querySelector("[data-tabs]");
if (tabsElem) {
  const tabs = new GraphTabs("cours-tabs");
}

// Добавление элемента при уменьшении экрана в другой элемент
new TransferElements({
  sourceElement: document.querySelector(".autorization"),
  breakpoints: {
    726: {
      targetElement: document.querySelector(".nav"),
      targetPosition: 1,
    },
  },
});

if (document.querySelector(".rate")) {
  new TransferElements({
    sourceElement: document.querySelector(".rate"),
    breakpoints: {
      1200: {
        targetElement: document.querySelector(".rec-bonus"),
        targetPosition: 1,
      },
    },
  });
}

// Выпадающее меню
const nav = document.querySelector(".nav");
nav.addEventListener("click", (el) => {
  if (el.target.classList.contains("nav__item--dropdown"))
    el.target.classList.toggle("active-dropdown");
});

function observeDropdown() {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const dropdowns = document.querySelector(".nav__item--dropdown");
        if (dropdowns.length > 0) {
          nav.addEventListener("click", (el) => {
            if (el.target.classList.contains("nav__item--dropdown"))
              el.target.classList.toggle("active-dropdown");
          });
          observer.disconnect();
          break;
        }
      }
    }
  });
  const config = { childList: true, subtree: true };
  observer.observe(document.querySelector(".nav"), config);
}

observeDropdown();

// Создание кнопки Закрыть или удалить в таблице Какой я
function addButtonsToCells() {
  let btnDelete = `
   <button class="btn-reset delete-btn">
      <svg
        width="11"
        height="12"
        viewBox="0 0 11 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.33728 6.09485L0.83728 1.59485M5.33728 6.09485L9.83728 10.5948M5.33728 6.09485L9.83728 1.59485M5.33728 6.09485L0.83728 10.5948"
          stroke="#D165BC"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  `;
  const cells = document.querySelectorAll(".results-table td");
  cells.forEach((cell) => {
    if (cell.textContent.trim() !== "") {
      cell.innerHTML += btnDelete;
    }
  });
}
window.addEventListener("load", addButtonsToCells);

// подстраивание строки под размер текста textarea
document.querySelectorAll(".reference-table__textarea")?.forEach((textarea) => {
  textarea.addEventListener("input", function () {
    this.style.height = "";
    this.style.height = this.scrollHeight + "px";
  });
});

// Запрещается все, кроме цифр в инпут
document.querySelectorAll(".input-no-text").forEach((el) => {
  el.addEventListener("keydown", function (event) {
    if (
      event.keyCode == 46 ||
      event.keyCode == 8 ||
      event.keyCode == 9 ||
      event.keyCode == 27 ||
      event.keyCode == 190 ||
      (event.keyCode == 65 && event.ctrlKey === true) ||
      (event.keyCode >= 35 && event.keyCode <= 39)
    ) {
      return;
    } else {
      if (
        (event.keyCode < 48 || event.keyCode > 57) &&
        (event.keyCode < 96 || event.keyCode > 105)
      ) {
        event.preventDefault();
      }
    }
  });
});

const input = document.querySelectorAll(".reference-table__input-num");
input.forEach((el) => {
  el.addEventListener("input", (elem) => {
    let value = elem.currentTarget.value;

    if (value.length > 1 && value.startsWith("0")) {
      value = value.replace(/^0+/, "");
    }

    let numberValue = parseInt(value, 10);

    if (numberValue > 10) {
      elem.currentTarget.value = 10;
    } else if (numberValue < 0 || isNaN(numberValue)) {
      elem.currentTarget.value = 0;
    } else {
      elem.currentTarget.value = numberValue;
    }
  });
});

// Ошибка если в форме не будет записаны данные
const form = document.querySelector(".form");
let errorLogin = `
  <span class="error-text">Необходимо заполнить "Логин"</span>
`;
let errorPass = `
  <span class="error-text">Необходимо заполнить "Пароль"</span>
`;

form?.addEventListener("submit", function (event) {
  document.querySelector(".form-login").classList.remove("error-value");
  document.querySelector(".form-password").classList.remove("error-value");
  document
    .querySelectorAll(".form__label")
    .forEach((el) => el.querySelector(".error-text")?.remove());
  const username = document.querySelector(".form__input-login").value.trim();
  const password = document.querySelector(".form__input-pass").value.trim();
  if (!username) {
    document.querySelector(".form-login").classList.add("error-value");
    document.querySelector(".form-login").innerHTML += errorLogin;
    event.preventDefault();
  }
  if (!password) {
    document.querySelector(".form-password").classList.add("error-value");
    document.querySelector(".form-password").innerHTML += errorPass;
    event.preventDefault();
  }

  document.querySelectorAll(".form__input").forEach((el) => {
    el.addEventListener("input", (elem) => {
      elem.currentTarget
        .closest(".form__label")
        .classList.remove("error-value");
      elem.currentTarget
        .closest(".form__label")
        .querySelector(".error-text")
        ?.remove();
    });
  });
});
