/* ==========================================================================
   ABDULLAH B — 3D METALLIC MONOGRAM & PROCEDURAL SCULPTURES
   Primary Asset: Sophisticated 3D Titanium "A" Monogram Sculpture
   ========================================================================== */

function build3DObjects(scene) {
  // PBR Metallic Materials (Twilight Studio Lighting)
  const titaniumMaterial = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.92,
    roughness: 0.22,
    envMapIntensity: 1.2
  });

  const darkChromeMaterial = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.88,
    roughness: 0.3
  });

  const glassRefractiveMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.12,
    transmission: 0.88,
    thickness: 1.5,
    transparent: true,
    opacity: 0.85
  });

  const accentBlueEmissiveMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.4,
    metalness: 0.6,
    roughness: 0.25
  });

  // --------------------------------------------------------------------------
  // 1. HERO ARTIFACT: 3D METALLIC MONOGRAM "A" SCULPTURE
  // Architectural 3D structure derived from the letter A
  // --------------------------------------------------------------------------
  const heroGroup = new THREE.Group();
  heroGroup.position.set(5.2, 0, 0);

  // Structural Legs of the "A" Monogram (Subtle 3D angled metallic pillars)
  const pillarGeo = new THREE.CylinderGeometry(0.28, 0.42, 4.8, 32);
  
  // Left Leg (Angled)
  const leftLeg = new THREE.Mesh(pillarGeo, titaniumMaterial);
  leftLeg.position.set(-1.1, 0, 0);
  leftLeg.rotation.z = -0.32;
  heroGroup.add(leftLeg);

  // Right Leg (Angled)
  const rightLeg = new THREE.Mesh(pillarGeo, titaniumMaterial);
  rightLeg.position.set(1.1, 0, 0);
  rightLeg.rotation.z = 0.32;
  heroGroup.add(rightLeg);

  // Horizontal Crossbar of "A" (Brushed Dark Chrome Box)
  const crossbarGeo = new THREE.BoxGeometry(2.4, 0.32, 0.5);
  const crossbarMesh = new THREE.Mesh(crossbarGeo, darkChromeMaterial);
  crossbarMesh.position.set(0, -0.4, 0);
  heroGroup.add(crossbarMesh);

  // Top Apex Ring Nucleus
  const apexRingGeo = new THREE.TorusGeometry(0.75, 0.18, 32, 64);
  const apexRingMesh = new THREE.Mesh(apexRingGeo, titaniumMaterial);
  apexRingMesh.position.set(0, 1.9, 0);
  apexRingMesh.rotation.x = Math.PI / 2;
  heroGroup.add(apexRingMesh);

  // Inner Core Glowing Nucleus
  const coreGeo = new THREE.OctahedronGeometry(0.5, 2);
  const coreMesh = new THREE.Mesh(coreGeo, accentBlueEmissiveMat);
  coreMesh.position.set(0, 0.2, 0);
  heroGroup.add(coreMesh);

  // Outer Floating Glass Shield Halo
  const haloGeo = new THREE.TorusGeometry(3.0, 0.08, 16, 100);
  const haloMesh = new THREE.Mesh(haloGeo, glassRefractiveMat);
  haloMesh.rotation.x = 1.2;
  heroGroup.add(haloMesh);

  // Orbiting Metallic Tech Nodes
  const orbitingNodesGroup = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const radius = 4.2;
    const nodeGeo = new THREE.OctahedronGeometry(0.3, 1);
    const nodeMesh = new THREE.Mesh(nodeGeo, titaniumMaterial);
    nodeMesh.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * 1.5,
      Math.sin(angle) * radius
    );
    orbitingNodesGroup.add(nodeMesh);
  }
  heroGroup.add(orbitingNodesGroup);

  scene.add(heroGroup);
  window.heroArtifactGroup = heroGroup;

  // --------------------------------------------------------------------------
  // 2. ABOUT ARTIFACT GROUP (3D Metallic Geometric Lattice)
  // --------------------------------------------------------------------------
  const aboutGroup = new THREE.Group();
  aboutGroup.position.set(0, -25, -5);

  const latticeGeometry = new THREE.IcosahedronGeometry(3.2, 1);
  const latticeWireframeMat = new THREE.MeshStandardMaterial({
    color: 0xcbd5e1,
    metalness: 0.9,
    roughness: 0.25,
    wireframe: true
  });
  const latticeMesh = new THREE.Mesh(latticeGeometry, latticeWireframeMat);
  aboutGroup.add(latticeMesh);

  const innerSolidGeo = new THREE.OctahedronGeometry(1.8, 2);
  const innerSolidMesh = new THREE.Mesh(innerSolidGeo, darkChromeMaterial);
  aboutGroup.add(innerSolidMesh);

  scene.add(aboutGroup);
  window.aboutArtifactGroup = aboutGroup;

  // --------------------------------------------------------------------------
  // 3. SPATIAL TECH UNIVERSE
  // --------------------------------------------------------------------------
  const spatialGroup = new THREE.Group();
  spatialGroup.position.set(0, -65, -8);

  for (let i = 0; i < 28; i++) {
    const scale = 0.2 + Math.random() * 0.35;
    const sphereGeo = new THREE.SphereGeometry(scale, 16, 16);
    const sphereMat = Math.random() > 0.5 ? titaniumMaterial : darkChromeMaterial;
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);

    sphereMesh.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 15
    );

    spatialGroup.add(sphereMesh);
  }
  scene.add(spatialGroup);
  window.spatialTechGroup = spatialGroup;

  // --------------------------------------------------------------------------
  // 4. CONTACT ARTIFACT GROUP (3D Metallic Chrome Ring)
  // --------------------------------------------------------------------------
  const contactGroup = new THREE.Group();
  contactGroup.position.set(0, -90, -3);

  const ringGeometry = new THREE.TorusGeometry(3.0, 0.25, 32, 100);
  const ringMesh = new THREE.Mesh(ringGeometry, titaniumMaterial);
  contactGroup.add(ringMesh);

  scene.add(contactGroup);
  window.contactArtifactGroup = contactGroup;
}
