import { users, contract } from "../index.js";
import { login, password } from "../libs/variables.js";

document.querySelector(".button-register")?.addEventListener("click", () => {
  register();
});

function register() {
  let isExists = false;

  const loginValue = login();
  const passwordValue = password();

  try {
    if (loginValue == "" || passwordValue == "") {
      alert("Все поля должны быть заполнены");
      return;
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].login == loginValue) {
        isExists = true;
      }
    }

    if (isExists) {
      alert("Вы уже зарегистрированы");
      return;
    }
    contract.methods
      .register(loginValue, passwordValue)
      .send({ from: loginValue });
    alert("Вы успешно зарегистрированы");
    localStorage.setItem("login", JSON.stringify(loginValue));
    location.href = "../home/home.html";
  } catch (e) {
    if (
      e.message ==
      "Provided address " +
        loginValue +
        " is invalid, the capitalization checksum test failed, or it's an indirect IBAN address which can't be converted."
    ) {
      alert("Неверный логин");
    } else {
      console.log(e);
    }
  }
}
