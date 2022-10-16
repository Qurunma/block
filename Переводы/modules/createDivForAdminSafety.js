import { contract } from "../index.js";

let transactions;

getHistory();

async function getHistory() {
  transactions = await contract.methods.view_transactions().call();
}

let categories;

getCategories();

async function getCategories() {
  categories = await contract.methods
    .view_categories()
    .call()
    .then((data) => data);
}

export function createDivForAdminSafety() {
  const login = JSON.parse(localStorage.getItem("login"));

  const div = document.createElement("div");
  const ul = document.createElement("ul");

  div.style.overflowY = "scroll";
  ul.style.listStyle = "none";
  ul.style.margin = "0";
  ul.style.padding = "0";
  ul.style.width = "fit-content";

  setTimeout(() => {
    transactions.forEach((element, index) => {
      if (element && element.safe_transact && !element.admin_answer) {
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

        const divButtons = document.createElement("div");

        const buttonAccept = document.createElement("button");

        buttonAccept.textContent = "Подтвердить";

        buttonAccept.addEventListener("click", () => {
          console.log(
            contract.methods
              .check_safe_transact(li.dataset.id, true)
              .send({ from: login })
          );
          location.reload();
        });
        const buttonDecline = document.createElement("button");

        buttonDecline.textContent = "Отклонить";

        buttonDecline.addEventListener("click", () => {
          console.log(
            contract.methods
              .check_safe_transact(li.dataset.id, false)
              .send({ from: login })
          );
          location.reload();
        });

        divButtons.append(buttonAccept, buttonDecline);

        li.dataset.id = index;
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
          document.createElement("br"),
          divButtons
        );
        ul.append(li);
      }
    });
    div.append(ul);
    console.log(div);
  }, 600);
  return div;
}
