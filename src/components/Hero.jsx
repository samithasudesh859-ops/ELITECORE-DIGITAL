import { Canvas } from '@react-three/fiber';
import LiquidOrb2D from "../LiquidOrb2D";

export default function Hero() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
     
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={0.5} />
          <LiquidOrb2D />
        </Canvas>
      </div>

      
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        color: '#fff', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        pointerEvents: 'none',
        padding: '0 20px'
      }}>
        <h1 style={{ fontSize: '4.5rem', margin: 0 }}>EliteCore Digital</h1>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '30px' }}>
          Architecting Immersive Digital Realities.
        </p>

        
        <div style={{ maxWidth: '700px', textAlign: 'center', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '15px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Architecting the Next Generation of the Web</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', opacity: '0.9' }}>
            At EliteCore Digital, we believe the web is evolving beyond static screens into living, breathing digital ecosystems. 
            Our approach is rooted in the intersection of Spatial Computing and Cognitive AI.
          </p>
        </div>
      </div>
    </div>
  );
}