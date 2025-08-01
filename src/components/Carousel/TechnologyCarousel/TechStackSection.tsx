import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

import TechnologyCarousel from './TechnologyCarousel';

import { SectionTitle } from '@/components/layout/SectionTitle/SectionTitle';

import './TechnologyCarousel.css';

const TechStackSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <section className="tech-stack-section">
      <SectionTitle content="My Tech Stack" />
      <div className="tech-stack-container" ref={containerRef}>
        <TechnologyCarousel />
      </div>
    </section>
  );
};

export default TechStackSection;
