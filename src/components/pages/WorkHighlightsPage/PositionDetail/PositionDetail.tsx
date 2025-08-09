
import { useGSAP } from '@gsap/react';
import { experience } from '@public/data/data.json';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useState, useEffect, useMemo, useRef } from 'react';

import './PositionDetail.css';

import SectionNav, { ISection } from '@/components/SectionNav/SectionNav';
import { isMobileDevice } from '@/utils';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface IPositionDetailProps {
  positionId: string;
  onNavigate?: (sections: ISection[]) => void;
}

interface IPositionData {
  position: string;
  company: string;
  companyLogo: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  location: string;
  workType: string;
  abstract: string;
  responsibilities: string[];
  skills: string[];
}

// Get position data by ID (using the key from the experience object)
const getPositionData = (id: string): IPositionData | null => {
  const experienceData: Record<string, IPositionData> = experience;
  return experienceData[id] || null;
};

const PositionDetail: React.FC<IPositionDetailProps> = ({ positionId, onNavigate }) => {
  const position = getPositionData(positionId);
  const [activeSection, setActiveSection] = useState<string>('position');
  const positionDetailRef = useRef<HTMLDivElement>(null);

  const sections: ISection[] = useMemo(() => {
    const baseSections = [
      { id: 'position', label: 'Overview' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'abstract', label: 'Abstract' }
    ];

    // Only add responsibilities section if there are responsibilities to display
    if (position && position.responsibilities && position.responsibilities.length > 0) {
      baseSections.push({ id: 'responsibilities', label: 'Responsibilities' });
    }

    // Only add skills section if there are skills to display
    if (position && position.skills && position.skills.length > 0) {
      baseSections.push({ id: 'skills', label: 'Skills' });
    }

    return baseSections;
  }, [position]);

  // GSAP animations for position detail sections
  useGSAP(
    () => {
      if (!positionDetailRef.current) return;

      const animatedSections = [
        '.position-detail-header',
        '.position-timeline',
        '.position-responsibilities',
        '.position-skills',
        '.position-section-nav'
      ];

      animatedSections.forEach((selector, index) => {
        const section = positionDetailRef.current?.querySelector(selector);
        if (section) {
          // Get all children within the section
          const children = section.children;

          console.log(section.children);

          const subChildren = Array.from(children).filter(child => child instanceof HTMLElement);

          gsap.from(subChildren, {
            y: 100,
            opacity: 0,
            duration: 0.6,
            stagger: 0.3 * index // Add stagger effect for smoother animation
          });

          //   if (children.length > 0) {
          //   ScrollTrigger.create({
          //     trigger: section,
          //     start: 'top 75%',
          //     end: 'bottom 15%',
          //     toggleActions: 'play reverse play reverse',
          //     markers: true,
          //     animation: gsap.from(children, {
          //       y: 50,
          //       markers: true,
          //       opacity: 0,
          //       duration: 0.6,
          //       stagger: 0.3 // Add stagger effect for smoother animation
          //     })
          //   });
          //   }
        }
      });
    },
    { scope: positionDetailRef, dependencies: [position] }
  );

  useEffect(() => {
    if (isMobileDevice()) return;
    // Pass sections to parent component for navigation
    if (onNavigate) {
      onNavigate(sections);
    }
  }, [onNavigate, sections]);

  useEffect(() => {
    // Set up intersection observer to track active section
    const observerOptions = {
      root: null,
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
  }, [sections]);

  if (!position) {
    return (
      <div className="position-detail-error">
        <h2>Position Not Found</h2>
        <p>The position with ID "{positionId}" could not be found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="position-detail" ref={positionDetailRef}>
        <div id="position" className="position-detail-header">
          <div className="position-company-logo">
            <img
              loading="lazy"
              src={position.companyLogo}
              alt={`${position.company} Logo`}
              className="company-logo"
            />
          </div>
          <h1 className="position-title">{position.position}</h1>
          <h2 className="company-name">{position.company}</h2>
          <div className="position-meta">
            <span className="employment-type">{position.employmentType}</span>
            <span className="work-type">{position.workType}</span>
            <span className="location">{position.location}</span>
          </div>
        </div>

        <div className="position-detail-content">
          <div id="timeline" className="position-timeline">
            <div className="timeline-item">
              <label>Start Date</label>
              <span>{position.startDate}</span>
            </div>
            <div className="timeline-item">
              <label>End Date</label>
              <span>{position.endDate}</span>
            </div>
            <div className="timeline-item">
              <label>Duration</label>
              <span>{position.employmentType}</span>
            </div>
          </div>

          <div id="abstract" className="position-abstract">
            <h3>Role Overview</h3>
            <p>{position.abstract}</p>
          </div>

          {position.responsibilities && position.responsibilities.length > 0 && (
            <div id="responsibilities" className="position-responsibilities">
              <h3>Key Responsibilities</h3>
              <div className="responsibilities-list">
                {position.responsibilities.map((responsibility, index) => (
                  <div key={index} className="responsibility-item">
                    <span className="responsibility-bullet">•</span>
                    <p>{responsibility}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {position.skills && position.skills.length > 0 && (
            <div id="skills" className="position-skills">
              <h3>Skills & Technologies</h3>
              <div className="skills-grid">
                {position.skills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section Navigation */}
        <div className="position-section-nav">
          <SectionNav
            sections={sections}
            activeSection={activeSection}
            onSectionClick={setActiveSection}
          />
        </div>
      </div>
    </>
  );
};

export default PositionDetail;
