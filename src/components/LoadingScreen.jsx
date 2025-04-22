import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="donut-spinner"></div>
        <p className="loading-text">Loading...</p>
        <p className="loading-quote">"Mmm... Donuts"</p>
      </div>
    </div>
  );
};

export default LoadingScreen; 