import { bodyApp } from "../../libs/variables.js";
import { createCategory } from "../../modules/createCategory.js";

function createFormCategory() {
  //   const login = JSON.parse(localStorage.getItem("login"));
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  const span = document.createElement("span");
  const input = document.createElement("input");
  const button = document.createElement("button");

  input.placeholder = "Название категории";
  button.textContent = "Создать категорию";
  h1.textContent = "Создание категории";
  span.style.display = "none";
  span.style.color = "red";

  button.addEventListener("click", () => {
    const error = createCategory(input.value.trim());
    if (error == 182) {
      span.textContent = "Введите название";
      span.style.display = "block";
    } else {
      span.style.display = "none";
    }
  });
  div.append(h1, span, input, button);

  bodyApp().append(div);
}
createFormCategory();
