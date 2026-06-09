
import React from 'react';

export default function Footer() {
  return (
    <footer style={{ 
      padding: '80px 40px', 
      backgroundColor: '#050505', 
      borderTop: '1px solid #1a1a1a', 
      color: '#fff' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        
        
        <div>
          <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>Operating Principles</h3>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
            <li><strong>Transparency First:</strong> Open communication throughout.</li>
            <li><strong>Performance-Driven:</strong> Optimized for speed and scalability.</li>
            <li><strong>Security & Confidentiality:</strong> Your data, our priority.</li>
          </ul>
        </div>

     
        <div>
          <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>Legal Framework</h3>
          <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: '1.6' }}>
            <strong>Scope:</strong> Defined by formal proposal. <br/>
            <strong>Payment:</strong> 50% deposit required to commence. <br/>
            <strong>IP:</strong> Ownership transfers upon full payment. <br/>
            <strong>Liability:</strong> We ensure high standards but are not liable for 3rd party service failures.
          </p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '0.8rem', opacity: '0.5' }}>
        &copy; 2026 EliteCore Digital. All Rights Reserved.
      </div>
    </footer>
  );
}