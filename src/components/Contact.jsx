import React from 'react';

const Contact = () => {
  return (
    <section id="contact" style={{ 
      padding: '80px 20px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '60vh'
    }}>
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        backdropFilter: 'blur(10px)', 
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        color: '#fff',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Contact Us</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Name" style={inputStyle} />
          <input type="email" placeholder="Email" style={inputStyle} />
          <textarea placeholder="Message" style={{ ...inputStyle, height: '100px' }} />
          <button type="submit" style={buttonStyle}>Send Message</button>
        </form>
      </div>
    </section>
  );
};

const inputStyle = {
  padding: '12px',
  borderRadius: '10px',
  border: 'none',
  background: 'rgba(255, 255, 255, 0.1)',
  color: '#fff'
};

const buttonStyle = {
  padding: '12px',
  borderRadius: '10px',
  border: '1px solid #00f2ff',
  background: 'transparent',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default Contact;