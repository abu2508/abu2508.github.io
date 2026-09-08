/* ==========================================================================
   ABDULLAH B — THREE.JS WEBGL SCENE ENGINE (TWILIGHT STUDIO)
   Smoked Charcoal Fog Depth (0x10141E), Neutral Daylight + Cool Blue Lighting
   ========================================================================== */

let scene, camera, renderer;
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
let clock = new THREE.Clock();
let animationFrameId = null;
let isRenderingActive = true;

// Global 3D Object Handles
window.heroArtifactGroup = null;
window.aboutArtifactGroup = null;
window.contactArtifactGroup = null;
window.spatialTechGroup = null;

function initThreeScene() {
  const container = document.getElementById("webgl-canvas");
  if (!container) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Create Scene & Twilight Fog
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x10141E, 0.016);

  // 2. Create Perspective Camera
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
  camera.position.set(0, 0, 18);

  // 3. Create WebGL Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: container,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // 4. Studio Lighting Setup (65% Dark + 35% Daylight Balance)
  const ambientLight = new THREE.AmbientLight(0xf8fafc, 0.85);
  scene.add(ambientLight);

  // Key Studio Directional Light (Warm Off-White)
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
  keyLight.position.set(12, 18, 15);
  scene.add(keyLight);

  // Fill Light (Soft Smoked Gray)
  const fillLight = new THREE.DirectionalLight(0xcbd5e1, 0.9);
  fillLight.position.set(-12, -10, -8);
  scene.add(fillLight);

  // Subtle Cool Blue Rim Light
  const rimLight = new THREE.PointLight(0x38bdf8, 2.5, 30);
  rimLight.position.set(6, 4, 6);
  scene.add(rimLight);

  window.ambientLight = ambientLight;
  window.keyLight = keyLight;
  window.fillLight = fillLight;
  window.rimLight = rimLight;

  // 5. Build 3D Geometries & Monogram Sculpture
  if (typeof build3DObjects === "function") {
    build3DObjects(scene);
  }

  // 6. Event Listeners
  window.addEventListener("resize", onWindowResize);
  document.addEventListener("mousemove", onMouseMove);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      isRenderingActive = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else {
      if (!prefersReducedMotion && !isRenderingActive) {
        isRenderingActive = true;
        clock.start();
        animateThreeScene();
      }
    }
  });

  // 7. Start Render Loop if Reduced Motion is disabled
  if (prefersReducedMotion) {
    renderer.render(scene, camera);
  } else {
    animateThreeScene();
  }
}

function onMouseMove(event) {
  targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2;
}

function onWindowResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (!isRenderingActive) {
    renderer.render(scene, camera);
  }
}

function animateThreeScene() {
  if (!isRenderingActive) return;

  animationFrameId = requestAnimationFrame(animateThreeScene);

  const elapsedTime = clock.getElapsedTime();

  // Smooth Mouse Parallax Damping
  mouseX += (targetMouseX - mouseX) * 0.05;
  mouseY += (targetMouseY - mouseY) * 0.05;

  // Rotate Hero Metallic Monogram Sculpture
  if (window.heroArtifactGroup) {
    const isMobile = window.innerWidth <= 992;
    if (isMobile) {
      window.heroArtifactGroup.position.x = 0;
      window.heroArtifactGroup.position.y = -1.2;
      window.heroArtifactGroup.scale.set(0.75, 0.75, 0.75);
    } else {
      const targetX = window.innerWidth < 1400 ? 2.8 : 3.6;
      window.heroArtifactGroup.position.x = targetX;
      window.heroArtifactGroup.position.y = Math.sin(elapsedTime * 0.7) * 0.25;
      window.heroArtifactGroup.scale.set(1.1, 1.1, 1.1);
    }
    window.heroArtifactGroup.rotation.y = elapsedTime * 0.18 + mouseX * 0.35;
    window.heroArtifactGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.08 + mouseY * 0.25;
  }

  // Orbit Tech Nodes around the "A" Monogram
  if (window.orbitingTechNodesGroup) {
    window.orbitingTechNodesGroup.rotation.y = elapsedTime * 0.35;
    window.orbitingTechNodesGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15;
  }

  // Rotate About Geometric Lattice
  if (window.aboutArtifactGroup) {
    window.aboutArtifactGroup.rotation.y = elapsedTime * 0.12;
    window.aboutArtifactGroup.rotation.z = Math.cos(elapsedTime * 0.18) * 0.12;
    window.aboutArtifactGroup.position.x = mouseX * 0.6;
  }

  // Rotate Contact Metallic Ring
  if (window.contactArtifactGroup) {
    window.contactArtifactGroup.rotation.x = elapsedTime * 0.2;
    window.contactArtifactGroup.rotation.y = elapsedTime * 0.3;
  }

  // Rotate Spatial Tech Node Universe
  if (window.spatialTechGroup) {
    window.spatialTechGroup.rotation.y = elapsedTime * 0.04 + mouseX * 0.15;
  }

  // Camera Position Updates
  if (typeof updateCameraPosition === "function") {
    updateCameraPosition();
  }

  renderer.render(scene, camera);
}

