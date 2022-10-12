import { contract, web3 } from "../index.js";

export function createButtonAction(isSender, login) {
  const div = document.createElement("div");
  const button = document.createElement("button");
  const input = document.createElement("input");
  if (isSender) {
    button.textContent = "Отменить";
    input.style.display = "none";

    button.addEventListener("click", () => {
      const id = button.closest("li").dataset.id;

      // try {
      console.log(contract.methods.cancel_transfer(id).send({ from: login }));
      // } catch (e) {
      //   console.log(e);
      // }
      alert("Вы успешно отменили перевод!");
      location.reload();
    });
  } else {
    button.textContent = "Принять";
    button.addEventListener("click", () => {
      const id = button.closest("li").dataset.id;
      console.log(id);

      console.log(
        contract.methods
          .accept_resipient(
            id,
            web3.utils.soliditySha3({
              type: "string",
              value: input.value,
            })
          )
          .send({ from: login })
      );
      alert("Вы успешно приняли перевод");
      location.reload();
    });
  }

  div.append(input);
  div.append(button);
  return div;
}
