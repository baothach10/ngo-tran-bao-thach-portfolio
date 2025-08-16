import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';

import SingleCertificationSummary from '../SingleCertificationSection/SingleCertificationSummary';
import './CertificationCategorySection.css';

import InteractiveShapesSection from '@/components/scenes/InteractiveShapesSection';
import { isMobileDevice } from '@/utils';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ICertificationCategorySectionProps {
  title: string;
  description: string;
  certifications: Record<string, TCertificationSpecification>;
}

type TCertificationSpecification = {
  category: string;
  title: string;
  issuer: string;
  issuerImage: string;
  issueDate: string;
  description: string;
  skillsLearned: string[];
};

const CertificationCategorySection: React.FC<ICertificationCategorySectionProps> = ({
  title,
  description,
  certifications
}) => {
  const categoryRef = useRef<HTMLDivElement>(null);
  const allSkills = Object.values(certifications).flatMap(cert => cert.skillsLearned);

  const canvasWidth = isMobileDevice()
    ? document.documentElement.clientWidth > 500
      ? 500
      : 220
    : document.documentElement.clientWidth > 1600 ? 1000 : 600;
  const canvasHeight = isMobileDevice()
    ? document.documentElement.clientWidth > 500
      ? 500
      : 300
    : document.documentElement.clientWidth > 1600 ? 600 : 600;
  const shapeSize = isMobileDevice() ? (document.documentElement.clientWidth > 500 ? 70 : 40) : 100;

  // GSAP ScrollTrigger animations for internal elements
  useGSAP(() => {
    if (!categoryRef.current) return;

    const scrollTriggers: ScrollTrigger[] = [];

    // Animate certification cards with stagger
    const certCards = categoryRef.current.querySelectorAll(
      '.single-certification-summary-container'
    );
    if (certCards.length > 0) {
      certCards.forEach((card, index) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 95%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse',
          animation: gsap.from(card, {
            x: -50,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1, // Stagger delay between cards
            ease: 'power2.out'
          })
        });
        scrollTriggers.push(cardTrigger);
      });
    }

    // Animate interactive shapes chart
    const chartElement = categoryRef.current.querySelector('.certification-category-chart');
    if (chartElement) {
      const chartTrigger = ScrollTrigger.create({
        trigger: chartElement,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play reverse play reverse',
        animation: gsap.from(chartElement, {
          x: 100,
          opacity: 0
          //   delay: 0.5
        })
      });
      scrollTriggers.push(chartTrigger);
    }

    // Animate title and description
    const titleElement = categoryRef.current.querySelector('.certification-category-title');
    const descElement = categoryRef.current.querySelector('.certification-category-description');

    if (titleElement) {
      const titleTrigger = ScrollTrigger.create({
        trigger: titleElement,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play reverse play reverse',
        animation: gsap.from(titleElement, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        })
      });
      scrollTriggers.push(titleTrigger);
    }

    if (descElement) {
      const descTrigger = ScrollTrigger.create({
        trigger: descElement,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play reverse play reverse',
        animation: gsap.from(descElement, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out'
        })
      });
      scrollTriggers.push(descTrigger);
    }

    // Cleanup function
    return () => {
      scrollTriggers.forEach(trigger => trigger.kill());
    };
  }, []); // Re-run when certifications change

  return (
    <div ref={categoryRef} className="certification-category-section">
      <div className="certification-category-content">
        <h3 className="certification-category-title">
          {title}
        </h3>
        <p className="certification-category-description">{description}</p>
        <div className="certification-list">
          {Object.entries(certifications).map(([id, cert]) => (
            <SingleCertificationSummary
              readMoreLink={`/certificates/${id}`}
              key={id}
              certificateInformation={cert}
            />
          ))}
        </div>
      </div>
      <div className="certification-category-chart">
        <InteractiveShapesSection
          width={canvasWidth}
          height={canvasHeight}
          shapeSize={shapeSize}
          shapeLabels={(() => {
            const skills = Array.from(new Set(allSkills));
            // If we have fewer than 8 skills, add some decorative empty shapes
            if (skills.length < 10) {
              const emptyShapesCount = Math.max(0, 30 - skills.length);
              return [...skills, ...Array(emptyShapesCount).fill(' ')];
            }
            return skills;
          })()}
        />
      </div>
    </div>
  );
};

export default CertificationCategorySection;
