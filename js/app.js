/* ==========================================================================
   ABDULLAH B (ABU) — MAIN APPLICATION & NAVIGATION ORCHESTRATOR
   ========================================================================== */

function updateThemeUI(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const sunIcon = document.querySelector(".theme-icon-sun");
  const moonIcon = document.querySelector(".theme-icon-moon");

  if (sunIcon && moonIcon) {
    if (theme === "light") {
      sunIcon.style.display = "none";
      moonIcon.style.display = "inline-block";
    } else {
      sunIcon.style.display = "inline-block";
      moonIcon.style.display = "none";
    }
  }
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute("aria-label", `Switch to ${theme === "light" ? "dark" : "light"} theme`);
  }
  if (typeof window.setThreeSceneTheme === "function") {
    window.setThreeSceneTheme(theme);
  }
}

function togglePortfolioTheme() {
  const current = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  localStorage.setItem("portfolio-theme", current);
  updateThemeUI(current);
}

window.updateThemeUI = updateThemeUI;
window.togglePortfolioTheme = togglePortfolioTheme;

// --------------------------------------------------------------------------
// LIQUID GLASS MOUSE CURSOR & SHEEN TRACKING ENGINE
// --------------------------------------------------------------------------
let mousePos = { x: -100, y: -100 };
let followerPos = { x: -100, y: -100 };

document.addEventListener("mousemove", (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
});

function animateLiquidCursor() {
  const cursorDot = document.getElementById("liquid-cursor-dot");
  const cursorFollower = document.getElementById("liquid-cursor-follower");

  if (cursorDot && cursorFollower) {
    cursorDot.style.transform = `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`;

    followerPos.x += (mousePos.x - followerPos.x) * 0.18;
    followerPos.y += (mousePos.y - followerPos.y) * 0.18;

    cursorFollower.style.transform = `translate3d(${followerPos.x}px, ${followerPos.y}px, 0)`;
  }
  requestAnimationFrame(animateLiquidCursor);
}
requestAnimationFrame(animateLiquidCursor);

// Hover state delegation for liquid glass follower scale-up
document.addEventListener("mouseover", (e) => {
  if (e.target.closest("a, button, .glass-card, .project-product-card, .tech-group-card, .bento-card, .stat-glass-card, .tech-chip, .tech-badge-chip, .monogram-sculpture-wrap")) {
    document.body.classList.add("cursor-hover");
  }
});

document.addEventListener("mouseout", (e) => {
  if (e.target.closest("a, button, .glass-card, .project-product-card, .tech-group-card, .bento-card, .stat-glass-card, .tech-chip, .tech-badge-chip, .monogram-sculpture-wrap")) {
    document.body.classList.remove("cursor-hover");
  }
});

function initApp() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const initialTheme = document.documentElement.getAttribute("data-theme") || "dark";
  updateThemeUI(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.onclick = (e) => {
      e.preventDefault();
      togglePortfolioTheme();
    };
  }

  // 1. Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll(".cinematic-reveal");
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px",
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // Immediate visibility fallback for Hero elements
  document.querySelectorAll("#hero .cinematic-reveal").forEach(el => {
    el.classList.add("is-visible");
  });

  // 2. Active Scroll Spy for Navbar Capsule Links
  const navLinks = document.querySelectorAll(".nav-capsule-link");
  const sections = document.querySelectorAll("section[id], header[id]");

  window.addEventListener("scroll", () => {
    let current = "hero";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // 3. Brand Logo Smooth Scroll-to-Top
  const brandLogo = document.querySelector(".nav-brand-logo");
  if (brandLogo) {
    brandLogo.addEventListener("click", (e) => {
      e.preventDefault();
      const hero = document.getElementById("hero");
      if (hero) {
        hero.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  // 4. Hero Monogram Interactive 3D Parallax Tilt
  const heroMonogram = document.getElementById("heroMonogramSculpture");
  const heroSection = document.getElementById("hero");
  if (heroMonogram && heroSection) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 16;
      heroMonogram.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    heroSection.addEventListener("mouseleave", () => {
      heroMonogram.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  }

  // 5. Dynamic Apple Liquid Glass Card Sheen & 3D Tilt
  const glassCards = document.querySelectorAll(".project-product-card, .tech-group-card, .bento-card, .stat-glass-card, .glass-card");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;

  glassCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--card-mouse-x", `${x}px`);
      card.style.setProperty("--card-mouse-y", `${y}px`);

      if (!prefersReducedMotion && isFinePointer) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)";
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
window.addEventListener("load", initApp);
