import React from 'react';
import './HelpButton.css';

const HelpButton = ({ onClick }) => {
  return (
    <button 
      className="help-button"
      onClick={onClick}
      aria-label="Open Tutorial"
      title="Need help? Click for tutorial!"
    >
      <span className="help-icon">?</span>
    </button>
  );
};

export default HelpButton; 