import React, { useEffect, useRef } from 'react';
import { Sphere, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
function SmokeOverlay({ isVisible }) {
  const vidDefault = useRef(document.createElement("video"));
  const vidService = useRef(document.createElement("video"));

  useEffect(() => {
    const vD = vidDefault.current;
    const vS = vidService.current;
    
    // වීඩියෝව ප්ලේ වීමට අවශ්‍ය මූලික සැකසුම්
    vD.src = "/smoke.mp4";
    vD.muted = true;
    vD.loop = true;
    vD.playsInline = true; // Live site එකේදී අනිවාර්යයි
    vD.play().catch(() => {}); 

    vS.src = "/smoke.mp4";
    vS.muted = true;
    vS.loop = true;
    vS.playsInline = true; // Live site එකේදී අනිවාර්යයි
    vS.play().catch(() => {});
  }, []);

  const activeVideo = isVisible ? vidService.current : vidDefault.current;
  
  // මෙන්න වැදගත් වෙනස: useMemo භාවිතයෙන් Texture එක එක වරක් පමණක් සාදන්න
  const texture = React.useMemo(() => {
    const tex = new THREE.VideoTexture(activeVideo);
    return tex;
  }, [activeVideo]); // activeVideo මාරු වන විට පමණක් texture එක අලුත් වේ

  return (
    <Sphere args={[1.35, 64, 64]}> 
      <meshBasicMaterial
        map={texture}
        transparent={true}
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </Sphere>
  );
}

export default function LiquidOrb({ isVisible }) {
  return (
    <Float speed={1.5}>
      <group>
        <Sphere args={[1.5, 64, 64]}>
          <MeshTransmissionMaterial transmission={1} roughness={0} />
        </Sphere>
        <SmokeOverlay isVisible={isVisible} />
        <pointLight intensity={2} color="#00aaff" />
      </group>
    </Float>
  );
}