function setThreeSceneTheme(theme) {
  if (!scene || !scene.fog) return;
  const isLight = theme === "light";
  const fogColor = isLight ? 0xf8fafc : 0x10141E;
  scene.fog.color.setHex(fogColor);

  if (window.keyLight) {
    window.keyLight.color.setHex(isLight ? 0x0f172a : 0xffffff);
    window.keyLight.intensity = isLight ? 2.5 : 1.8;
  }
  if (window.rimLight) {
    window.rimLight.color.setHex(isLight ? 0x0284c7 : 0x38bdf8);
    window.rimLight.intensity = isLight ? 3.5 : 2.5;
  }
  if (window.ambientLight) {
    window.ambientLight.color.setHex(isLight ? 0xe2e8f0 : 0xf8fafc);
    window.ambientLight.intensity = isLight ? 1.2 : 0.85;
  }

  if (window.threeMaterials) {
    const { titaniumMaterial, darkChromeMaterial, glassRefractiveMat, accentBlueEmissiveMat, latticeWireframeMat } = window.threeMaterials;
    if (isLight) {
      if (titaniumMaterial) {
        titaniumMaterial.color.setHex(0x1e293b); // Smoked Dark Titanium Slate for light mode
        titaniumMaterial.metalness = 0.85;
        titaniumMaterial.roughness = 0.2;
      }
      if (darkChromeMaterial) {
        darkChromeMaterial.color.setHex(0x0f172a); // Deep Chrome Slate
        darkChromeMaterial.metalness = 0.9;
        darkChromeMaterial.roughness = 0.15;
      }
      if (glassRefractiveMat) {
        glassRefractiveMat.color.setHex(0x0284c7); // Vibrant Sapphire Glass
        glassRefractiveMat.opacity = 0.82;
      }
      if (accentBlueEmissiveMat) {
        accentBlueEmissiveMat.color.setHex(0x0284c7);
        accentBlueEmissiveMat.emissive.setHex(0x0369a1);
      }
      if (latticeWireframeMat) {
        latticeWireframeMat.color.setHex(0x334155);
      }
    } else {
      if (titaniumMaterial) {
        titaniumMaterial.color.setHex(0xf1f5f9); // High-Polish Brushed Titanium Silver
        titaniumMaterial.metalness = 0.96;
        titaniumMaterial.roughness = 0.15;
      }
      if (darkChromeMaterial) {
        darkChromeMaterial.color.setHex(0x1e293b);
        darkChromeMaterial.metalness = 0.92;
        darkChromeMaterial.roughness = 0.22;
      }
      if (glassRefractiveMat) {
        glassRefractiveMat.color.setHex(0xffffff);
        glassRefractiveMat.opacity = 0.88;
      }
      if (accentBlueEmissiveMat) {
        accentBlueEmissiveMat.color.setHex(0x38bdf8);
        accentBlueEmissiveMat.emissive.setHex(0x0284c7);
      }
      if (latticeWireframeMat) {
        latticeWireframeMat.color.setHex(0xcbd5e1);
      }
    }
  }

  if (renderer && camera) {
    renderer.render(scene, camera);
  }
}
window.setThreeSceneTheme = setThreeSceneTheme;

function safeInitThree() {
  if (typeof THREE !== "undefined" && !scene) {
    initThreeScene();
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setThreeSceneTheme(currentTheme);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", safeInitThree);
} else {
  safeInitThree();
}
window.addEventListener("load", safeInitThree);
