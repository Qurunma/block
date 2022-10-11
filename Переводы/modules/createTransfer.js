import { contract, web3 } from "../index.js";

export function createTransfer(
  login,
  recipient,
  value,
  category,
  isSafety,
  code_word
) {
  const errors = [];
  if (recipient == "-- Выберите получателя --") errors.push(182);

  if (value <= 0 || value.trim() == "" || !Number(value)) errors.push(268);

  if (category == 0) errors.push(664);

  if (code_word.trim() == "") errors.push(883);

  if (errors.length > 0) return errors;

  console.log(value);

  contract.methods
    .people_transfer(
      recipient,
      String(value * 10 ** 18),
      category,
      isSafety,
      web3.utils.soliditySha3({
        type: "string",
        value: code_word,
      })
    )
    .send({
      from: login,
      value: String(value * 10 ** 18),
      gas: 1000000,
    });

  return 0;
}
