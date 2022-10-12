import { bodyApp } from "../libs/variables.js";
import { users, web3 } from "../index.js";
import { createFormTransfer } from "../modules/createFormTransfer.js";
import { createHistory } from "../modules/createHistory.js";
import { createButtonOut } from "../modules/createButtonOut.js";
import { createAdminButton } from "../modules/createAdminButton.js";

async function home() {
  const login = JSON.parse(localStorage.getItem("login"));
  const acc = await web3.eth.getBalance(login).then((data) => data);
  const info = document.createElement("div");
  info.className = "infoAccount";
  const body = bodyApp();
  body.append(info);
  let accountAddress = document.createElement("span");
  accountAddress.className = "accountAddress";
  accountAddress.textContent = "Аккаунт: " + login;

  let accountBalance = document.createElement("span");
  accountBalance.className = "accountBalance";
  accountBalance.textContent = "Баланс в eth: " + acc / 10 ** 18;
  info.append(accountAddress);
  info.append(document.createElement("br"));
  info.append(accountBalance);
  info.append(document.createElement("br"));
  info.append(document.createElement("br"));

  for (let i = 0; i < users.length; i++) {
    if (users[i].login == login) {
      if (users[i].role == 0) info.append(createAdminButton());
      break;
    }
  }

  body.append(createFormTransfer(login));
  body.append(createHistory(login));

  body.append(createButtonOut());
}

home();
