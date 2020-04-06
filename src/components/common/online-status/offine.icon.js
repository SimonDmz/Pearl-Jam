import React from 'react';

const Icon = ({ width = 60, height = 60, color = '#414c5c' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="-0.5 -0.5 112 112"
    width={width}
    height={height}
  >
    <defs />
    <g>
      <ellipse
        cx="55.5"
        cy="55.5"
        rx="52.5"
        ry="52.5"
        fill={color}
        stroke="none"
        pointerEvents="all"
      />
      <path
        d="M 23 53.38 L 53.38 53.38 L 53.38 20.5 L 57.62 20.5 L 57.62 53.38 L 88 53.38 L 88 57.62 L 57.62 57.62 L 57.62 90.5 L 53.38 90.5 L 53.38 57.62 L 23 57.62 Z"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="7"
        strokeMiterlimit="10"
        transform="rotate(45,55.5,55.5)"
        pointerEvents="all"
      />
    </g>
  </svg>
);

export default Icon;
