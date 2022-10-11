import { contract } from "../index.js";

let samples;

getSamples();

async function getSamples() {
  samples = await contract.methods.view_samples().call();
}

export function createSamplesForm() {
  const div = document.createElement("div");
  const span = document.createElement("span");
  const select = document.createElement("select");

  //   div.style.display = "";
  span.textContent = "Или выберите шаблон";
  const option = document.createElement("option");
  option.textContent = "-- Выберите шаблон --";
  select.append(option);

  samples.map((element) => {
    const option = document.createElement("option");
    option.textContent = `${element.name_sample}, ${element.sum}`;
    select.append(option);
  });

  select.addEventListener("input", () => {
    document.querySelector(".input-value").value =
      samples[select.selectedIndex - 1].sum;
    document.querySelector(".select-category").selectedIndex =
      Number(samples[select.selectedIndex - 1].category_id) + 1;
  });
  div.append(span, select);
  return div;
}
