import { bodyApp } from "../variables.js";
import { contract, web3 } from "../index.js";

async function home() {
  const login = JSON.parse(localStorage.getItem("login"));
  console.log(login);
  let acc = await web3.eth.getBalance(login).then((data) => data);
  let info = document.createElement("div");
  info.className = "infoAccount";
  let body = bodyApp();
  body.append(info);
  let accountAddress = document.createElement("span");
  accountAddress.className = "accountAddress";
  accountAddress.textContent = "Аккаунт: " + login;
  let accountBalance = document.createElement("span");
  accountBalance.className = "accountBalance";
  accountBalance.textContent = "Баланс в eth: " + acc;
  info.append(accountAddress);
  info.append(accountBalance);
}
home();

export { home };
