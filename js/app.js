/* ==========================================================================
   ABDULLAH B (ABU) — MAIN APPLICATION & NAVIGATION ORCHESTRATOR
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
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

  // 4. 3D Card Perspective Tilt Micro-Interactions (Fine Pointer / Mouse Only)
  const cards3D = document.querySelectorAll(".project-product-card, .experience-panel, .tech-group-card");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;

  if (!prefersReducedMotion && isFinePointer) {
    cards3D.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });
  }
});
