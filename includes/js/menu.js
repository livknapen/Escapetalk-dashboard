// Sidebar active link
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".sidebar a");
  const currentUrl = window.location.pathname;

  links.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    if (linkPath === currentUrl) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Toggle menu
const toggle = document.getElementById("menu-toggle");
const overlay = document.getElementById("overlay");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  overlay.classList.toggle("open");
});

overlay.addEventListener("click", () => {
  toggle.classList.remove("open");
  overlay.classList.remove("open");
});
