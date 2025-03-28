// src/components/Button.jsx
'use client';

import React from 'react';

const Button = ({ text, onClick }) => {
    return (
        <button 
            onClick={onClick} 
            style={{
                padding: '10px 20px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}
        >
            {text}
        </button>
    );
};

export default Button;
