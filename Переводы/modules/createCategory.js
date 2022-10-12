import { contract } from "../index.js";

export function createCategory(category) {
  const login = JSON.parse(localStorage.getItem("login"));
  if (category == "") return 182;

  //try catch
  console.log(contract.methods.createCategory(category).send({ from: login }));

  return 0;
}
