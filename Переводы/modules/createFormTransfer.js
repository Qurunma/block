import { contract, users } from "../index.js";
import { createTransfer } from "../modules/createTransfer.js";
import { createDivForSafety } from "../modules/createDivForSafety.js";
import { createSamplesForm } from "./createSamplesForm.js";

export let categories;

getCategories();

async function getCategories() {
  categories = await contract.methods
    .view_categories()
    .call()
    .then((data) => data);
}

export function createFormTransfer(login) {
  const mainDiv = document.createElement("div");
  mainDiv.style.display = "flex";

  const div = document.createElement("div");
  div.className = "form-transfer";
  div.style.display = "inline-grid";
  div.style.marginRight = "20px";

  const selectRecipient = document.createElement("select");
  selectRecipient.className = "select-recipinent";

  const optionForRecipient = document.createElement("option");
  optionForRecipient.textContent = "-- Выберите получателя --";
  selectRecipient.append(optionForRecipient);

  users.map((element) => {
    if (element.login != login) {
      const option = document.createElement("option");
      option.textContent = element.login;
      selectRecipient.append(option);
    }
  });

  const selectCategory = document.createElement("select");
  selectCategory.className = "select-category";

  const optionForCategory = document.createElement("option");
  optionForCategory.textContent = "-- Выберите категорию --";
  selectCategory.append(optionForCategory);

  categories.map((element) => {
    if (element.login != login) {
      const option = document.createElement("option");
      option.textContent = element;
      selectCategory.append(option);
    }
  });

  const inputValue = document.createElement("input");
  inputValue.className = "input-value";
  inputValue.placeholder = "Введите сумму перевода";

  const buttonSend = document.createElement("button");
  buttonSend.className = "button-send";
  buttonSend.textContent = "Отправить перевод";

  const inputCodeWord = document.createElement("input");
  inputCodeWord.type = "password";
  inputCodeWord.classList.add("input-code-word");
  inputCodeWord.placeholder = "Введите кодовое слово";

  const errorRecipient = document.createElement("span");
  errorRecipient.style.display = "none";
  errorRecipient.style.color = "red";
  errorRecipient.textContent = "Выберите получателя";

  const errorValue = document.createElement("span");
  errorValue.style.display = "none";
  errorValue.style.color = "red";
  errorValue.textContent = "Введите сумму перевода";
  const errorCategory = document.createElement("span");
  errorCategory.style.display = "none";
  errorCategory.style.color = "red";
  errorCategory.textContent = "Выберите категорию";
  const errorCodeWord = document.createElement("span");
  errorCodeWord.style.display = "none";
  errorCodeWord.style.color = "red";
  errorCodeWord.textContent = "Введите кодовое слово";
  buttonSend.addEventListener("click", () => {
    const errors = createTransfer(
      login,
      selectRecipient.selectedOptions[0].value,
      inputValue.value,
      selectCategory.selectedIndex,
      document.querySelector("#is-safety").checked,
      inputCodeWord.value
    );
    console.log();
    if (errors !== 0) {
      console.log(errors);
      if (errors.includes(182)) {
        errorRecipient.style.display = "block";
      } else {
        errorRecipient.style.display = "none";
      }
      if (errors.includes(268)) {
        errorValue.style.display = "block";
      } else {
        errorValue.style.display = "none";
      }
      if (errors.includes(664)) {
        errorCategory.style.display = "block";
      } else {
        errorCategory.style.display = "none";
      }
      if (errors.includes(883)) {
        errorCodeWord.style.display = "block";
      } else {
        errorCodeWord.style.display = "none";
      }
    } else {
      alert("Перевод успешно создан!");
      location.reload();
    }
  });

  div.append(
    createDivForSafety(),
    errorRecipient,
    selectRecipient,
    errorCategory,
    selectCategory,
    errorValue,
    inputValue,
    errorCodeWord,
    inputCodeWord,
    buttonSend
  );
  mainDiv.append(div, createSamplesForm());
  return mainDiv;
}
