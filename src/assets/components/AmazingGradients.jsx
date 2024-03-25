import React from 'react'
import './AmazingGradients.css';
import gradientsData from './GradientsData.json';

function AmazingGradients({onGradientClick, colors}) {
  return (
    <div className="GradientsList">
      <p style={{ backgroundImage: `linear-gradient(to left, ${colors[0]}, ${colors[1]})` }}>Amazing Gradients</p>
      <div className="gradient-items">
        {gradientsData.map((gradient, index) => (
          <div
            key={index}
            className="gradient-item"
            onClick={() => onGradientClick(gradient.color1, gradient.color2)}
          >
            <div
              className="gradient-preview"
              style={{ background: `linear-gradient(to right, ${gradient.color1}, ${gradient.color2})` }}
            ></div>
            <p className="gradient-name">{gradient.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AmazingGradients