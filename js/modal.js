const modalBtn = document.getElementById("modal-ac");
const modal = document.querySelector(".modal");
const modalKapat = document.getElementById("modal-kapat");
const modalVazgec = document.getElementById("vazgec");

modalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

modalKapat.addEventListener("click", () => {
  modal.style.display = "none";
});
modalVazgec.addEventListener("click", () => {
  modal.style.display = "none";
});
