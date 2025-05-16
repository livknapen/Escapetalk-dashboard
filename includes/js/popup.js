let scrollPosition = 0;

function openModal(modal) {
  scrollPosition = window.scrollY || document.documentElement.scrollTop;

  // Bepaal scrollbarbreedte
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  // Vergrendel body en compenseer voor scrollbar
  document.body.classList.add("modal-open");
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.paddingRight = `${scrollbarWidth}px`;

  modal.classList.add("visible");
}

function closeModal(modal) {
  modal.classList.remove("visible");
  document.body.classList.remove("modal-open");

  // Herstel scroll en layout
  const scrollY = parseInt(document.body.style.top || "0") * -1;
  document.body.style.top = "";
  document.body.style.paddingRight = "";

  // Scroll terug
  window.scrollTo(0, scrollY);
}

// Open knop
document.querySelectorAll(".open-modal-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalId = btn.dataset.modal; // ← haalt het juiste ID op
    const modal = document.getElementById(modalId);
    if (modal) {
      openModal(modal);
    } else {
      console.warn("Geen bijbehorende modal gevonden voor knop:", btn);
    }
  });
});


// Sluit via x
document.querySelectorAll(".popup-modal .close").forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    const modal = closeBtn.closest(".popup-modal");
    closeModal(modal);
  });
});

// Sluit bij klik buiten popup
window.addEventListener("click", (e) => {
  document.querySelectorAll(".popup-modal.visible").forEach((modal) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});
