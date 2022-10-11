import { web3 } from "../index.js";

const bodyApp = () => {
  return document.querySelector(".App");
};
const login = () => {
  return document.querySelector(".login").value;
};
const password = () => {
  return web3.utils.soliditySha3({
    type: "string",
    value: document.querySelector(".password").value,
  });
};

export { bodyApp, login, password };
