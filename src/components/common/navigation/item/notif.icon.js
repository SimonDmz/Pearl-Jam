import React from 'react';

const Icon = ({ number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="-0.5 -0.5 112 112"
    width="30px"
    height="30px"
  >
    <defs />
    <g>
      <ellipse
        cx="55.5"
        cy="55.5"
        rx="55.5"
        ry="55.5"
        fill="#ff0000"
        stroke="none"
        pointerEvents="all"
      />
      <g transform="translate(-0.5 -0.5)">
        <switch>
          <foreignObject
            style={{ overflow: 'visible', textAlign: 'left' }}
            pointerEvents="none"
            width="100%"
            height="100%"
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                display: 'flex',
                alignItems: 'unsafe center',
                justifyContent: 'unsafe center',
                width: '103px',
                height: '1px',
                paddingTop: '56px',
                marginLeft: '4px',
              }}
            >
              <div style={{ boxSizing: 'border-box', fontSize: '0', textAlign: 'center' }}>
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '12px',
                    fontFamily: 'Helvetica',
                    color: '#000000',
                    lineHeight: '1.2',
                    pointeEvents: 'all',
                    whiteSpace: 'normal',
                    wordWrap: 'normal',
                  }}
                >
                  <font color="#ffffff" size="1">
                    <b style={{ fontSize: '51px' }}>{number}</b>
                  </font>
                </div>
              </div>
            </div>
          </foreignObject>
        </switch>
      </g>
    </g>
  </svg>
);

export default Icon;
