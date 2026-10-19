import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Layers, Info, Check, Eye } from 'lucide-react';

type VisualizationMode = 'natural' | 'crown' | 'veneer' | 'cross-section';

interface AnnotationPoint {
  id: string;
  title: string;
  description: string;
  tag: string;
  position: [number, number, number];
}

const ANNOTATIONS: AnnotationPoint[] = [
  {
    id: 'occlusal',
    title: 'Anatomical Cusps & Fissures',
    tag: 'Bite Mechanics',
    description: 'Natural contours replicated to ensure balanced chewing distribution and prevent jaw joint strain.',
    position: [0, 1.45, 0]
  },
  {
    id: 'enamel',
    title: 'Multi-Layered Translucent Porcelain',
    tag: 'Cosmetic Layering',
    description: 'Refracts light identically to natural dental enamel with lifelike incisal opalescence.',
    position: [0.95, 0.4, 0.2]
  },
  {
    id: 'margin',
    title: 'Sub-Millimeter Margin Seal',
    tag: 'Biological Seal',
    description: 'Strict, flawless marginal fit protecting the gumline against bacteria and secondary decay.',
    position: [-0.95, -0.4, 0.1]
  },
  {
    id: 'dentin',
    title: 'Preserved Healthy Tooth Structure',
    tag: 'Conservative Philosophy',
    description: 'Dr. Kevin Sanders prioritizes conservative preparation to retain maximum biological vitality.',
    position: [0, -1.2, 0]
  }
];

