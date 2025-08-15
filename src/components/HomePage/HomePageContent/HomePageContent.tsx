import './HomePageContent.css';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

import NameIntroduction from '../NameIntroduction/NameIntroduction';

import ContactMeButton from '@/components/ContactMeButton/ContactMeButton';

const HomePageContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = containerRef.current ? Array.from(containerRef.current.children) : [];
    if (elements) {
      gsap.from(elements, {
        x: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      });
    }
  }, []);
  return (
    <section className="home-page-content" ref={containerRef}>
      <h1 className="home-title">Hello 👋, I am</h1>

      <NameIntroduction />

      <p className="description">who loves to learn and adopt new technologies.</p>

      <div className="divider" />

      <div className="contact-me-button">
        <ContactMeButton />
      </div>
    </section>
  );
};

export default HomePageContent;
