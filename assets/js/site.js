// Shared behaviour for every page: theme toggle, mobile menu, image viewer.
(function () {
  var root = document.documentElement;

  // Theme: remember the visitor's choice; otherwise follow the system setting.
  function savedTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function saveTheme(value) {
    try { localStorage.setItem("theme", value); } catch (e) { /* storage blocked */ }
  }

  var theme = savedTheme();
  if (theme === "dark" || (!theme && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    root.classList.add("dark");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var dark = root.classList.toggle("dark");
        saveTheme(dark ? "dark" : "light");
      });
    }

    var menuBtn = document.getElementById("menu-btn");
    var menu = document.getElementById("mobile-menu");
    if (menuBtn && menu) {
      menuBtn.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    // Image viewer for the gallery page.
    var modal = document.getElementById("modal");
    if (modal) {
      var modalImg = modal.querySelector("img");
      document.querySelectorAll("[data-zoom]").forEach(function (img) {
        img.addEventListener("click", function () {
          modalImg.src = img.src;
          modalImg.alt = img.alt;
          modal.classList.add("open");
        });
      });
      modal.addEventListener("click", function (e) {
        if (e.target !== modalImg) modal.classList.remove("open");
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") modal.classList.remove("open");
      });
    }
  });
})();
