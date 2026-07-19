// MechMurph — minimal site JS
// Handles the mobile menu open/close. That's it, on purpose.

document.addEventListener("click", function (e) {
  const toggle = e.target.closest("[data-menu-toggle]");
  if (toggle) {
    const nav = document.getElementById("nav");
    if (nav) {
      const open = nav.classList.toggle("open");
      toggle.textContent = open ? "\u2715" : "\u2630"; // ✕ / ☰
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
  }
});
