import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './ScrollToTopButton.css';
import { useLocation } from 'react-router-dom';

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const SCROLL_THRESHOLD = 100; // Show button after scrolling 300px
  const location = useLocation();

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const shouldShow = scrollTop > SCROLL_THRESHOLD;

    if (shouldShow !== isVisible) {
      setIsVisible(shouldShow);
    }
  }, [isVisible]);

  const scrollToTop = useCallback(() => {
    // Cancel any ongoing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Smooth scroll to top using GSAP for better control
    animationRef.current = gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: 0 },
      ease: 'power2.out'
    });
  }, []);

  useEffect(() => {
    scrollToTop(); // Scroll to top on location change
  }, [location.pathname]);

  // Handle scroll events with throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const throttledHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 5); // ~60fps
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Handle button visibility animation
  useEffect(() => {
    if (!buttonRef.current) return;

    if (isVisible) {
      gsap.to(buttonRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.2,
        ease: 'back.out(1.7)'
      });
    } else {
      gsap.to(buttonRef.current, {
        autoAlpha: 0,
        y: 20,
        scale: 0.8,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  }, [isVisible]);

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="scroll-to-top"
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
};

export default ScrollToTopButton;

