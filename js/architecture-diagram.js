/* ==========================================================================
   ABDULLAH B — INTERACTIVE ARCHITECTURE MATRIX & DECISION TREE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Responsible AI Decision Tree Interactivity
  const raiStepCards = document.querySelectorAll(".rai-step-card");
  raiStepCards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("glow-active");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("glow-active");
    });
  });

  // Architecture Layer Interactivity
  const archRows = document.querySelectorAll(".arch-layer-row");
  archRows.forEach(row => {
    row.addEventListener("mouseenter", () => {
      row.style.borderColor = "var(--accent-cyan)";
      row.style.boxShadow = "var(--glow-cyan)";
    });
    row.addEventListener("mouseleave", () => {
      row.style.borderColor = "var(--border-subtle)";
      row.style.boxShadow = "none";
    });
  });
});
