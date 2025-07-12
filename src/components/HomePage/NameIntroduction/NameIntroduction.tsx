import './NameIntroduction.css';
import React from 'react';

const NameIntroduction: React.FC = () => {
    return (
        <div className="home-name-container">
            <h2 className="home-name">
                {'Ngo Tran Bao Thach'.split('').map((char, idx) => (
                    <span className='name-letter' key={idx}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
            </h2>
        </div>
    );
};

export default NameIntroduction;