export function createButtonOut() {
  const button = document.createElement("button");

  button.textContent = "Выйти из аккаунта";

  button.addEventListener("click", () => {
    localStorage.removeItem("login");
    location.href = "http://127.0.0.1:5500/index.html";
  });
  return button;
}
