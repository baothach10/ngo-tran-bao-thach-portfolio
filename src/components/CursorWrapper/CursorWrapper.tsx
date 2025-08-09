import React, { useEffect, useRef, useState } from 'react';
import './CursorWrapper.css';

interface ICursorWrapperProps {
  //   children: React.ReactNode;
  cubeSpeed?: number; // Speed factor for cube following (0.1 = very slow, 1 = instant)
}

const CursorWrapper: React.FC<ICursorWrapperProps> = ({
  //   children,
  cubeSpeed = 0.15
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Cube position tracking
  const cubePosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const isAnimating = useRef(false);

  // Animate cube following with custom speed
  const animateCube = () => {
    if (!cubeRef.current || !isAnimating.current) return;

    const dx = targetPosition.current.x - cubePosition.current.x;
    const dy = targetPosition.current.y - cubePosition.current.y;

    // Apply speed factor for smooth following
    cubePosition.current.x += dx * cubeSpeed;
    cubePosition.current.y += dy * cubeSpeed;

    // Update cube position using transform for better performance
    cubeRef.current.style.left = `${cubePosition.current.x}px`;
    cubeRef.current.style.top = `${cubePosition.current.y}px`;

    // Continue animation if there's still movement
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 0.05) {
      animationFrameId.current = requestAnimationFrame(animateCube);
    } else {
      isAnimating.current = false;
    }
  };

  // Start animation loop if not already running
  const startCubeAnimation = () => {
    if (!isAnimating.current) {
      isAnimating.current = true;
      animateCube();
    }
  };

  useEffect(() => {
    // Initialize cube position to center of screen to avoid starting at (0,0)
    const initX = window.innerWidth / 2;
    const initY = window.innerHeight / 2;
    cubePosition.current = { x: initX, y: initY };
    targetPosition.current = { x: initX, y: initY };

    if (cubeRef.current) {
      cubeRef.current.style.left = `${initX}px`;
      cubeRef.current.style.top = `${initY}px`;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };

      // Update cursor position immediately using transform for better performance
      if (cursorRef.current) {
        cursorRef.current.style.left = `${newPosition.x}px`;
        cursorRef.current.style.top = `${newPosition.y}px`;
      }

      // Update cube target position immediately
      targetPosition.current = { x: newPosition.x, y: newPosition.y };
      startCubeAnimation();
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setIsHovering(false); // Disable hover effect on click
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick ||
        target.style.cursor === 'pointer'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);

      // Cleanup animations
      isAnimating.current = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="cursor-wrapper">
      {/* {children} */}

      {/* Custom cursor dot */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      />

      {/* Following cube */}
      <div
        ref={cubeRef}
        className={`cursor-cube ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      />
    </div>
  );
};

export default CursorWrapper;
