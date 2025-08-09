import React, { Fragment } from 'react';

import { isMobileDevice } from '@/utils';
import './NameIntroduction.css';

const NameIntroduction: React.FC = () => {
    return (
        <div className="home-name-container">
            <h2 className="home-name">
                {'Ngo Tran Bao Thach'.split('').map((char, idx) => (
                    <Fragment key={idx}>
                        {/* Use non-breaking space for better layout control */}
                        <span className={`name-letter`}>{char === ' ' ? '\u00A0' : char}</span>
                        {idx === 8 && isMobileDevice() ? <br /> : ''}
                    </Fragment>
                ))}
            </h2>
        </div>
    );
};

export default NameIntroduction;