import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import './ProfessionalExperienceSection.css';
import GlareHoverCard from '@/components/GlareHoverCard/GlareHoverCard';
import { SectionTitle } from '@/components/layout/SectionTitle/SectionTitle';
import { isMobileDevice } from '@/utils';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface IPosition {
  position: string;
  company: string;
  companyLogo: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  workType: string;
  abstract: string;
  skills: string[];
}

interface IProfessionalExperienceSectionProps {
  experience: { [key: string]: IPosition };
}

const ProfessionalExperienceSection: React.FC<IProfessionalExperienceSectionProps> = ({
  experience
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = sectionRef.current.querySelectorAll('.professional-experience-card-wrapper');

      if (cards.length === 0) return;

      // Create scroll-triggered animations for each card
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 95%',
          end: 'bottom 15%',

          toggleActions: 'play reverse play reverse',
          animation: gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.4,
            delay: index * 0.2, // stagger effect
            ease: 'power3.out'
          })
        });
      });
    },
    { scope: sectionRef, dependencies: [experience] }
  );

  const formatDateRange = (startDate: string, endDate: string) => {
    return `${startDate} - ${endDate}`;
  };

  const renderSkills = (skills: string[]) => {
    const numberOfSkills = isMobileDevice() ? 3 : 5;
    const displaySkills = skills.slice(0, numberOfSkills);
    const remainingCount = skills.length - numberOfSkills;

    return (
      <div className="professional-experience-skills-container">
        <span className="professional-experience-skills-label">Skills:</span>
        <div className="professional-experience-skills-grid">
          {displaySkills.map((skill, index) => (
            <div key={index} className="professional-experience-skill-item">
              <GlareHoverCard>
                <span className="professional-experience-skill-text">{skill}</span>
              </GlareHoverCard>
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="professional-experience-remaining-skills">+{remainingCount} more</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="professional-experience-section" ref={sectionRef}>
      <div className="professional-experience-section-title">
        <SectionTitle content="Professional Experience" />
      </div>
      <div className="professional-experience-list">
        {Object.entries(experience).map(([positionId, position]) => (
          <div key={positionId} className="professional-experience-card-wrapper">
            <div className="professional-experience-card">
              <div className="professional-experience-company-logo">
                <img src={position.companyLogo} alt={position.company} loading="lazy" />
              </div>
              <div className="professional-experience-info">
                <h3 className="professional-experience-position-title">{position.position}</h3>
                <p className="professional-experience-company-name">{position.company}</p>
                <div className="professional-experience-employment-details">
                  <div className="professional-experience-detail-item employment-type">
                    <span className="professional-experience-detail-label">Type</span>
                    <span className="professional-experience-detail-value">
                      {position.employmentType}
                    </span>
                  </div>
                  <div className="professional-experience-detail-item work-type">
                    <span className="professional-experience-detail-label">Mode</span>
                    <span className="professional-experience-detail-value">
                      {position.workType}
                    </span>
                  </div>
                  <div className="professional-experience-detail-item employment-duration">
                    <span className="professional-experience-detail-label">Duration</span>
                    <span className="professional-experience-detail-value">
                      {formatDateRange(position.startDate, position.endDate)}
                    </span>
                  </div>
                </div>
                <p className="professional-experience-position-abstract">{position.abstract}</p>
                {renderSkills(position.skills)}
              </div>
            </div>
            <Link
              aria-label={`Read more about position ${position.position} at ${position.company}`}
              to={`/work-highlights/positions/${positionId}`}
              className="professional-experience-read-more-button"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfessionalExperienceSection;
