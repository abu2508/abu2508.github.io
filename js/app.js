/* ==========================================================================
   ABDULLAH B — SITE BEHAVIOUR: theme, scroll reveal, scroll-spy
   ========================================================================== */

function updateThemeUI(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const sun = document.querySelector(".theme-icon-sun");
  const moon = document.querySelector(".theme-icon-moon");
  if (sun && moon) {
    // Show the icon of the theme you would switch to
    sun.style.display = theme === "light" ? "none" : "inline-block";
    moon.style.display = theme === "light" ? "inline-block" : "none";
  }
  const btn = document.getElementById("themeToggleBtn");
  if (btn) btn.setAttribute("aria-label", `Switch to ${theme === "light" ? "dark" : "light"} theme`);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#fafaf7" : "#0b0f17");
}

function togglePortfolioTheme() {
  const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  try { localStorage.setItem("portfolio-theme", next); } catch (e) { /* storage unavailable */ }
  updateThemeUI(next);
}

window.updateThemeUI = updateThemeUI;
window.togglePortfolioTheme = togglePortfolioTheme;

let appInitialised = false;

function initApp() {
  if (appInitialised) return;
  appInitialised = true;

  updateThemeUI(document.documentElement.getAttribute("data-theme") || "dark");
  const toggle = document.getElementById("themeToggleBtn");
  if (toggle) toggle.addEventListener("click", togglePortfolioTheme);

  // Scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -60px 0px", threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // Scroll-spy
  const links = document.querySelectorAll(".nav-link");
  const sections = Array.from(document.querySelectorAll("section[id]"));
  let ticking = false;
  function spy() {
    ticking = false;
    let current = sections[0] ? sections[0].id : "top";
    sections.forEach((s) => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
    links.forEach((l) => {
      const on = l.getAttribute("href") === `#${current}`;
      l.classList.toggle("active", on);
      if (on) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(spy); }
  }, { passive: true });
  spy();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
