import React from 'react';

const Navbar = ({ isPanelOpen, setIsPanelOpen, onOpenAI }) => {
 
  const styles = `
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .logo-container {
      position: relative;
      padding: 4px;
      border-radius: 50%;
      overflow: hidden;
    }
    .rotating-border {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border: 2px solid transparent;
      border-radius: 50%;
      background: conic-gradient(from 0deg, #00aaff, transparent 60%) border-box;
      mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;
      animation: rotate 3s linear infinite;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <nav style={navStyles}>
        
        
        <div style={logoFrameStyles} className="logo-container">
          <div className="rotating-border"></div>
          <img src="/your-logo.png" alt="Logo" style={logoImageStyles} />
        </div>
        
        <div style={{ display: 'flex' }}>
          <a href="#services" style={linkStyles}>Services</a>
          <a href="#about" style={linkStyles}>Philosophy</a>
          <a href="#contact" style={linkStyles}>Contact</a>
        </div>

        <div>
          <button style={btnStyles(!isPanelOpen)} onClick={() => setIsPanelOpen(false)}>Home</button>
          <button style={{...btnStyles(isPanelOpen), marginLeft: '10px'}} onClick={() => setIsPanelOpen(!isPanelOpen)}>Control Panel</button>
          
         
        </div>
      </nav>
    </>
  );
};

const navStyles = {
  position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
  width: '90%', maxWidth: '1100px', display: 'flex', justifyContent: 'space-between',
  alignItems: 'center', padding: '12px 30px', zIndex: 2000,
  background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(20px)',
  borderRadius: '50px', border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 0 20px rgba(0, 170, 255, 0.2)' // navbar glow
};

const logoFrameStyles = {
  width: '60px', height: '60px', display: 'flex', alignItems: 'center',
  justifyContent: 'center', cursor: 'pointer', background: 'rgba(0,0,0,0.5)'
};

const logoImageStyles = {
  width: '70%', height: '70%', objectFit: 'contain',
  filter: 'drop-shadow(0 0 8px rgba(0, 170, 255, 0.8))' 
};

const linkStyles = { color: '#fff', textDecoration: 'none', margin: '0 20px', fontSize: '14px', fontWeight: '300', opacity: 0.8 };

const btnStyles = (isActive) => ({
  background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
  color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '8px 20px',
  borderRadius: '20px', cursor: 'pointer', fontSize: '13px', backdropFilter: 'blur(10px)'
});

export default Navbar;