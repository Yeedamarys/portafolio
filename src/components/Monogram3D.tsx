import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { MONOGRAM } from '../lib/monogram';

interface Monogram3DProps {
  onReady?: () => void;
}

function buildShapes(): THREE.Shape[] {
  const { stroke: s, dStem, dRadius: r, lStart, lEnd, height: h } = MONOGRAM;

  const d = new THREE.Shape();
  d.moveTo(0, 0);
  d.lineTo(dStem, 0);
  d.absarc(dStem, h / 2, r, -Math.PI / 2, Math.PI / 2, false);
  d.lineTo(0, h);
  d.lineTo(0, 0);

  const counter = new THREE.Path();
  counter.moveTo(s, s);
  counter.lineTo(dStem, s);
  counter.absarc(dStem, h / 2, r - s, -Math.PI / 2, Math.PI / 2, false);
  counter.lineTo(s, h - s);
  counter.lineTo(s, s);
  d.holes.push(counter);

  // y grows upward here, so the L's foot sits at y = 0.
  const l = new THREE.Shape();
  l.moveTo(lStart, 0);
  l.lineTo(lEnd, 0);
  l.lineTo(lEnd, s);
  l.lineTo(lStart + s, s);
  l.lineTo(lStart + s, h);
  l.lineTo(lStart, h);
  l.lineTo(lStart, 0);

  return [d, l];
}

/**
 * Pink glass "DL" that turns toward the pointer. Loaded lazily; the SVG monogram shows until the first frame.
 * Rendering stops when the tile is off screen or the tab is hidden.
 */
