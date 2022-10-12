import { contract } from "../index.js";

export function createSample(category, name, value) {
  const login = JSON.parse(localStorage.getItem("login"));

  const errors = [];

  if (category == 0) errors.push(356);
  if (name == "") errors.push(245);
  if (value == "" || value <= 0) errors.push(212);

  if (errors.length > 0) return errors;

  //try catch
  console.log(
    contract.methods
      .createSamples(category, name, value)
      .send({ from: login, gas: 300000 })
  );

  return 0;
}
