import { gsap } from 'gsap';
import React, { useState, useEffect, useRef } from 'react';

import './CVDownloadTab.css';

interface ICVDownloadTabProps {
  driveUrl?: string;
  className?: string;
}

const CVDownloadTab: React.FC<ICVDownloadTabProps> = ({
  driveUrl = 'https://drive.google.com/drive/folders/1oharH6vMmmjvYD1Ti6kQho2vJEuuvCT0?usp=drive_link', // Default Google Drive link
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animation
  useEffect(() => {
    if (tabRef.current) {
      // Animate in from the right with a delay
      gsap.from(tabRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.8,
        delay: 0.5 // 2 second delay before appearing
      });
    }
  }, []);

  // Hover animations
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (tabRef.current) {
      gsap.to(tabRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (tabRef.current) {
      gsap.to(tabRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleOpenDrive = () => {
    if (isOpening) return;

    setIsOpening(true);

    try {
      // Open Google Drive link in a new tab
      window.open(driveUrl, '_blank', 'noopener,noreferrer');

      // Add a small delay to show the opening state
      setTimeout(() => {
        setIsOpening(false);
      }, 800);
    } catch (error) {
      console.error('Error opening Drive link:', error);
      setIsOpening(false);
    }
  };

  return (
    <div
      ref={tabRef}
      className={`cv-download-tab ${className} ${isHovered ? 'cv-download-tab--hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOpenDrive}
      role="button"
      tabIndex={0}
      aria-label="Open CV/Resume in Google Drive"
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpenDrive();
        }
      }}
    >
      <div className="cv-tab-content">
        <div className="cv-tab-text">
          <span className="cv-tab-label">Get my CV</span>
        </div>
        <div className="cv-tab-icon">
          {isOpening ? (
            <svg
              className="cv-download-spinner"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="28.27"
                strokeDashoffset="28.27"
              />
            </svg>
          ) : (
            <svg
              className="cv-download-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V8C20 6.89543 19.1046 6 18 6H14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L12 15L15 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 15V9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVDownloadTab;
