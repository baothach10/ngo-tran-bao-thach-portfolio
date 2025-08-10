import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import './ModalWrapper.css';
import React, { useEffect, useRef, useState } from 'react';


import CloseButton from '../CloseButton/CloseButton';

import { isMobileDevice } from '@/utils';


interface ISection {
  id: string;
  label: string;
}

interface IModalWrapperProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalWrapper: React.FC<IModalWrapperProps> = ({ children, isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<ISection[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && wrapperRef.current) {
      const wrapper = wrapperRef.current;
      const elementTop = element.offsetTop;
      const targetScrollTop = elementTop - 100; // Offset for better visibility

      wrapper.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  };

  // Function to be passed to children to receive sections
  const handleSectionsUpdate = (newSections: ISection[]) => {
    setSections(newSections);
  };

  // Clone children with navigation handler
  const childrenWithProps = React.isValidElement(children)
    ? React.cloneElement(
      children as React.ReactElement<{ onNavigate?: (sections: ISection[]) => void }>,
      {
        onNavigate: handleSectionsUpdate
      }
    )
    : children;

  useEffect(() => {
    if (isOpen && wrapperRef.current && !isMobileDevice()) {
      // Set up intersection observer to track active section
      const observerOptions = {
        root: wrapperRef.current,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      // Observe all sections
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.observe(element);
        }
      });

      return () => observer.disconnect();
    }
    return undefined;
  }, [sections, isOpen]);

  useGSAP(() => {
    if (isOpen && containerRef.current && backdropRef.current) {
      // Prevent body scroll when modal is open
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      // Get scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      gsap.to(backdropRef.current, { backdropFilter: 'blur(10px)', ease: 'power3.inOut', duration: 0.5 });
      gsap.from(containerRef.current, { y: '100%', ease: 'power3.inOut', duration: 0.5 });

      // Cleanup function to restore scroll when component unmounts or modal closes
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
    return undefined;
  }, [isOpen])

  const handleCloseModal = () => {
    if (containerRef.current && backdropRef.current) {
      // Restore body scroll immediately when closing starts
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      gsap.to(backdropRef.current, { backdropFilter: 'blur(0px)', ease: 'power3.inOut', duration: 0.5 });
      gsap.to(containerRef.current, { y: '100%', ease: 'power3.inOut', duration: 0.5, onComplete: onClose });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="modal-backdrop"
      onClick={handleCloseModal}
      onTouchEnd={handleCloseModal}
    >
      <div
        ref={containerRef}
        className="modal-container"
        onClick={e => e.stopPropagation()}
        onTouchEnd={e => e.stopPropagation()}
      >
        <div ref={wrapperRef} className="modal-wrapper">
          {childrenWithProps}
        </div>
        <div className="modal-close-button">
          <CloseButton onClose={handleCloseModal} />
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