export const Interactive3DTooth: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<VisualizationMode>('natural');
  const [isRotating, setIsRotating] = useState(true);
  const [activeAnnotation, setActiveAnnotation] = useState<AnnotationPoint>(ANNOTATIONS[0]);
  const [isLoading, setIsLoading] = useState(true);

  // References to Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const toothGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<{
    enamel: THREE.MeshPhysicalMaterial;
    crown: THREE.MeshPhysicalMaterial;
    veneer: THREE.MeshPhysicalMaterial;
    dentin: THREE.MeshStandardMaterial;
    pulp: THREE.MeshStandardMaterial;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.8);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting setup
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.2);
    fillLight.position.set(-4, -2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfef08a, 1.5);
    rimLight.position.set(0, 6, -4);
    scene.add(rimLight);

    // Root Group
    const toothGroup = new THREE.Group();
    toothGroupRef.current = toothGroup;
    scene.add(toothGroup);

    // Materials
    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfcfbf9,
      roughness: 0.14,
      metalness: 0.05,
      transmission: 0.28,
      thickness: 1.1,
      ior: 1.52,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      specularIntensity: 0.9
    });

    const crownMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.08,
      metalness: 0.02,
      transmission: 0.35,
      thickness: 1.2,
      ior: 1.54,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      specularIntensity: 1.0
    });

    const veneerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfefce8,
      roughness: 0.1,
      metalness: 0.05,
      transmission: 0.45,
      thickness: 0.6,
      ior: 1.56,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04
    });

    const dentinMaterial = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      roughness: 0.45,
      metalness: 0.0
    });

    const pulpMaterial = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      roughness: 0.3,
      metalness: 0.0
    });

    materialsRef.current = {
      enamel: enamelMaterial,
      crown: crownMaterial,
      veneer: veneerMaterial,
      dentin: dentinMaterial,
      pulp: pulpMaterial
    };

    // Procedural Anatomical Molar Crown Geometry
    // Crown Body
    const crownGeo = new THREE.CylinderGeometry(1.2, 0.95, 1.4, 32, 16);
    // Subtle anatomical deforms for molar cusps
    const pos = crownGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      if (y > 0.3) {
        // Create 4 natural cusps (buccal & lingual)
        const cuspWave = Math.sin(x * 2.8) * Math.cos(z * 2.8) * 0.18;
        const grooveIndent = (1 - (x * x + z * z) * 0.4) * 0.08;
        pos.setY(i, y + cuspWave - grooveIndent);
      }
      // Rounded organic contours
      const radialDist = Math.sqrt(x * x + z * z);
      if (radialDist > 0.01) {
        const bulges = 1 + 0.06 * Math.sin(Math.atan2(z, x) * 4);
        pos.setX(i, x * bulges);
        pos.setZ(i, z * bulges);
      }
    }
    crownGeo.computeVertexNormals();

    const crownMesh = new THREE.Mesh(crownGeo, enamelMaterial);
    crownMesh.position.y = 0.55;
    crownMesh.name = 'crownMesh';
    toothGroup.add(crownMesh);

    // Root 1 (Mesial)
    const rootGeo1 = new THREE.ConeGeometry(0.48, 1.6, 24);
    const root1 = new THREE.Mesh(rootGeo1, enamelMaterial);
    root1.rotation.z = Math.PI;
    root1.position.set(-0.45, -0.85, 0);
    root1.scale.set(0.9, 1, 0.85);
    root1.name = 'root1';
    toothGroup.add(root1);

    // Root 2 (Distal)
    const rootGeo2 = new THREE.ConeGeometry(0.46, 1.65, 24);
    const root2 = new THREE.Mesh(rootGeo2, enamelMaterial);
    root2.rotation.z = Math.PI;
    root2.position.set(0.45, -0.88, 0);
    root2.scale.set(0.85, 1, 0.9);
    root2.name = 'root2';
    toothGroup.add(root2);

    // Cervical Collar (Margin)
    const collarGeo = new THREE.TorusGeometry(0.98, 0.07, 16, 48);
    collarGeo.rotateX(Math.PI / 2);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0xead9c5,
      roughness: 0.35
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.y = -0.15;
    collarMesh.name = 'collar';
    toothGroup.add(collarMesh);

    // Internal Dentin core (visible in cross-section)
    const dentinGeo = new THREE.CylinderGeometry(0.85, 0.65, 1.1, 24);
    const dentinMesh = new THREE.Mesh(dentinGeo, dentinMaterial);
    dentinMesh.position.y = 0.45;
    dentinMesh.scale.set(0.88, 0.88, 0.88);
    dentinMesh.name = 'dentinMesh';
    dentinMesh.visible = false;
    toothGroup.add(dentinMesh);

    // Internal Pulp
    const pulpGeo = new THREE.CylinderGeometry(0.25, 0.18, 0.8, 16);
    const pulpMesh = new THREE.Mesh(pulpGeo, pulpMaterial);
    pulpMesh.position.y = 0.35;
    pulpMesh.name = 'pulpMesh';
    pulpMesh.visible = false;
    toothGroup.add(pulpMesh);

    // Veneer Facet Shell (visible in veneer mode)
    const veneerGeo = new THREE.CylinderGeometry(1.24, 0.98, 1.42, 32, 1, false, -Math.PI / 2, Math.PI);
    const veneerMesh = new THREE.Mesh(veneerGeo, veneerMaterial);
    veneerMesh.position.set(0, 0.55, 0.04);
    veneerMesh.name = 'veneerMesh';
    veneerMesh.visible = false;
    toothGroup.add(veneerMesh);

    // Soft subtle pedestal ring
    const ringGeo = new THREE.RingGeometry(1.5, 1.7, 64);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x1f4e3d,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = -1.75;
    toothGroup.add(ringMesh);

    setIsLoading(false);

    // Mouse drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      toothGroup.rotation.y += deltaX * 0.01;
      toothGroup.rotation.x = Math.max(-0.6, Math.min(0.6, toothGroup.rotation.x + deltaY * 0.008));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      toothGroup.rotation.y += deltaX * 0.01;
      toothGroup.rotation.x = Math.max(-0.6, Math.min(0.6, toothGroup.rotation.x + deltaY * 0.008));
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (toothGroupRef.current && isRotating && !isDragging) {
        toothGroupRef.current.rotation.y += 0.35 * delta;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      // Clean memory
      crownGeo.dispose();
      rootGeo1.dispose();
      rootGeo2.dispose();
      collarGeo.dispose();
      dentinGeo.dispose();
      pulpGeo.dispose();
      veneerGeo.dispose();
      ringGeo.dispose();
      enamelMaterial.dispose();
      crownMaterial.dispose();
      veneerMaterial.dispose();
      dentinMaterial.dispose();
      pulpMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Handle Mode Changes
  useEffect(() => {
    if (!toothGroupRef.current || !materialsRef.current) return;
    const group = toothGroupRef.current;
    const mats = materialsRef.current;

    const crownMesh = group.getObjectByName('crownMesh') as THREE.Mesh;
    const root1 = group.getObjectByName('root1') as THREE.Mesh;
    const root2 = group.getObjectByName('root2') as THREE.Mesh;
    const dentinMesh = group.getObjectByName('dentinMesh') as THREE.Mesh;
    const pulpMesh = group.getObjectByName('pulpMesh') as THREE.Mesh;
    const veneerMesh = group.getObjectByName('veneerMesh') as THREE.Mesh;

    if (!crownMesh) return;

    if (mode === 'natural') {
      crownMesh.material = mats.enamel;
      crownMesh.visible = true;
      if (dentinMesh) dentinMesh.visible = false;
      if (pulpMesh) pulpMesh.visible = false;
      if (veneerMesh) veneerMesh.visible = false;
      if (root1) root1.material = mats.enamel;
      if (root2) root2.material = mats.enamel;
    } else if (mode === 'crown') {
      crownMesh.material = mats.crown;
      crownMesh.visible = true;
      if (dentinMesh) dentinMesh.visible = false;
      if (pulpMesh) pulpMesh.visible = false;
      if (veneerMesh) veneerMesh.visible = false;
    } else if (mode === 'veneer') {
      crownMesh.material = mats.enamel;
      crownMesh.visible = true;
      if (veneerMesh) veneerMesh.visible = true;
      if (dentinMesh) dentinMesh.visible = false;
      if (pulpMesh) pulpMesh.visible = false;
    } else if (mode === 'cross-section') {
      // Make enamel semi-transparent to reveal internal dentin & pulp
      const transparentEnamel = mats.enamel.clone();
      transparentEnamel.transparent = true;
      transparentEnamel.opacity = 0.35;
      transparentEnamel.transmission = 0.85;
      crownMesh.material = transparentEnamel;
      crownMesh.visible = true;
      if (dentinMesh) dentinMesh.visible = true;
      if (pulpMesh) pulpMesh.visible = true;
      if (veneerMesh) veneerMesh.visible = false;
    }
  }, [mode]);

  return (
    <div className="relative w-full rounded-2xl bg-[#F4F1EA] border border-[#E5DECF] p-6 lg:p-8 overflow-hidden shadow-sm">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#1F4E3D] uppercase">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>Interactive 3D Clinical Model</span>
            <span aria-hidden="true">·</span>
            <span>WebGL Real-Time Render</span>
          </div>
          <h3 className="text-2xl font-serif text-[#19231E] mt-1">
            Anatomical Precision & Conservative Dentistry
          </h3>
          <p className="text-sm text-[#4A5550] max-w-xl mt-1">
            Drag to rotate 360°. Inspect how Dr. Kevin Sanders preserves healthy tooth structure while crafting seamless porcelain restorations.
          </p>
        </div>

        {/* Rotation Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              isRotating
                ? 'bg-[#1F4E3D] text-white border-[#1F4E3D]'
                : 'bg-white text-[#19231E] border-[#D6CDBD] hover:bg-[#EAE4D8]'
            }`}
            title={isRotating ? 'Pause Rotation' : 'Enable Rotation'}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span>{isRotating ? 'Auto-Rotating' : 'Rotate Paused'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 3D Canvas Area */}
        <div className="lg:col-span-7 relative h-[380px] sm:h-[440px] w-full flex items-center justify-center">
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing rounded-xl flex items-center justify-center"
          />

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#F4F1EA]/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm text-[#1F4E3D]">
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Generating 3D Precision Model...</span>
              </div>
            </div>
          )}

          {/* Interactive Hint */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E5DECF] text-[11px] text-[#4A5550] flex items-center gap-1.5 pointer-events-none">
            <Eye className="w-3.5 h-3.5 text-[#1F4E3D]" />
            <span>Click & drag to inspect from any angle</span>
          </div>
        </div>

        {/* Controls & Annotation Panel */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          {/* Mode Selector */}
          <div>
            <label className="text-xs font-semibold text-[#665D4F] tracking-wider uppercase block mb-2.5">
              Restoration & View Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('natural')}
                className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                  mode === 'natural'
                    ? 'bg-[#1F4E3D] text-white border-[#1F4E3D] shadow-sm'
                    : 'bg-white text-[#19231E] border-[#D6CDBD] hover:border-[#1F4E3D]'
                }`}
              >
                <div className="font-semibold text-sm">Natural Tooth</div>
                <div className={`text-[11px] mt-0.5 ${mode === 'natural' ? 'text-emerald-100' : 'text-[#665D4F]'}`}>
                  Organic cuspal anatomy
                </div>
              </button>

              <button
                onClick={() => setMode('crown')}
                className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                  mode === 'crown'
                    ? 'bg-[#1F4E3D] text-white border-[#1F4E3D] shadow-sm'
                    : 'bg-white text-[#19231E] border-[#D6CDBD] hover:border-[#1F4E3D]'
                }`}
              >
                <div className="font-semibold text-sm">Porcelain Crown</div>
                <div className={`text-[11px] mt-0.5 ${mode === 'crown' ? 'text-emerald-100' : 'text-[#665D4F]'}`}>
                  Full protective ceramic
                </div>
              </button>

              <button
                onClick={() => setMode('veneer')}
                className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                  mode === 'veneer'
                    ? 'bg-[#1F4E3D] text-white border-[#1F4E3D] shadow-sm'
                    : 'bg-white text-[#19231E] border-[#D6CDBD] hover:border-[#1F4E3D]'
                }`}
              >
                <div className="font-semibold text-sm">Cosmetic Veneer</div>
                <div className={`text-[11px] mt-0.5 ${mode === 'veneer' ? 'text-emerald-100' : 'text-[#665D4F]'}`}>
                  Sub-millimeter facial shell
                </div>
              </button>

              <button
                onClick={() => setMode('cross-section')}
                className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                  mode === 'cross-section'
                    ? 'bg-[#1F4E3D] text-white border-[#1F4E3D] shadow-sm'
                    : 'bg-white text-[#19231E] border-[#D6CDBD] hover:border-[#1F4E3D]'
                }`}
              >
                <div className="font-semibold text-sm">Cross-Section</div>
                <div className={`text-[11px] mt-0.5 ${mode === 'cross-section' ? 'text-emerald-100' : 'text-[#665D4F]'}`}>
                  Internal dentin & pulp
                </div>
              </button>
            </div>
          </div>

          {/* Interactive Anatomical Callout */}
          <div className="bg-white rounded-xl border border-[#D6CDBD] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-[#1F4E3D] uppercase tracking-wider">
                {activeAnnotation.tag}
              </span>
              <span className="text-xs text-[#7A7366]">Clinical Precision</span>
            </div>
            <h4 className="text-lg font-serif text-[#19231E] font-medium">
              {activeAnnotation.title}
            </h4>
            <p className="text-sm text-[#4A5550] mt-1.5 leading-relaxed">
              {activeAnnotation.description}
            </p>

            {/* Quick Points selector */}
            <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-[#F0ECE1]">
              <span className="text-xs text-[#7A7366] mr-1">Inspect Focus:</span>
              {ANNOTATIONS.map((point) => (
                <button
                  key={point.id}
                  onClick={() => setActiveAnnotation(point)}
                  className={`px-2.5 py-1 text-xs rounded-md transition-all ${
                    activeAnnotation.id === point.id
                      ? 'bg-[#1F4E3D] text-white font-medium shadow-xs'
                      : 'bg-[#F4F1EA] text-[#4A5550] hover:bg-[#EAE4D8]'
                  }`}
                >
                  {point.tag}
                </button>
              ))}
            </div>
          </div>

          {/* Key Assurance */}
          <div className="flex items-start gap-3 text-xs text-[#4A5550] bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E5DECF]">
            <Check className="w-4 h-4 text-[#1F4E3D] shrink-0 mt-0.5" />
            <span>
              <strong>Conservative Preparation:</strong> Dr. Kevin Sanders removes only the minimum necessary tooth surface, preserving healthy enamel and dentin to ensure your teeth stay robust for decades.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
