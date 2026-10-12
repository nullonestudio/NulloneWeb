"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uSize;
  attribute float aRand;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    // slow ambient swell
    float wave = sin(p.x * 0.55 + uTime * 0.5) * cos(p.y * 0.5 + uTime * 0.35);
    p.z += wave * 0.35;

    // repel from the pointer
    vec2 d = p.xy - uMouse;
    float dist = length(d);
    float force = smoothstep(2.6, 0.0, dist) * uMouseStrength;
    p.xy += normalize(d + 0.0001) * force * 0.7;
    p.z += force * 1.2;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.7 + aRand * 0.6 + force * 1.4) * (8.0 / -mv.z);

    // fade toward edges, brighten near pointer
    float edge = 1.0 - smoothstep(4.0, 9.0, length(position.xy * vec2(0.8, 1.2)));
    vAlpha = (0.16 + aRand * 0.18 + force * 0.6) * edge;
  }
`;

const fragment = /* glsl */ `
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.1, d) * vAlpha;
    gl_FragColor = vec4(vec3(1.0), a);
  }
`;

function Field() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const pointer = useRef(new THREE.Vector2(99, 99));
  const target = useRef(new THREE.Vector2(99, 99));
  const strength = useRef(0);
  const active = useRef(false);

  const { positions, rands } = useMemo(() => {
    const cols = 72;
    const rows = 40;
    const gap = 0.32;
    const positions = new Float32Array(cols * rows * 3);
    const rands = new Float32Array(cols * rows);
    let i = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        positions[i * 3] = (x - (cols - 1) / 2) * gap;
        positions[i * 3 + 1] = (y - (rows - 1) / 2) * gap;
        positions[i * 3 + 2] = 0;
        rands[i] = Math.random();
        i++;
      }
    }
    return { positions, rands };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(99, 99) },
      uMouseStrength: { value: 0 },
      uSize: { value: 2.2 * Math.min(window.devicePixelRatio, 1.5) },
    }),
    [],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      // Map viewport px → world units on the z=0 plane.
      const nx = (e.clientX / size.width) * 2 - 1;
      const ny = -((e.clientY / size.height) * 2 - 1);
      target.current.set((nx * viewport.width) / 2, (ny * viewport.height) / 2);
      active.current = true;
    };
    const onLeave = () => (active.current = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [size, viewport]);

  useFrame((_, delta) => {
    if (!material.current) return;
    const dt = Math.min(delta, 0.05);
    material.current.uniforms.uTime.value += dt;
    pointer.current.lerp(target.current, 1 - Math.pow(0.001, dt));
    strength.current = THREE.MathUtils.damp(strength.current, active.current ? 1 : 0, 3, dt);
    material.current.uniforms.uMouse.value.copy(pointer.current);
    material.current.uniforms.uMouseStrength.value = strength.current;
  });

  return (
    <points rotation={[-0.35, 0, 0]} position={[0, -0.4, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRand" args={[rands, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

/** Mouse-reactive dot-grid field. Pauses rendering when scrolled out of view. */
export default function HeroParticles() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden
      className="absolute inset-0 transition-opacity duration-[1500ms]"
      style={{ opacity: shown ? 1 : 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        frameloop={visible ? "always" : "never"}
        onCreated={() => setShown(true)}
      >
        <Field />
        <AdaptiveDpr pixelated={false} />
      </Canvas>
    </div>
  );
}
