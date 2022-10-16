import { bodyApp } from "./libs/variables.js";
import { abi } from "./libs/abi.js";

const contractAddress = "0xc42E021982970B3B3CE52406c405Ec07A42BbD72";
let web3, contract, users;

function network() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  contract = new web3.eth.Contract(abi, contractAddress);
}
network();
getAccounts();

async function getAccounts() {
  users = await contract.methods
    .view_users()
    .call({ gas: 0 })
    .then((data) => data);
  const accounts = await web3.eth.getAccounts().then((data) => data);
  console.log(accounts);
  accounts.forEach((element) => {
    web3.eth.personal.unlockAccount(element, "", 0);
  });
}

const button = document.createElement("button");
button.addEventListener("click", () => {
  console.log(users);
});
bodyApp().append(button);

if (
  localStorage.getItem("login") &&
  (location.href == "http://127.0.0.1:5500/" ||
    location.href == "http://127.0.0.1:5500/index.html")
) {
  location.href = "http://127.0.0.1:5500/home/home.html";
}
export { users, contract, web3 };
