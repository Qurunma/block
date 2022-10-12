import { bodyApp } from "./libs/variables.js";
import { abi } from "./libs/abi.js";

const contractAddress = "0x787026CF60b395a415bE211dE23eE5d3B22fcA92";
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
    .call()
    .then((data) => data);
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

console.log(users);
