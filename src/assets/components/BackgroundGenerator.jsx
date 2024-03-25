import React, { useState } from 'react';
import './BackgroundGenerator.css';
import BackgroundInfo from './BackgroundInfo';
import AmazingGradients from './AmazingGradients';

const BackgroundGenerator = ({ onColorChange }) => {
  const [gradientType, setGradientType] = useState('linear');
  const [colors, setColors] = useState(['#a04040', '#317769']);
  
  const handleColorChange = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
    // Call onColorChange with the updated colors
    onColorChange(newColors);
  };

  const handleGradientTypeChange = (type) => {
    setGradientType(type);
  };

  const handleGradientClick = (color1, color2) => {
    setColors([color1, color2]);
    // Call onColorChange with the updated colors
    onColorChange([color1, color2]);
  };

  const backgroundStyle = {
    background: `${gradientType}-gradient(${colors.join(', ')})`
  };

  return (
    <div className='BG_Wrapper'>
      <div className="BackgroundGenerator">
        <h2 style={{ backgroundImage: `linear-gradient(to left, ${colors[0]}, ${colors[1]})` }}>Create Gradient:</h2>
        <div className="controls">
          <div className="color-picker">
            {colors.map((color, index) => (
              <input
                key={index}
                type="color"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
              />
            ))}
          </div>

          <div className="gradient-types">
            <button
              className={gradientType === 'linear' ? 'active' : 'gradient_type'}
              onClick={() => handleGradientTypeChange('linear')}
            >
              Linear Gradient
            </button>
            <button
              className={gradientType === 'radial' ? 'active' : 'gradient_type'}
              onClick={() => handleGradientTypeChange('radial')}
            >
              Radial Gradient
            </button>
          </div>
        </div>

        <div className="background-preview" style={backgroundStyle}></div>

        <BackgroundInfo gradientType={gradientType} colors={colors} />
      </div>

      
      <AmazingGradients onGradientClick={handleGradientClick} colors={colors} />
    </div>
  );
};

export default BackgroundGenerator;
