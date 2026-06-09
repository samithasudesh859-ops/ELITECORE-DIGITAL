
import React from 'react';

export default function About() {
  return (
    <section style={{ 
      padding: '100px 20px', 
      color: '#fff', 
      textAlign: 'center', 
      maxWidth: '800px', 
      margin: '0 auto',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>About EliteCore Digital</h2>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc' }}>
        EliteCore Digital is a premier tech studio focused on architecting immersive 3D web experiences 
        and AI-driven digital ecosystems. We bridge the gap between heavy backend logic and elegant 
        3D-driven frontend, transforming complex business ideas into high-performance digital realities. 
        Our mission is to build intelligent, scalable platforms that redefine user engagement and drive 
        business growth through innovative spatial computing and cognitive technology.
      </p>
    </section>
  );
}