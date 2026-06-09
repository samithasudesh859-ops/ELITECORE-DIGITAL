import React, { useRef, useEffect, useState } from 'react';

export default function Background({ isPanelOpen, setIsPanelOpen, children }) {
  const defaultColor = '#a6c8ff';
  
  const [particleCount, setParticleCount] = useState(123);
  const [maxDistance, setMaxDistance] = useState(131);
  const [connectionOpacity, setConnectionOpacity] = useState(0.7);
  const [particleSpeed, setParticleSpeed] = useState(2);
  const [particleColor, setParticleColor] = useState(defaultColor);
  const [lineColor, setLineColor] = useState(defaultColor);

 
  const [panelHeight, setPanelHeight] = useState(320); 
  const [isDragging, setIsDragging] = useState(false);

  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const connectionsCountRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 166, g: 200, b: 255 };
  };

 
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const newHeight = window.innerHeight - e.clientY;
      
      if (newHeight >= 150 && newHeight <= window.innerHeight - 100) {
        setPanelHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]); 

  useEffect(() => {
    const currentParticles = particlesRef.current;
    if (currentParticles.length < particleCount) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const newParticles = Array.from({ length: particleCount - currentParticles.length }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      }));
      particlesRef.current = [...currentParticles, ...newParticles];
    } else if (currentParticles.length > particleCount) {
      particlesRef.current = currentParticles.slice(0, particleCount);
    }
  }, [particleCount]);
   
   useEffect(() => {
  const updateMouse = (e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  };
  window.addEventListener('mousemove', updateMouse);
  return () => window.removeEventListener('mousemove', updateMouse);
}, []); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      let currentConnections = 0;
      
      const lineRgb = hexToRgb(lineColor);

      particles.forEach((p, i) => {
        p.x += p.vx * particleSpeed;
        p.y += p.vy * particleSpeed;


const dx = mouseRef.current.x - p.x;
const dy = mouseRef.current.y - p.y;
const distance = Math.sqrt(dx * dx + dy * dy);
const mouseRadius = 200; 

if (distance < mouseRadius) {
  const force = (mouseRadius - distance) / mouseRadius;
  

  p.x += dx * force * 0.02;
  p.y += dy * force * 0.02;


  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
  ctx.strokeStyle = `rgba(166, 200, 255, ${force * 0.5})`; 
  ctx.stroke();
}

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            currentConnections++;
            const opacity = (1 - distance / maxDistance) * connectionOpacity;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineRgb.r}, ${lineRgb.g}, ${lineRgb.b}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      if (connectionsCountRef.current) {
        connectionsCountRef.current.innerText = currentConnections.toLocaleString();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [maxDistance, connectionOpacity, particleSpeed, particleColor, lineColor]);

  const resetColors = () => {
    setParticleColor(defaultColor);
    setLineColor(defaultColor);
  };


const drawerStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '350px', 
  height: '100vh', 
  backgroundColor: 'rgba(11, 12, 16, 0.95)',
  backdropFilter: 'blur(15px)',
  borderRight: '1px solid rgba(255, 255, 255, 0.1)', 
  color: '#fff',
  fontFamily: 'sans-serif',
  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: isPanelOpen ? 'translateX(0)' : 'translateX(-100%)', 
  zIndex: 1000, 
  display: 'flex',
  flexDirection: 'column',
};

  const dragHandleWrapStyles = {
    width: '100%',
    padding: '12px 0',
    cursor: 'ns-resize',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  };

  const dragHandleStyles = {
    width: '50px',
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '2px',
  };

  const containerStyles = { maxWidth: '900px', margin: '0 auto', width: '100%' };
  const scrollContainerStyles = { flex: 1, overflowY: 'auto', padding: '1rem 2rem 2rem 2rem' };
  
  const headerContainerStyles = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' };
  const statsWrapStyles = { display: 'flex', gap: '4rem' };
  const statBoxStyles = { textAlign: 'center' };
  const statLabelStyles = { fontSize: '12px', color: '#8b949e', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' };
  const statValueStyles = { fontSize: '24px', fontWeight: '600', color: particleColor }; 
  const resetBtnStyles = { background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', transition: 'all 0.2s ease' };

  const controlsGridStyles = { 
  display: 'grid', 
  gridTemplateColumns: '1fr', 
  gap: '1.5rem' 
};
  const controlRowStyles = { display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
  const labelStyles = { fontSize: '13px', flex: '1', color: '#c9d1d9' };
  const sliderStyles = { flex: '2', margin: '0 1rem', cursor: 'pointer', accentColor: particleColor };
  const valueBoxStyles = { backgroundColor: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: '4px', fontSize: '13px', minWidth: '40px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' };
  const colorInputStyles = { width: '50px', height: '28px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'transparent' };

return (
  <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
    
    <canvas ref={canvasRef} style={{ display: 'block', width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }} />

    <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
      {children}
    </div>

    <div style={{ ...drawerStyles, zIndex: 1000, pointerEvents: 'auto' }}>
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(11, 12, 16, 0.95)' }}>
        <h2 style={{ fontSize: '18px', margin: 0 }}>Control Panel</h2>
        <button onClick={() => setIsPanelOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px 12px', borderRadius: '50%', cursor: 'pointer' }}>✕</button>
      </div>
      
      <div style={scrollContainerStyles}>
        <div style={containerStyles}>
          <div style={headerContainerStyles}>
             <div style={statsWrapStyles}>
               <div style={statBoxStyles}><div style={statLabelStyles}>Active Particles</div><div style={statValueStyles}>{particleCount}</div></div>
               <div style={statBoxStyles}><div style={statLabelStyles}>Connections</div><div style={statValueStyles} ref={connectionsCountRef}>0</div></div>
             </div>
             <button style={resetBtnStyles} onClick={resetColors}>↺ Reset Colors</button>
          </div>

          <div style={controlsGridStyles}>
             <div style={controlRowStyles}><span style={labelStyles}>Particle Count</span><input type="range" min="10" max="300" value={particleCount} onChange={(e) => setParticleCount(Number(e.target.value))} style={sliderStyles} /><span style={valueBoxStyles}>{particleCount}</span></div>
             <div style={controlRowStyles}><span style={labelStyles}>Connection Distance</span><input type="range" min="50" max="300" value={maxDistance} onChange={(e) => setMaxDistance(Number(e.target.value))} style={sliderStyles} /><span style={valueBoxStyles}>{maxDistance}</span></div>
             <div style={controlRowStyles}><span style={labelStyles}>Opacity</span><input type="range" min="0.1" max="1" step="0.1" value={connectionOpacity} onChange={(e) => setConnectionOpacity(Number(e.target.value))} style={sliderStyles} /><span style={valueBoxStyles}>{connectionOpacity}</span></div>
             <div style={controlRowStyles}><span style={labelStyles}>Speed</span><input type="range" min="0" max="10" step="0.5" value={particleSpeed} onChange={(e) => setParticleSpeed(Number(e.target.value))} style={sliderStyles} /><span style={valueBoxStyles}>{particleSpeed}</span></div>
             <div style={controlRowStyles}><span style={labelStyles}>Dots Color</span><input type="color" value={particleColor} onChange={(e) => setParticleColor(e.target.value)} style={colorInputStyles} /></div>
             <div style={controlRowStyles}><span style={labelStyles}>Lines Color</span><input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} style={colorInputStyles} /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}