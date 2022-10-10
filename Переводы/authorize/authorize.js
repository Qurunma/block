import { users, contract, web3 } from "../index.js";
import { bodyApp, login, password } from "../variables.js";
// import { home } from "../home.js";s

document.querySelector(".button-authorize").addEventListener("click", () => {
  authorize();
});

async function authorize() {
  let isExists = false;
  let isAutorized = false;

  if (login() == "" || password() == "") {
    alert("Все поля должон быть заполнены");
    return;
  }
  for (let i = 0; i < users.length; i++) {
    if (users[i].login == login() && users[i].password == password()) {
      alert("Вы успешно вошли");
      isExists = true;
      isAutorized = true;
      console.log(users[i].login);
      break;
    } else if (users[i].login == login() && users[i].password != password()) {
      alert("Вы ввели неверный пароль");
      isExists = true;
      return;
    }
  }
  if (!isExists) {
    alert("Вы не зарегистрированы");
    return;
  }
  if (isAutorized) {
    // home(login());
    localStorage.setItem("login", JSON.stringify(login()));
    location.href = "http://127.0.0.1:5500/home/home.html";
  }
}
