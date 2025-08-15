import React, { Fragment } from 'react';

import { isMobileDevice } from '@/utils';
import './NameIntroduction.css';

const NameIntroduction: React.FC = () => {
  return (
    <div className="home-name-container">
      <h2 className="home-name-introduction">
        {'Ngo Tran Bao Thach'.split('').map((char, idx) => (
          <Fragment key={idx}>
            <span className={`name-letter`}>{char === ' ' ? '\u00A0' : char}</span>
            {idx === 8 && isMobileDevice() && document.documentElement.clientWidth <= 500 ? (
              <br />
            ) : (
              ''
            )}
          </Fragment>
        ))}
      </h2>
    </div>
  );
};

export default NameIntroduction;

