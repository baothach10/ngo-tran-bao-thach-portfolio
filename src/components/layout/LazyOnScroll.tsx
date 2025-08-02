import React, { useEffect, useRef, useState, Suspense, useCallback } from 'react';

interface ILazyOnScrollProps {
  Component: React.LazyExoticComponent<React.FC<Record<string, unknown>>>;
  fallback?: React.ReactNode;
  componentProps?: Record<string, unknown>;
  placeholder?: React.ReactNode;
  estimatedHeight?: string;
  rootMargin?: string;
  autoAdjustHeight?: boolean;
}

const LazyOnScroll: React.FC<ILazyOnScrollProps> = ({
  Component,
  fallback = null,
  componentProps = {},
  rootMargin = '100px 0px',
  placeholder,
  autoAdjustHeight = true
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  // Measure content height after it loads
  const measureContent = useCallback(() => {
    if (contentRef.current && autoAdjustHeight) {
      setIsContentLoaded(true);
    }
  }, [autoAdjustHeight]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: rootMargin, // Start loading 100px before the element enters viewport or it can be customized
        threshold: 0.1 // Trigger when 10% becomes visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Measure content after it's loaded
  useEffect(() => {
    if (isVisible && contentRef.current) {
      // Use ResizeObserver to detect when content changes size
      const resizeObserver = new ResizeObserver(() => {
        measureContent();
      });

      // Initial measurement with a slight delay to ensure content is rendered
      const timer = setTimeout(measureContent, 100);

      if (contentRef.current) {
        resizeObserver.observe(contentRef.current);
      }

      return () => {
        clearTimeout(timer);
        resizeObserver.disconnect();
      };
    }
    // If not visible or no contentRef, return undefined (no cleanup needed)
    return undefined;
  }, [isVisible, measureContent]);


  const defaultPlaceholder = (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px dashed rgba(255, 255, 255, 0.2)',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '14px'
      }}
    >
      Loading section...
    </div>
  );

  return (
    <div
      ref={ref}
      className="lazy-scroll-container"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100%',
        transition: autoAdjustHeight && isContentLoaded ? 'min-height 0.3s ease-out' : 'none'
      }}
    >
      {isVisible ? (
        <div ref={contentRef} style={{ width: '100%' }}>
          <Suspense fallback={fallback}>
            <Component {...componentProps} />
          </Suspense>
        </div>
      ) : (
        placeholder || defaultPlaceholder
      )}
    </div>
  );
};

export default LazyOnScroll;
