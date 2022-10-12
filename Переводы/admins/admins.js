import { users } from "../index.js";
import { bodyApp } from "../libs/variables.js";

setTimeout(checkRoots, 120);
function createAdminPanel() {
  const div = document.createElement("div");
  const hrefs = [
    {
      text: "Создание категории",
      href: "http://127.0.0.1:5500/admins/categories/categories.html",
    },
    {
      text: "Создание шаблона",
      href: "http://127.0.0.1:5500/admins/samples/samples.html",
    },
    {
      text: "Безопасные переводы",
      href: "http://127.0.0.1:5500/admins/safety/safety.html",
    },
    {
      text: "Голосования",
      href: "http://127.0.0.1:5500/admins/votes/votes.html",
    },
  ];
  hrefs.forEach((element) => {
    const a = document.createElement("a");
    a.textContent = element.text;
    a.href = element.href;
    div.append(a);
    div.append(document.createElement("br"));
  });
  bodyApp().append(div);
}
createAdminPanel();

function checkRoots() {
  const login = JSON.parse(localStorage.getItem("login"));
  console.log(users);
  for (let i = 0; i < users.length; i++) {
    if (login == users[i].login) {
      if (users[i].role != 0) {
        alert("КУДА МЫ ЛЕЗЕМ");
        location.href = "http://127.0.0.1:5500/home/home.html";
      }
      break;
    }
  }
}
