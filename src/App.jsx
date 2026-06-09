import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useInView } from 'framer-motion';
import { Html } from '@react-three/drei';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Footer from './components/Footer';
import Background from './Background';
import LiquidOrb2D from './LiquidOrb2D'; 
import LiquidOrb3D from './LiquidOrb3D';
import Contact from './components/Contact';


export default function App() {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false); 
const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
const [viewMode, setViewMode] = useState('2D');
const [isTransitioning, setIsTransitioning] = useState(false);
  
  const servicesRef = useRef(null);
  const isServicesInView = useInView(servicesRef, { amount: 0.3 });

  const handleToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setViewMode(prev => prev === '2D' ? '3D' : '2D');
      setIsTransitioning(false);
    }, 1000);
  };

return (
  <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', background: '#000' }}>

    <div style={{ 
      position: 'fixed', 
      bottom: '30px', 
      right: '30px', 
      zIndex: 99999, 
      display: 'flex', 
      gap: '10px' 
    }}>
      

      
      <button 
        onClick={handleToggle}
        style={{ 
          background: '#000', border: '1px solid #00f2ff', color: '#fff',
          padding: '10px 20px', borderRadius: '20px', cursor: 'pointer'
        }}
      >
        {isTransitioning ? 'PROCESSING...' : (viewMode === '2D' ? 'SWITCH TO 3D' : 'SWITCH TO 2D')}
      </button>
    </div>


    <Background isPanelOpen={isControlPanelOpen} setIsPanelOpen={setIsControlPanelOpen} />

   
    <div style={{ 
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
      zIndex: 1, 
      pointerEvents: viewMode === '3D' ? 'auto' : 'none' 
    }}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        dpr={[1, 2]}
      >
        {isTransitioning ? (
          <Html center>
            <div style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>PROCESSING...</div>
          </Html>
        ) : (
          viewMode === '2D' ? <LiquidOrb2D isVisible={isServicesInView} /> : <LiquidOrb3D />
        )}
      </Canvas>
    </div>

   
    <main style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}>
      <Navbar isPanelOpen={isControlPanelOpen} setIsPanelOpen={setIsControlPanelOpen} />
      <section id="hero"><Hero /></section>
      <section id="about"><About /></section>
      <section ref={servicesRef} id="services"><Services /></section>
      <section id="contact"><Contact /></section>
      <section id="footer"><Footer /></section>
    </main>
  </div>
);
}