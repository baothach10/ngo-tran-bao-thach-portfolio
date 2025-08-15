import { useGSAP } from '@gsap/react';
import { awards as awardsData } from '@public/data/data.json';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import GlareHoverCard from '@/components/GlareHoverCard/GlareHoverCard';
import { SectionTitle } from '@/components/layout/SectionTitle/SectionTitle';
import './AwardsSection.css';
import { isMobileDevice } from '@/utils';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface IAward {
  title: string;
  issuer: string;
  issuerImage: string;
  issueDate: string;
  description: string;
  achievements?: string[];
}

const AwardsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [awards, setAwards] = useState<{ [key: string]: IAward }>(
    awardsData as { [key: string]: IAward }
  );

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = sectionRef.current.querySelectorAll('.awards-card-wrapper');

      if (cards.length === 0) return;

      // Create scroll-triggered animations for each card
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse',
          animation: gsap.from(card, {
            y: 100,
            opacity: 0,
            // duration: 0.5,
            delay: index * 0.1, // stagger effect
            ease: 'power3.out'
          })
        });
      });
    },
    { scope: sectionRef, dependencies: [awards] }
  );

  const renderAchievements = (achievements: string[]) => {
    if (!achievements || achievements.length === 0) return null;

    const numberOfAchievements = isMobileDevice() ? 3 : 5;

    const displayAchievements = achievements.slice(0, numberOfAchievements);
    const remainingCount = achievements.length - numberOfAchievements;

    return (
      <div className="awards-achievements-container">
        <span className="awards-achievements-label">Achievements:</span>
        <div className="awards-achievements-grid">
          {displayAchievements.map((achievement, index) => (
            <div key={index} className="awards-achievement-item">
              <GlareHoverCard>
                <span className="awards-achievement-text">{achievement}</span>
              </GlareHoverCard>
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="awards-remaining-achievements">+{remainingCount} more</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="awards-section-container" ref={sectionRef}>
      <div className="awards-section-title">
        <SectionTitle content="My Awards" />
      </div>
      <div className="awards-section-content">
        <div className="awards-list">
          {Object.entries(awards).map(([awardId, award]) => (
            <div key={awardId} className="awards-card-wrapper">
              <div className="awards-card">
                <div className="awards-issuer-logo">
                  <img src={award.issuerImage} alt={award.issuer} loading="lazy" />
                </div>
                <div className="awards-info">
                  <h3 className="awards-title">{award.title}</h3>
                  <p className="awards-issuer-name">{award.issuer}</p>
                  <div className="awards-details">
                    <div className="awards-detail-item issue-date">
                      <span className="awards-detail-label">Date</span>
                      <span className="awards-detail-value">{award.issueDate}</span>
                    </div>
                  </div>
                  {award.achievements && renderAchievements(award.achievements)}
                </div>
              </div>
              <Link to={`/achievements/awards/${awardId}`} className="awards-read-more-button">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
