import React, { useEffect, useRef } from 'react';
import { Sphere, MeshTransmissionMaterial, OrbitControls, Environment, Stars, Sparkles } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function LiquidOrb3D() {
  const { scene } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    scene.fog = new THREE.Fog('#000000', 5, 30);
    return () => { scene.fog = null; };
  }, [scene]);

  useFrame(() => {
    if (controlsRef.current) {
  
      if (!controlsRef.current.state) {
        controlsRef.current.autoRotate = true;
      }
    }
  });

  return (
    <group>
      <OrbitControls 
        ref={controlsRef}
        makeDefault 
        enableRotate={true} 
        enableZoom={true} 
        enablePan={false}
        autoRotate={true}         
        autoRotateSpeed={0.8}    
        enableDamping={true}     
        dampingFactor={0.05}
        minPolarAngle={0}
        maxPolarAngle={Math.PI} 
      />
      
      <directionalLight position={[20, 10, 5]} intensity={5} color="#ffcc66" />
      <Environment preset="city" />
      
      
      <Stars radius={200} depth={100} count={8000} factor={6} />
      <Sparkles count={200} scale={15} size={4} speed={0.4} opacity={0.8} color="#ffffff" />
  
      <Sphere args={[1.5, 64, 64]}>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={1.0}
          roughness={0.1}
          ior={1.5}
          color={"#ffffff"}
        />
      </Sphere>

      <ambientLight intensity={0.3} />
    </group>
  );
}