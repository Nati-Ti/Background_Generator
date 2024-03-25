import React from 'react';
import './BackgroundInfo.css';

const BackgroundInfo = ({ gradientType, colors }) => {
  const hexToRgb = (hex) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const rgbCodes = colors.map((color) => hexToRgb(color));

  const handleDownload = () => {
    // Create a canvas element to draw the gradient
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    // Set canvas size
    canvas.width = 1280;
    canvas.height = 720;
  
    // Create a gradient based on the selected type
    let gradient;
    if (gradientType === 'linear') {
      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    } else if (gradientType === 'radial') {
      gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    }
    
    // Add colors to the gradient
    colors.forEach((color, index) => {
      gradient.addColorStop(index / (colors.length - 1), hexToRgb(color));
    });
  
    // Fill the canvas with the gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Convert the canvas to an image
    const dataURL = canvas.toDataURL('image/png');
  
    // Create a temporary link and trigger the download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'background.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="BackgroundInfo">
      <div className='selected_colors'>
        <h2 style={{ backgroundImage: `linear-gradient(to left, ${colors[0]}, ${colors[1]})` }}>Selected Colors:</h2>
        <ul>
          {rgbCodes.map((code, index) => (
            <li key={index}>
              <div className="color-box" style={{ backgroundColor: colors[index] }}></div>
              {code}
            </li>
          ))}
        </ul>
      </div>

      <div className='download_wrapper'>
        <button onClick={handleDownload}>Download Gradient as Image</button>
      </div>
    </div>
  );
};

export default BackgroundInfo;
