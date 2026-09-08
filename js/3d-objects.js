/* ==========================================================================
   ABDULLAH B — 3D METALLIC MONOGRAM & CONTINUOUS BACKGROUND 3D SCULPTURES
   Primary Assets: 3D Titanium "A" Monogram + Section-Specific 3D Artifacts
   + Continuous Floating 3D Background Array Across All Scroll Sections
   ========================================================================== */

function build3DObjects(scene) {
  // PBR Metallic Materials (High-Contrast Titanium, Dark Chrome & Liquid Cyan Glass)
  const titaniumMaterial = new THREE.MeshStandardMaterial({
    color: 0xCBD5E1,
    metalness: 0.92,
    roughness: 0.18
  });

  const darkChromeMaterial = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.9,
    roughness: 0.22
  });

  const glassRefractiveMat = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    metalness: 0.35,
    roughness: 0.15,
    transparent: true,
    opacity: 0.82
  });

  const accentBlueEmissiveMat = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    emissive: 0x0284C7,
    emissiveIntensity: 0.95,
    metalness: 0.5,
    roughness: 0.2
  });

  const latticeWireframeMat = new THREE.MeshStandardMaterial({
    color: 0xcbd5e1,
    metalness: 0.9,
    roughness: 0.25,
    wireframe: true
  });

  // --------------------------------------------------------------------------
  // 1. HERO ARTIFACT: HIGH-POLISH 3D TITANIUM MONOGRAM "A" SCULPTURE (y = 0)
  // --------------------------------------------------------------------------
  const heroGroup = new THREE.Group();
  heroGroup.position.set(2.2, 0, 0);

  // Structural Legs of the "A" Monogram
  const pillarGeo = new THREE.CylinderGeometry(0.3, 0.44, 5.0, 64);
  
  const leftLeg = new THREE.Mesh(pillarGeo, titaniumMaterial);
  leftLeg.position.set(-1.15, 0, 0);
  leftLeg.rotation.z = -0.32;
  heroGroup.add(leftLeg);

  const rightLeg = new THREE.Mesh(pillarGeo, titaniumMaterial);
  rightLeg.position.set(1.15, 0, 0);
  rightLeg.rotation.z = 0.32;
  heroGroup.add(rightLeg);

  const crossbarGeo = new THREE.BoxGeometry(2.5, 0.34, 0.52);
  const crossbarMesh = new THREE.Mesh(crossbarGeo, darkChromeMaterial);
  crossbarMesh.position.set(0, -0.4, 0);
  heroGroup.add(crossbarMesh);

  const apexRingGeo = new THREE.TorusGeometry(0.8, 0.18, 48, 80);
  const apexRingMesh = new THREE.Mesh(apexRingGeo, titaniumMaterial);
  apexRingMesh.position.set(0, 1.95, 0);
  apexRingMesh.rotation.x = Math.PI / 2;
  heroGroup.add(apexRingMesh);

  const coreGeo = new THREE.OctahedronGeometry(0.55, 3);
  const coreMesh = new THREE.Mesh(coreGeo, accentBlueEmissiveMat);
  coreMesh.position.set(0, 0.2, 0);
  heroGroup.add(coreMesh);

  const haloGeo = new THREE.TorusGeometry(3.1, 0.07, 24, 120);
  const haloMesh = new THREE.Mesh(haloGeo, glassRefractiveMat);
  haloMesh.rotation.x = 1.25;
  heroGroup.add(haloMesh);

  const haloGeo2 = new THREE.TorusGeometry(2.7, 0.05, 24, 100);
  const haloMesh2 = new THREE.Mesh(haloGeo2, glassRefractiveMat);
  haloMesh2.rotation.x = -0.6;
  haloMesh2.rotation.y = 0.8;
  heroGroup.add(haloMesh2);

  const orbitingNodesGroup = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const radius = 4.2;
    const nodeGeo = new THREE.OctahedronGeometry(0.32, 2);
    const nodeMesh = new THREE.Mesh(nodeGeo, titaniumMaterial);
    nodeMesh.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * 1.5,
      Math.sin(angle) * radius
    );
    orbitingNodesGroup.add(nodeMesh);
  }
  heroGroup.add(orbitingNodesGroup);
  window.orbitingTechNodesGroup = orbitingNodesGroup;

  scene.add(heroGroup);
  window.heroArtifactGroup = heroGroup;

  // --------------------------------------------------------------------------
  // 2. ABOUT ARTIFACT GROUP: 3D METALLIC NEURAL LATTICE (y = -20)
  // --------------------------------------------------------------------------
  const aboutGroup = new THREE.Group();
  aboutGroup.position.set(3.2, -20, -3);

  const latticeGeometry = new THREE.IcosahedronGeometry(3.0, 1);
  const latticeMesh = new THREE.Mesh(latticeGeometry, latticeWireframeMat);
  aboutGroup.add(latticeMesh);

  const innerSolidGeo = new THREE.OctahedronGeometry(1.6, 2);
  const innerSolidMesh = new THREE.Mesh(innerSolidGeo, darkChromeMaterial);
  aboutGroup.add(innerSolidMesh);

  const aboutHaloGeo = new THREE.TorusGeometry(3.6, 0.06, 24, 100);
  const aboutHaloMesh = new THREE.Mesh(aboutHaloGeo, glassRefractiveMat);
  aboutHaloMesh.rotation.x = 1.1;
  aboutGroup.add(aboutHaloMesh);

  scene.add(aboutGroup);
  window.aboutArtifactGroup = aboutGroup;

  // --------------------------------------------------------------------------
  // 3. EXPERIENCE ARTIFACT GROUP: ARCHITECTURAL FLOW TORUS KNOT (y = -40)
  // --------------------------------------------------------------------------
  const expGroup = new THREE.Group();
  expGroup.position.set(-3.5, -40, -4);

  const knotGeo = new THREE.TorusKnotGeometry(2.2, 0.4, 128, 32);
  const knotMesh = new THREE.Mesh(knotGeo, titaniumMaterial);
  expGroup.add(knotMesh);

  const expCoreGeo = new THREE.SphereGeometry(1.1, 32, 32);
  const expCoreMesh = new THREE.Mesh(expCoreGeo, glassRefractiveMat);
  expGroup.add(expCoreMesh);

  const expRingGeo = new THREE.TorusGeometry(3.8, 0.05, 24, 100);
  const expRingMesh = new THREE.Mesh(expRingGeo, accentBlueEmissiveMat);
  expRingMesh.rotation.x = Math.PI / 3;
  expGroup.add(expRingMesh);

  scene.add(expGroup);
  window.experienceArtifactGroup = expGroup;

  // --------------------------------------------------------------------------
  // 4. PROJECTS ARTIFACT GROUP: GEODESIC TECH CLUSTER (y = -60)
  // --------------------------------------------------------------------------
  const projGroup = new THREE.Group();
  projGroup.position.set(3.5, -60, -4);

  const dodecaGeo = new THREE.DodecahedronGeometry(2.4, 0);
  const dodecaMesh = new THREE.Mesh(dodecaGeo, darkChromeMaterial);
  projGroup.add(dodecaMesh);

  const innerGlassOcta = new THREE.OctahedronGeometry(1.6, 1);
  const innerGlassMesh = new THREE.Mesh(innerGlassOcta, glassRefractiveMat);
  projGroup.add(innerGlassMesh);

  const projHalo = new THREE.TorusGeometry(3.6, 0.07, 24, 100);
  const projHaloMesh = new THREE.Mesh(projHalo, titaniumMaterial);
  projHaloMesh.rotation.y = 1.2;
  projGroup.add(projHaloMesh);

  scene.add(projGroup);
  window.projectsArtifactGroup = projGroup;

  // --------------------------------------------------------------------------
  // 5. SKILLS ARTIFACT GROUP: MATRIX DOUBLE HELIX RING (y = -78)
  // --------------------------------------------------------------------------
  const skillsGroup = new THREE.Group();
  skillsGroup.position.set(-3.0, -78, -3);

  const matrixRing1 = new THREE.TorusGeometry(2.8, 0.16, 32, 100);
  const matrixMesh1 = new THREE.Mesh(matrixRing1, titaniumMaterial);
  matrixMesh1.rotation.x = 1.1;
  skillsGroup.add(matrixMesh1);

  const matrixRing2 = new THREE.TorusGeometry(2.4, 0.12, 32, 100);
  const matrixMesh2 = new THREE.Mesh(matrixRing2, glassRefractiveMat);
  matrixMesh2.rotation.y = 1.3;
  skillsGroup.add(matrixMesh2);

  const skillsCoreGeo = new THREE.IcosahedronGeometry(1.2, 0);
  const skillsCoreMesh = new THREE.Mesh(skillsCoreGeo, accentBlueEmissiveMat);
  skillsGroup.add(skillsCoreMesh);

  scene.add(skillsGroup);
  window.skillsArtifactGroup = skillsGroup;

  // --------------------------------------------------------------------------
  // 6. CONTACT ARTIFACT GROUP: METALLIC CHROME RING (y = -95)
  // --------------------------------------------------------------------------
  const contactGroup = new THREE.Group();
  contactGroup.position.set(0, -95, -3);

  const ringGeometry = new THREE.TorusGeometry(3.2, 0.28, 32, 100);
  const ringMesh = new THREE.Mesh(ringGeometry, titaniumMaterial);
  contactGroup.add(ringMesh);

  const contactInnerCore = new THREE.SphereGeometry(1.4, 32, 32);
  const contactCoreMesh = new THREE.Mesh(contactInnerCore, glassRefractiveMat);
  contactGroup.add(contactCoreMesh);

  scene.add(contactGroup);
  window.contactArtifactGroup = contactGroup;

  // --------------------------------------------------------------------------
  // 7. CONTINUOUS FLOATING BACKGROUND 3D OBJECTS ARRAY (y = +20 to y = -120)
  // --------------------------------------------------------------------------
  const floatingElementsGroup = new THREE.Group();
  const backgroundFloatingElements = [];

  const geometries = [
    new THREE.SphereGeometry(0.45, 16, 16),
    new THREE.BoxGeometry(0.6, 0.6, 0.6),
    new THREE.OctahedronGeometry(0.55, 1),
    new THREE.TorusGeometry(0.55, 0.14, 16, 32),
    new THREE.TetrahedronGeometry(0.5, 0),
    new THREE.DodecahedronGeometry(0.45, 0),
    new THREE.IcosahedronGeometry(0.5, 0)
  ];

  const materials = [titaniumMaterial, darkChromeMaterial, glassRefractiveMat, accentBlueEmissiveMat, latticeWireframeMat];

  // Distribute 64 floating objects along the vertical axis from y = 20 down to y = -120
  for (let i = 0; i < 64; i++) {
    const geo = geometries[i % geometries.length];
    const mat = materials[i % materials.length];
    const mesh = new THREE.Mesh(geo, mat);

    const baseX = (Math.random() - 0.5) * 34; // span across screen width
    const baseY = 20 - (i / 64) * 140;        // vertical span +20 down to -120
    const baseZ = -2 - Math.random() * 8;     // close depth position for clear visibility

    mesh.position.set(baseX, baseY, baseZ);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

    const scale = 0.7 + Math.random() * 0.9;
    mesh.scale.set(scale, scale, scale);

    floatingElementsGroup.add(mesh);

    backgroundFloatingElements.push({
      mesh,
      baseY,
      speed: 0.6 + Math.random() * 1.4,
      phase: Math.random() * Math.PI * 2,
      rotSpeedX: (Math.random() - 0.5) * 0.02,
      rotSpeedY: (Math.random() - 0.5) * 0.025
    });
  }

  scene.add(floatingElementsGroup);
  window.backgroundFloatingElements = backgroundFloatingElements;

  // Export Materials Handles for Dynamic Light/Dark Theme Switching
  window.threeMaterials = {
    titaniumMaterial,
    darkChromeMaterial,
    glassRefractiveMat,
    accentBlueEmissiveMat,
    latticeWireframeMat
  };
}
