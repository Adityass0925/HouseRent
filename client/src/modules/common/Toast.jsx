import React from 'react';
// Reusable notification component
const Toast = ({ message, type }) => {
  if (!message) return null;
  const bgColor = type === 'error' ? 'red' : 'green';
  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: bgColor, color: 'white', padding: '15px', borderRadius: '5px' }}>
      {message}
    </div>
  );
};
export default Toast;