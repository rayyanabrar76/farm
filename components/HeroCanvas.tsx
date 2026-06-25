"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* ── Scene ── */
    const scene = new THREE.Scene();
    const W = el.clientWidth, H = el.clientHeight;
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── Lighting ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const green = new THREE.PointLight(0x4caf72, 3, 40);
    green.position.set(4, 4, 4);
    scene.add(green);
    const gold = new THREE.PointLight(0xf5a623, 2, 30);
    gold.position.set(-4, -3, 3);
    scene.add(gold);
    const blue = new THREE.PointLight(0x4488ff, 0.8, 20);
    blue.position.set(0, -5, 2);
    scene.add(blue);

    /* ── Particle field (seeds / pollen) ── */
    const COUNT = 2200;
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const greenC  = new THREE.Color(0x4caf72);
    const goldC   = new THREE.Color(0xf5a623);
    const whiteC  = new THREE.Color(0xffffff);
    for (let i = 0; i < COUNT; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 28;
      pos[i*3+1] = (Math.random() - 0.5) * 18;
      pos[i*3+2] = (Math.random() - 0.5) * 14;
      const c = [greenC, goldC, whiteC][Math.floor(Math.random() * 3)];
      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    ptGeo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    const ptMat = new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.55 });
    const points = new THREE.Points(ptGeo, ptMat);
    scene.add(points);

    /* ── Network nodes (farm → platform → buyer triangle) ── */
    const nodePositions: [number, number, number][] = [
      [ 0,  2.2,  0],   // top — platform hub
      [-2.5, -1.4, 0],  // bottom-left — farmer
      [ 2.5, -1.4, 0],  // bottom-right — buyer
    ];
    const nodeColors = [0x4caf72, 0xf5a623, 0x4488cc];
    const nodeSizes  = [0.55, 0.42, 0.42];

    const nodeGroup = new THREE.Group();
    const nodeMeshes: THREE.Mesh[] = [];

    nodePositions.forEach(([x, y, z], i) => {
      // Outer glow ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(nodeSizes[i] + 0.08, nodeSizes[i] + 0.18, 48),
        new THREE.MeshBasicMaterial({ color: nodeColors[i], side: THREE.DoubleSide, transparent: true, opacity: 0.35 })
      );
      ring.position.set(x, y, z);
      nodeGroup.add(ring);

      // Core sphere
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(nodeSizes[i], 40, 40),
        new THREE.MeshPhongMaterial({ color: nodeColors[i], emissive: nodeColors[i], emissiveIntensity: 0.35, shininess: 90 })
      );
      sphere.position.set(x, y, z);
      nodeGroup.add(sphere);
      nodeMeshes.push(sphere);
    });

    // Lines connecting nodes
    for (let a = 0; a < 3; a++) {
      for (let b = a + 1; b < 3; b++) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...nodePositions[a]),
          new THREE.Vector3(...nodePositions[b]),
        ]);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x4caf72, transparent: true, opacity: 0.22 });
        nodeGroup.add(new THREE.Line(lineGeo, lineMat));
      }
    }
    nodeGroup.position.set(2.8, 0, 0);
    scene.add(nodeGroup);

    /* ── Floating organic shapes ── */
    const floaters: { mesh: THREE.Mesh; vy: number; vr: number; base: number }[] = [];
    const floatDefs: { geo: THREE.BufferGeometry; color: number; pos: [number, number, number]; wf: boolean }[] = [
      { geo: new THREE.IcosahedronGeometry(0.7, 1),  color: 0x2d7a3a, pos: [-4.5,  1.5, -1], wf: true  },
      { geo: new THREE.OctahedronGeometry(0.55, 0),  color: 0xf5a623, pos: [-3.0, -2.0, -2], wf: false },
      { geo: new THREE.IcosahedronGeometry(0.45, 0), color: 0x4caf72, pos: [ 5.2,  2.2, -1], wf: true  },
      { geo: new THREE.TorusGeometry(0.4, 0.12, 16, 60), color: 0xffb84d, pos: [ 4.5, -2.5, -1.5], wf: false },
      { geo: new THREE.IcosahedronGeometry(0.30, 1), color: 0x81c784, pos: [-5.5, -0.5,  0], wf: false },
    ];
    floatDefs.forEach(({ geo, color, pos, wf }) => {
      const mat = new THREE.MeshPhongMaterial({
        color, wireframe: wf, transparent: true,
        opacity: wf ? 0.55 : 0.75, shininess: 60,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      scene.add(mesh);
      floaters.push({ mesh, vy: Math.random() * 0.008 + 0.004, vr: Math.random() * 0.012 + 0.006, base: pos[1] });
    });

    /* ── Leaf geometry (custom) ── */
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.quadraticCurveTo( 0.6, 0.8, 0, 1.6);
    leafShape.quadraticCurveTo(-0.6, 0.8, 0, 0);
    const leafGeo = new THREE.ShapeGeometry(leafShape, 24);
    const leafMat = new THREE.MeshPhongMaterial({ color: 0x4caf72, side: THREE.DoubleSide, transparent: true, opacity: 0.65, shininess: 80 });
    const leaf1 = new THREE.Mesh(leafGeo, leafMat);
    leaf1.position.set(-5.0, 2.0, 0.5);
    leaf1.scale.set(0.85, 0.85, 0.85);
    scene.add(leaf1);
    floaters.push({ mesh: leaf1, vy: 0.006, vr: 0.008, base: 2.0 });

    const leaf2 = new THREE.Mesh(leafGeo, leafMat.clone());
    leaf2.position.set(5.5, -1.0, 0.2);
    leaf2.scale.set(0.55, 0.55, 0.55);
    scene.add(leaf2);
    floaters.push({ mesh: leaf2, vy: 0.005, vr: 0.01, base: -1.0 });

    /* ── Animate ── */
    let raf: number;
    let t = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.01;

      points.rotation.y = t * 0.018;
      points.rotation.x = t * 0.006;

      nodeGroup.rotation.y = Math.sin(t * 0.25) * 0.2;
      nodeMeshes.forEach((m, i) => {
        m.position.y = nodePositions[i][1] + Math.sin(t * 0.8 + i * 2) * 0.1;
      });

      floaters.forEach(({ mesh, vy, vr, base }, i) => {
        mesh.rotation.x += vr;
        mesh.rotation.y += vr * 0.7;
        mesh.position.y = base + Math.sin(t * vy * 60 + i) * 0.4;
      });

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      if (!el) return;
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />;
}
