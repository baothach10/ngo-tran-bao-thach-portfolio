import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import './SectionTitle.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type TSectionTitle = {
  content: string;
};

export const SectionTitle = ({ content }: TSectionTitle) => {
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: titleRef.current,
      id: `section-title-${content}`,
      start: 'top 95%',
      end: 'bottom 15%',
      toggleActions: 'play reverse play reverse',
      animation: gsap.from(titleRef.current, {
        y: 100,
        opacity: 0
      })
    });
  }, []);

  return (
    <div className="section-title-container" ref={titleRef}>
      <h2 className="section-title-content">{content}</h2>
    </div>
  );
};

