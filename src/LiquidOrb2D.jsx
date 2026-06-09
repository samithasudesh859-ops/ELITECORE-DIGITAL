import React, { Suspense, useEffect, useMemo } from 'react';
import { Sphere, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
function SmokeOverlay({ isVisible }) {
  const videos = React.useMemo(() => {
    const vidDefault = document.createElement("video");
    vidDefault.src = "/smoke.mp4";
    vidDefault.muted = true;
    vidDefault.loop = true;
    vidDefault.playsInline = true; // Essential for mobile/modern browsers
    
    // We don't have smoke1.mp4, so we use smoke.mp4 for both
    const vidService = document.createElement("video");
    vidService.src = "/smoke.mp4";
    vidService.muted = true;
    vidService.loop = true;
    vidService.playsInline = true;

    return { default: vidDefault, service: vidService };
  }, []);

  const [texture, setTexture] = React.useState(null);

  React.useEffect(() => {
    const activeVideo = isVisible ? videos.service : videos.default;
    
    // Create the texture only once the video is ready to play
    const newTexture = new THREE.VideoTexture(activeVideo);
    setTexture(newTexture);

    activeVideo.play().catch(e => console.log("Play failed:", e));
  }, [isVisible, videos]);

  if (!texture) return null;

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