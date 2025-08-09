import React, { useEffect, useState, useRef } from 'react';

import './AwardDetail.css';
import SectionNav from '@/components/SectionNav/SectionNav';


interface IAward {
  title: string;
  issuer: string;
  issueDate: string;
  description: string;
  issuerImage?: string;
  achievements?: string[];
}

interface IAwardDetailProps {
  id: string;
  data: { [key: string]: IAward };
}

const AwardDetail: React.FC<IAwardDetailProps> = ({ id, data }) => {
  const [activeSection, setActiveSection] = useState('award-overview');
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  const award = data[id];

  useEffect(() => {
    if (!award) return;

    // Set up intersection observer for section tracking
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5
    });

    Object.values(sectionsRef.current).forEach(element => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [award]);

  if (!award) {
    return (
      <div className="award-detail-error">
        <h2>Award Not Found</h2>
        <p>The requested award could not be found.</p>
      </div>
    );
  }

  // Generate sections list for navigation
  const sections = [
    { id: 'award-overview', label: 'Overview' },
    { id: 'award-description', label: 'Description' }
  ];

  // Add achievements section if achievements exist
  if (award.achievements && award.achievements.length > 0) {
    sections.push({ id: 'award-achievements', label: 'Achievements' });
  }

  return (
    <div className="award-detail">
      <div className="award-detail-header">
        <div
          id="award-overview"
          ref={el => {
            sectionsRef.current['award-overview'] = el;
          }}
          className="award-overview-section"
        >
          {award.issuerImage && (
            <div className="award-issuer-logo">
              <img loading='lazy' src={award.issuerImage} alt={award.issuer} className="issuer-logo" />
            </div>
          )}
          <h1 className="award-title">{award.title}</h1>
          <h2 className="issuer-name">{award.issuer}</h2>
          <div className="award-meta">
            <span className="award-date">{award.issueDate}</span>
          </div>
        </div>
      </div>

      <div className="award-detail-content">
        <div
          id="award-description"
          ref={el => {
            sectionsRef.current['award-description'] = el;
          }}
          className="award-description"
        >
          <h3>Description</h3>
          <p>{award.description}</p>
        </div>

        {award.achievements && award.achievements.length > 0 && (
          <div
            id="award-achievements"
            ref={el => {
              sectionsRef.current['award-achievements'] = el;
            }}
            className="award-achievements"
          >
            <h3>Key Achievements</h3>
            <div className="achievements-grid">
              {award.achievements.map((achievement: string, index: number) => (
                <div key={index} className="achievement-item">
                  {achievement}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="award-section-nav">
        <SectionNav
          sections={sections}
          activeSection={activeSection}
          onSectionClick={sectionId => {
            const element = sectionsRef.current[sectionId];
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      </div>
    </div>
  );
};

export default AwardDetail;
