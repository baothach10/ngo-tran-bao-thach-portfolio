import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import ContactMeButton from '@/components/ContactMeButton/ContactMeButton';
import { SectionTitle } from '@/components/layout/SectionTitle/SectionTitle';
import './ReadyToDiscuss.css';

gsap.registerPlugin(ScrollTrigger);

const ReadyToDiscuss = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const observer = new MutationObserver(() => {
      if (contentRef.current && buttonRef.current) {
        observer.disconnect();

        ScrollTrigger.create({
          trigger: contentRef.current,
          id: 'ready-to-discuss-content',
          start: 'top 90%',
          end: 'bottom 10%',

          toggleActions: 'play reverse play reverse',
          animation: gsap.from(contentRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          })
        });

        ScrollTrigger.create({
          trigger: buttonRef.current,
          id: 'contact-button',
          start: 'top 90%',
          end: 'bottom 10%',

          toggleActions: 'play reverse play reverse',
          animation: gsap.from(buttonRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          })
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
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

