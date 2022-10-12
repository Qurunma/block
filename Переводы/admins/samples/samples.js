import { categories } from "../../modules/createFormTransfer.js";
import { bodyApp } from "../../libs/variables.js";
import { createSample } from "../../modules/createSamples.js";

function createSampleForm() {
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  const errorCategory = document.createElement("span");
  const select = document.createElement("select");
  const errorValue = document.createElement("span");
  const inputValue = document.createElement("input");
  const errorName = document.createElement("span");
  const inputName = document.createElement("input");
  const button = document.createElement("button");

  h1.textContent = "Создание шаблона";
  button.textContent = "Создать шаблон";
  inputName.placeholder = "Название";
  inputValue.placeholder = "Сумма";

  errorCategory.textContent = "Выберите категорию";
  errorName.textContent = "Введите имя";
  errorValue.textContent = "Введите корректную сумму";

  errorCategory.style.color = "red";
  errorName.style.color = "red";
  errorValue.style.color = "red";

  errorCategory.style.display = "none";
  errorName.style.display = "none";
  errorValue.style.display = "none";

  setTimeout(() => {
    console.log(categories);

    const optionForCategory = document.createElement("option");
    optionForCategory.textContent = "-- Выберите категорию --";
    select.append(optionForCategory);

    categories.forEach((element) => {
      const option = document.createElement("option");
      option.textContent = element;
      select.append(option);
    });

    button.addEventListener("click", () => {
      const errors = createSample(
        select.selectedIndex,
        inputName.value.trim(),
        inputValue.value.trim()
      );
      if (errors != 0) {
        if (errors.includes(356)) {
          errorCategory.style.display = "block";
        } else {
          errorCategory.style.display = "none";
        }
        if (errors.includes(245)) {
          errorName.style.display = "block";
        } else {
          errorName.style.display = "none";
        }
        if (errors.includes(212)) {
          errorValue.style.display = "block";
        } else {
          errorValue.style.display = "none";
        }
      }
    });

    bodyApp().append(div);
    div.append(
      h1,
      document.createElement("br"),
      errorCategory,
      select,
      document.createElement("br"),
      errorName,
      inputName,
      document.createElement("br"),
      errorValue,
      inputValue,
      document.createElement("br"),
      button
    );
  }, 600);
}

createSampleForm();
