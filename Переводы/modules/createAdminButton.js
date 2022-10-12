export function createAdminButton() {
  const a = document.createElement("a");
  a.textContent = "Админ-панель";
  a.href = "http://127.0.0.1:5500/admins/admins.html";
  return a;
}
