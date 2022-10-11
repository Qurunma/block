import { contract } from "../index.js";
import { createButtonAction } from "./createButtonAction.js";
import { categories } from "./createFormTransfer.js";

let transactions;

getHistory();

async function getHistory() {
  transactions = await contract.methods.view_transactions().call();
}

export function createHistory(login) {
  const div = document.createElement("div");
  const ul = document.createElement("ul");
  ul.style.listStyle = "none";
  ul.style.margin = "0";
  ul.style.padding = "0";
  ul.style.width = "fit-content";

  const indexes = [];

  transactions = transactions?.map((element, index) => {
    if (element.sender == login || element.resipient == login) {
      indexes.push(index);
      return element;
    }
  });

  transactions.forEach((element, index) => {
    if (element) {
      const li = document.createElement("li");
      li.style.border = "1px solid #000";
      li.style.marginTop = "20px";
      li.style.padding = "10px";

      const from = document.createElement("span");
      from.textContent = "От: " + element.sender;

      const to = document.createElement("span");
      to.textContent = "Кому: " + element.resipient;

      const sum = document.createElement("span");
      sum.textContent = "Сумма перевода: " + element.sum / 10 ** 18;

      const category = document.createElement("span");
      category.textContent =
        "Категория перевода: " + categories[element.category];

      const isFinished = document.createElement("span");
      isFinished.textContent = "Окончен: " + (element.end ? "Да" : "Нет");

      li.dataset.id = indexes[index];
      li.append(
        from,
        document.createElement("br"),
        to,
        document.createElement("br"),
        sum,
        document.createElement("br"),
        category,
        document.createElement("br"),
        isFinished,
        !element.end
          ? (document.createElement("br"),
            createButtonAction(element.sender == login, login))
          : ""
      );
      ul.append(li);
    }
  });
  div.append(ul);
  return div;
}
