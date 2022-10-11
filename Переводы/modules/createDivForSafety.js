export function createDivForSafety() {
  const divForSafety = document.createElement("div");

  const label = document.createElement("label");
  label.textContent = "Безопасный перевод";
  label.for = "is-safety";

  const isSafety = document.createElement("input");
  isSafety.type = "checkbox";
  isSafety.id = "is-safety";
  divForSafety.append(isSafety, label);
  return divForSafety;
}
