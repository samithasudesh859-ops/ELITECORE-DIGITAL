import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    { title: "Immersive 3D Web", desc: "Architecting digital environments that defy conventional limits." },
    { title: "AI-Powered Solutions", desc: "Intelligent AI integrations for enhanced operational speed." },
    { title: "Enterprise ERP/CRM", desc: "Bespoke management systems for global operations." },
    { title: "Futuristic UI/UX", desc: "Sleek, visionary interfaces that feel effortless." }
  ];

  return (
    <section id="services" style={{ 
      padding: '100px 50px', 
      textAlign: 'center', 
      color: '#fff', 
      minHeight: '80vh',
      backgroundColor: 'transparent' 
    }}>
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{ fontSize: '3rem', marginBottom: '60px', textShadow: '0 0 20px rgba(0,170,255,0.5)' }}
      >
        Engineering the Future
      </motion.h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '30px' 
      }}>
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05, 
              borderColor: 'rgba(0, 170, 255, 0.8)',
              boxShadow: '0 0 20px rgba(0, 170, 255, 0.4)' 
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '25px',
              padding: '40px',
              backdropFilter: 'blur(20px)', 
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
          >
   <h3 style={{ 
  marginBottom: '15px', 
  fontSize: '1.6rem',          
  fontWeight: '800',             
  letterSpacing: '2px',         
  color: '#ffffff',              
  textShadow: '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff', 
  transition: 'all 0.3s ease'
}}>
  {service.title}
</h3>
            <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: '1.6' }}>{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;