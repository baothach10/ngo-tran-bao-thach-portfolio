import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

import ContactMeButton from '@/components/ContactMeButton/ContactMeButton';
import { SectionTitle } from '@/components/layout/SectionTitle/SectionTitle';
import './ReadyToDiscuss.css';

const ReadyToDiscuss = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && buttonRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1 });
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1, delay: 0.5 }
      );
    }
  }, []);

  return (
    <section className="ready-to-discuss-container">
      <div className="ready-to-discuss-title">
        <SectionTitle content="Ready To Discuss About Your Project?" />
      </div>
      <div className="ready-to-discuss-content" ref={contentRef}>
        <p>Just send an email to explore how I can help you achieve your digital goals.</p>
      </div>
      <div className="contact-button-container" ref={buttonRef}>
        <ContactMeButton content="Get in touch" />
      </div>
    </section>
  );
};

export default ReadyToDiscuss;

