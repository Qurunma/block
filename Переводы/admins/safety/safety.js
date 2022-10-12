import { bodyApp } from "../../libs/variables.js";
import { createDivForAdminSafety } from "../../modules/createDivForAdminSafety.js";

function createSafety() {
  const div = document.createElement("div");
  const h1 = document.createElement("h1");

  h1.textContent = "Необходимые безопасные переводы";

  console.log(createDivForAdminSafety());
  div.append(h1, createDivForAdminSafety());
  bodyApp().append(div);
}
createSafety();
