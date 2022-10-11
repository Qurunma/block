import { bodyApp } from "./libs/variables.js";
import { abi } from "./libs/abi.js";

const contractAddress = "0xddc8FAA7E289a74558b2195210CB8Ec358D4C78b";
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
  getAccounts();
  console.log(users);
});
bodyApp().append(button);

export { users, contract, web3 };
