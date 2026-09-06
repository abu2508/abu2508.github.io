/* ==========================================================================
   ABDULLAH B (ABU) — CONTACT UTILITY & TOAST NOTIFICATIONS
   ========================================================================== */

function copyEmailToClipboard(emailStr = "abdullahathu2@gmail.com") {
  navigator.clipboard.writeText(emailStr).then(() => {
    showToastNotification("Email copied: " + emailStr);
  }).catch(err => {
    console.error("Failed to copy email: ", err);
  });
}

function showToastNotification(message) {
  let toast = document.getElementById("toastNotification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotification";
    toast.style.cssText = `
      position: fixed;
      bottom: 28px;
      right: 28px;
      background: var(--bg-surface-elevated);
      color: var(--accent-cyan);
      border: 1px solid var(--border-glass-bright);
      padding: 14px 28px;
      border-radius: var(--radius-capsule);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      box-shadow: var(--shadow-card), var(--glow-cyan);
      z-index: 3000;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      transform: translateY(20px);
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
  }, 3200);
}
