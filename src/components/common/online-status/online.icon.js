import React from 'react';

const Icon = ({ width = 60, height = 60 }) => (
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
        fill="#00cc00"
        stroke="none"
        pointerEvents="all"
      />
      <path
        d="M 42 83 L 92 33"
        fill="none"
        stroke="#ffffff"
        strokeWidth="12"
        strokeMiterlimit="10"
        pointerEvents="stroke"
      />
      <path
        d="M 20 53 L 25 58 Q 30 63 37.07 70.07 L 50 83"
        fill="none"
        stroke="#ffffff"
        strokeWidth="12"
        strokeMiterlimit="10"
        pointerEvents="stroke"
      />
    </g>
  </svg>
);

export default Icon;
