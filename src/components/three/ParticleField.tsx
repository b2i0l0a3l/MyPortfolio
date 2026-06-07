"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 2.2;

function StarfieldScene({ isDark, opacity }: { isDark: boolean; opacity: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mousePos = useRef(new THREE.Vector2(9999, 9999));
  const mouseActive = useRef(false);
  const { viewport } = useThree();

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3]     = (Math.random() - 0.5) * 28;
      pos[i3 + 1] = (Math.random() - 0.5) * 18;
      pos[i3 + 2] = (Math.random() - 0.5) * 4;
      vel[i3]     = (Math.random() - 0.5) * 0.002;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.0015;
      vel[i3 + 2] = 0;
    }
    return { positions: pos, velocities: vel };
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const maxLines = PARTICLE_COUNT * 4;
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      mouseActive.current = true;
      mousePos.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * viewport.width * 0.5;
      mousePos.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * viewport.height * 0.5;
    },
    [viewport]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [handlePointerMove]);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      posArray[i3]     += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];

      if (mouseActive.current) {
        const dx = posArray[i3]     - mousePos.current.x;
        const dy = posArray[i3 + 1] - mousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 3.5 && dist > 0.01) {
          const force = (1 - dist / 3.5) * 0.006;
          posArray[i3]     += (dx / dist) * force;
          posArray[i3 + 1] += (dy / dist) * force;
        }
      }

      if (posArray[i3]     >  14) posArray[i3]     = -14;
      if (posArray[i3]     < -14) posArray[i3]     =  14;
      if (posArray[i3 + 1] >   9) posArray[i3 + 1] =  -9;
      if (posArray[i3 + 1] <  -9) posArray[i3 + 1] =   9;
    }
    posAttr.needsUpdate = true;

    const linePosAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const lineColAttr = linesRef.current.geometry.attributes.color as THREE.BufferAttribute;
    const linePosArr = linePosAttr.array as Float32Array;
    const lineColArr = lineColAttr.array as Float32Array;

    let lineIdx = 0;
    const maxLines = linePosArr.length / 6;

    const r = isDark ? 0.55 : 0.4;
    const g = isDark ? 0.28 : 0.18;
    const b = isDark ? 0.9  : 0.85;

    for (let i = 0; i < PARTICLE_COUNT && lineIdx < maxLines; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineIdx < maxLines; j++) {
        const i3 = i * 3, j3 = j * 3;
        const dx = posArray[i3] - posArray[j3];
        const dy = posArray[i3 + 1] - posArray[j3 + 1];
        const dz = posArray[i3 + 2] - posArray[j3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (d < CONNECTION_DISTANCE) {
          const alpha = (1 - d / CONNECTION_DISTANCE) * 0.35 * opacity;
          const idx = lineIdx * 6;
          linePosArr[idx]     = posArray[i3];
          linePosArr[idx + 1] = posArray[i3 + 1];
          linePosArr[idx + 2] = posArray[i3 + 2];
          linePosArr[idx + 3] = posArray[j3];
          linePosArr[idx + 4] = posArray[j3 + 1];
          linePosArr[idx + 5] = posArray[j3 + 2];
          lineColArr[idx]     = r * alpha;
          lineColArr[idx + 1] = g * alpha;
          lineColArr[idx + 2] = b * alpha;
          lineColArr[idx + 3] = r * alpha;
          lineColArr[idx + 4] = g * alpha;
          lineColArr[idx + 5] = b * alpha;
          lineIdx++;
        }
      }
    }

    linesRef.current.geometry.setDrawRange(0, lineIdx * 2);
    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;

    if (pointsRef.current.material instanceof THREE.PointsMaterial) {
      pointsRef.current.material.opacity = (isDark ? 0.6 : 0.4) * opacity;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={isDark ? "#a78bfa" : "#7c3aed"}
          transparent
          opacity={isDark ? 0.6 : 0.4}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

interface ParticleFieldProps {
  isDark?: boolean;
}

export default function ParticleField({ isDark = true }: ParticleFieldProps) {
  const [opacity, setOpacity] = useState(1);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      let current = 1;
      const interval = setInterval(() => {
        current -= 0.03;
        if (current <= 0) {
          clearInterval(interval);
          setMounted(false);
        } else {
          setOpacity(current);
        }
      }, 60);
    }, 15000);

    const handleInteraction = () => {
      setOpacity(1);
      setMounted(true);
    };

    window.addEventListener("mousemove", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      clearTimeout(fadeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <StarfieldScene isDark={isDark} opacity={opacity} />
      </Canvas>
    </div>
  );
}
