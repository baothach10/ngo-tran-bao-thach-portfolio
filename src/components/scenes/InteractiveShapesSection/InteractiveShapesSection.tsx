import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from 'gsap/all';
import React, { useRef, useState } from 'react';

import { InteractiveShapesScene } from '../InteractiveShapesScene/InteractiveShapesScene';

import usePhaser from '@/hooks/usePhaser';
import { isMobileDevice } from '@/utils';

import './InteractiveShapesSection.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface IInteractiveShapesSectionProps {
  width?: number;
  height?: number;
  backgroundColor?: number;
  className?: string;
  enableWorldBounds?: boolean;
  shapeSize?: number;
  shapeLabels?: string[];
}

const InteractiveShapesSection: React.FC<IInteractiveShapesSectionProps> = ({
  width = 800,
  height = 600,
  backgroundColor = 0x2c3e50,
  className = '',
  enableWorldBounds = true,
  shapeSize = 100,
  shapeLabels = ['C', 'S', 'H', '★']
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const isMobile = isMobileDevice();

  // Initialize Phaser with manual control (autoInit: false)
  const { mountRef, initializeGame, isInitialized } = usePhaser({
    sceneKey: `InteractiveShapesSection-${Math.random().toString(36).substring(2, 9)}`,
    sceneClass: class extends InteractiveShapesScene {
      constructor() {
        super({ enableWorldBounds, shapeSize, shapeLabels });
      }
    },
    gameWidth: width,
    gameHeight: height,
    backgroundColor,
    physics: {
      default: 'matter',
      matter: {
        gravity: { x: 0, y: 1 },
        debug: false
      }
    },
    isPixelArt: false,
    hasAntialiasing: true,
    isTransparent: true,
    autoInit: false // Disable auto-initialization
  });

  // ScrollTrigger to initialize Phaser when component comes into view
  useGSAP(() => {
    if (!containerRef.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 90%',
      end: 'bottom 10%',
      onEnter: async () => {
        if (!hasInitialized && !isInitialized) {
          setHasInitialized(true);

          try {
            await initializeGame();
          } catch (error) {
            console.error('Failed to initialize Phaser game:', error);
            setHasInitialized(false);
          }
        }
      },
      onLeave: () => {
        // Handle leaving viewport from bottom (scrolling down)
        handleContainerLeave();
      },
      onEnterBack: () => {
        // Handle re-entering viewport from bottom (scrolling up)
        // Optionally reset overlay state when coming back into view
        if (isMobile && overlayRef.current) {
          handleContainerLeave(); // Show overlay again
        }
      },
      onLeaveBack: () => {
        // Handle leaving viewport from top (scrolling up)
        handleContainerLeave();
      }
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [hasInitialized, isInitialized]);

  // Handle overlay touch to hide it with GSAP animation
  const handleOverlayTouch = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        ease: 'power2.out',
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { pointerEvents: 'none' });
            overlayRef.current.style.zIndex = '-1'; // Hide overlay visually
          }
        }
      });
    }
  };

  // Handle outside click to show overlay again on mobile with GSAP animation
  const handleContainerLeave = () => {
    if (isMobile && overlayRef.current) {
      gsap.to(overlayRef.current, {
        pointerEvents: 'auto',
        opacity: 1,
        ease: 'power2.out',
        onStart: () => {
          if (overlayRef.current) {
            overlayRef.current.style.zIndex = '1'; // Show overlay visually
          }
        }
      });
    }
  };

  return (
    <div
      ref={containerRef}
      id={`interactive-shapes-section-${Math.random().toString(36).substring(2, 9)}`}
      className={`interactive-shapes-section-container ${className}`}
      onMouseLeave={handleContainerLeave}
    >
      <div
        ref={mountRef}
        className="interactive-shapes-section"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: 'transparent'
        }}
      >
        {/* Loading placeholder while Phaser initializes */}
        {!isInitialized && hasInitialized && (
          <div className="phaser-loading-placeholder">
            <div className="loading-spinner"></div>
            <p>Loading interactive shapes...</p>
            <small>
              {shapeLabels.filter(label => label.trim() !== '').length} skills to explore
            </small>
          </div>
        )}

        {/* Placeholder before initialization */}
        {!hasInitialized && (
          <div className="phaser-placeholder">
            <div className="placeholder-icon">🎯</div>
            <p>Interactive canvas will load when visible</p>
          </div>
        )}
      </div>

      {/* Overlay for mobile scrolling - always rendered, controlled by GSAP */}
      {isMobile && (
        <div ref={overlayRef} className="interactive-shapes-overlay">
          <div
            className="overlay-content"
            onTouchStart={handleOverlayTouch}
            onClick={handleOverlayTouch}
          >
            <div className="overlay-icon">👆</div>
            <p>Tap to interact with shapes</p>
            <small>Tap outside to dismiss</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveShapesSection;
