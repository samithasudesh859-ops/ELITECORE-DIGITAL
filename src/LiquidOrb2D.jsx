import React, { Suspense, useEffect, useMemo } from 'react';
import { Sphere, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function SmokeOverlay({ isVisible }) {
  // වීඩියෝ මූලද්‍රව්‍ය නිර්මාණය
  const videos = useMemo(() => {
    const vidDefault = document.createElement("video");
    vidDefault.src = "/smoke.mp4"; // ඔබේ එකම වීඩියෝ ෆයිල් එක
    vidDefault.muted = true;
    vidDefault.loop = true;
    vidDefault.playsInline = true;
    
    const vidService = document.createElement("video");
    vidService.src = "/smoke.mp4"; // එකම ෆයිල් එක
    vidService.muted = true;
    vidService.loop = true;
    vidService.playsInline = true;

    return { default: vidDefault, service: vidService };
  }, []);

  useEffect(() => {
    const activeVideo = isVisible ? videos.service : videos.default;
    const inactiveVideo = isVisible ? videos.default : videos.service;

    activeVideo.play().catch(() => {});
    inactiveVideo.pause();
  }, [isVisible, videos]);

  // Texture එක ස්ථාවරව පවත්වා ගැනීම (මෙය ඔබේ ප්‍රශ්නය විසඳයි)
  const activeVideo = isVisible ? videos.service : videos.default;
  const texture = useMemo(() => new THREE.VideoTexture(activeVideo), [activeVideo]);

  return (
    <Sphere args={[1.35, 64, 64]}> 
      <meshBasicMaterial
        map={texture}
        transparent={true}
        blending={THREE.NormalBlending}
        depthWrite={false}
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </Sphere>
  );
}

export default function LiquidOrb({ isVisible }) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        <Sphere args={[1.5, 64, 64]}>
          <MeshTransmissionMaterial
            backside={true}
            transmission={1}
            thickness={0.5}
            roughness={0}
            ior={1.45}
            chromaticAberration={0.02}
            color={"#ffffff"}
            background={new THREE.Color("#000000")} 
          />
        </Sphere>

        <Suspense fallback={null}>
          <SmokeOverlay isVisible={isVisible} />
        </Suspense>

        <pointLight position={[0, 0, 0]} intensity={2} color="#00aaff" />
      </group>
    </Float>
  );
}