export default function Monogram3D({ onReady }: Monogram3DProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      return; // No WebGL: the SVG fallback stays visible.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    scene.environmentIntensity = 0.55;

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    const geometry = new THREE.ExtrudeGeometry(buildShapes(), {
      depth: 0.46,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.07,
      bevelSegments: 6,
      curveSegments: 48,
    });
    geometry.center();

    // Smoked pink glass: refracts the backdrop, tinted pink with depth, chrome specular from the env + lights.
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffd6ec,
      emissive: 0x5a0632,
      emissiveIntensity: 0.35,
      metalness: 0,
      roughness: 0.06,
      transmission: 0.95,
      thickness: 0.9,
      ior: 1.5,
      attenuationColor: new THREE.Color(0xff4fae),
      attenuationDistance: 1.6,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      iridescence: 0.35,
      iridescenceIOR: 1.3,
      specularIntensity: 1,
      specularColor: new THREE.Color(0xd9d4e0),
    });
    const mesh = new THREE.Mesh(geometry, material);

    // Neon rim along the bevels
    const edgesGeometry = new THREE.EdgesGeometry(geometry, 28);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xff8fcb, transparent: true, opacity: 0.9 });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

    // Backdrop for the glass to refract: wine ground, pink glow and the page's grid. It fills the view,
    // so the canvas reads as the tile's own surface.
    const backdropCanvas = document.createElement('canvas');
    backdropCanvas.width = 1024;
    backdropCanvas.height = 1024;
    const ctx = backdropCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#22091a';
      ctx.fillRect(0, 0, 1024, 1024);
      const glow = ctx.createRadialGradient(512, 470, 40, 512, 512, 520);
      glow.addColorStop(0, 'rgba(255, 79, 174, 0.55)');
      glow.addColorStop(0.45, 'rgba(255, 79, 174, 0.16)');
      glow.addColorStop(1, 'rgba(255, 79, 174, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 1024, 1024);
      ctx.strokeStyle = 'rgba(255, 143, 203, 0.16)';
      ctx.lineWidth = 2;
      for (let p = 0; p <= 1024; p += 64) {
        ctx.beginPath();
        ctx.moveTo(p, 0);
        ctx.lineTo(p, 1024);
        ctx.moveTo(0, p);
        ctx.lineTo(1024, p);
        ctx.stroke();
      }
    }
    const backdropTexture = new THREE.CanvasTexture(backdropCanvas);
    backdropTexture.colorSpace = THREE.SRGBColorSpace;
    const backdropMaterial = new THREE.MeshBasicMaterial({ map: backdropTexture, toneMapped: false });
    const backdropGeometry = new THREE.PlaneGeometry(1, 1);
    const backdrop = new THREE.Mesh(backdropGeometry, backdropMaterial);
    backdrop.position.z = -3;
    scene.add(backdrop);

    const group = new THREE.Group();
    group.add(mesh, edges);
    scene.add(group);

    const pinkLight = new THREE.PointLight(0xff4fae, 60, 30, 2);
    pinkLight.position.set(-4, 3, 6);
    const chromeLight = new THREE.PointLight(0xd9d4e0, 80, 30, 2);
    chromeLight.position.set(4, 3.5, 5);
    scene.add(pinkLight, chromeLight, new THREE.AmbientLight(0xffe9f3, 0.2));

    let announced = false;
    const render = () => {
      renderer.render(scene, camera);
      if (!announced) {
        announced = true;
        onReadyRef.current?.();
      }
    };

    // Keep the monogram at ~62% of the tile, whatever its shape.
    const contentWidth = MONOGRAM.lEnd + 0.3;
    const contentHeight = MONOGRAM.height + 0.3;
    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const visibleHeight = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const visibleWidth = visibleHeight * camera.aspect;
      group.scale.setScalar(Math.min((visibleWidth * 0.62) / contentWidth, (visibleHeight * 0.62) / contentHeight));
      // Backdrop sits further back, so it needs a larger square to cover the view (square keeps the grid square).
      const depthScale = (camera.position.z - backdrop.position.z) / camera.position.z;
      const side = Math.max(visibleWidth, visibleHeight) * depthScale * 1.05;
      backdrop.scale.set(side, side, 1);
      render();
    };

    // Pointer target, followed with a lightly damped spring.
    const target = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    const stiffness = 60;
    const damping = 2 * Math.sqrt(stiffness) * 0.9;
    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const nx = ((e.clientX - (rect.left + rect.width / 2)) / window.innerWidth) * 2;
      const ny = ((e.clientY - (rect.top + rect.height / 2)) / window.innerHeight) * 2;
      target.y = THREE.MathUtils.clamp(nx, -1, 1) * 0.55;
      target.x = THREE.MathUtils.clamp(ny, -1, 1) * 0.35;
    };
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (finePointer) window.addEventListener('pointermove', onPointerMove, { passive: true });

    const timer = new THREE.Timer();
    let frame = 0;
    let inView = true;
    let pageVisible = document.visibilityState === 'visible';

    const tick = (timestamp: number) => {
      frame = 0;
      timer.update(timestamp);
      // Clamped so a long pause (off screen, hidden tab) doesn't make the spring jump.
      const dt = Math.min(timer.getDelta(), 0.05);
      const t = timer.getElapsed();
      const idleSway = Math.sin(t * 0.35) * 0.18;

      const ax = stiffness * (target.x - group.rotation.x) - damping * velocity.x;
      const ay = stiffness * (target.y + idleSway - group.rotation.y) - damping * velocity.y;
      velocity.x += ax * dt;
      velocity.y += ay * dt;
      group.rotation.x += velocity.x * dt;
      group.rotation.y += velocity.y * dt;
      group.position.y = Math.sin(t * 0.8) * 0.06;

      render();
      schedule();
    };
    const schedule = () => {
      if (!frame && inView && pageVisible) frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) {
        schedule();
      } else {
        stop();
      }
    });
    io.observe(host);

    const onVisibility = () => {
      pageVisible = document.visibilityState === 'visible';
      if (pageVisible) {
        schedule();
      } else {
        stop();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();
    schedule();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      geometry.dispose();
      edgesGeometry.dispose();
      material.dispose();
      edgesMaterial.dispose();
      backdropGeometry.dispose();
      backdropMaterial.dispose();
      backdropTexture.dispose();
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" />;
}
