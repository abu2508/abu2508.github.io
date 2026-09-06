/* ==========================================================================
   ABDULLAH B (ABU) — CINEMATIC CAMERA TRANSITION ENGINE
   Interpolation & Scroll-Linked 3D Camera System
   ========================================================================== */

// Target Camera Positions for Page Sections
const CAMERA_SECTIONS_CONFIG = {
  "hero": { pos: { x: 0, y: 0, z: 18 }, lookAt: { x: 0, y: 0, z: 0 } },
  "about": { pos: { x: -3, y: -25, z: 16 }, lookAt: { x: 0, y: -25, z: -5 } },
  "experience": { pos: { x: 4, y: -45, z: 17 }, lookAt: { x: 0, y: -45, z: 0 } },
  "projects": { pos: { x: 0, y: -65, z: 20 }, lookAt: { x: 0, y: -65, z: 0 } },
  "skills": { pos: { x: -2, y: -80, z: 15 }, lookAt: { x: 0, y: -80, z: -8 } },
  "contact": { pos: { x: 0, y: -95, z: 14 }, lookAt: { x: 0, y: -95, z: -3 } }
};

let currentSectionKey = "hero";
let currentCamPos = { x: 0, y: 0, z: 18 };
let targetCamPos = { x: 0, y: 0, z: 18 };
let currentCamLook = { x: 0, y: 0, z: 0 };
let targetCamLook = { x: 0, y: 0, z: 0 };

function transitionCameraToSection(sectionId) {
  const config = CAMERA_SECTIONS_CONFIG[sectionId];
  if (!config) return;

  currentSectionKey = sectionId;
  targetCamPos = { ...config.pos };
  targetCamLook = { ...config.lookAt };
}

function updateCameraPosition() {
  if (!camera) return;

  // Damping Lerp for Camera Movement (0.04 factor gives ~600ms smooth easing)
  const lerpFactor = 0.04;

  currentCamPos.x += (targetCamPos.x - currentCamPos.x) * lerpFactor;
  currentCamPos.y += (targetCamPos.y - currentCamPos.y) * lerpFactor;
  currentCamPos.z += (targetCamPos.z - currentCamPos.z) * lerpFactor;

  currentCamLook.x += (targetCamLook.x - currentCamLook.x) * lerpFactor;
  currentCamLook.y += (targetCamLook.y - currentCamLook.y) * lerpFactor;
  currentCamLook.z += (targetCamLook.z - currentCamLook.z) * lerpFactor;

  camera.position.set(currentCamPos.x, currentCamPos.y, currentCamPos.z);
  camera.lookAt(currentCamLook.x, currentCamLook.y, currentCamLook.z);
}

// Scroll Observer to Trigger 3D Camera Section Shifts
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id], header[id]");

  const observerOptions = {
    root: null,
    rootMargin: "-40% 0px -40% 0px",
    threshold: 0
  };

  const cameraSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        if (id && CAMERA_SECTIONS_CONFIG[id]) {
          transitionCameraToSection(id);
        }
      }
    });
  }, observerOptions);

  sections.forEach((sec) => cameraSectionObserver.observe(sec));
});
