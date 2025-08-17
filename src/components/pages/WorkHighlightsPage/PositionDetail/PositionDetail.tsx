import { useGSAP } from '@gsap/react';
import { experience } from '@public/data/data.json';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet';

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
  useGSAP(() => {
    if (!positionDetailRef.current) return;

    const scrollTriggers: ScrollTrigger[] = [];

    // Helper function to create scroll trigger for single elements
    const createSingleElementAnimation = (element: Element) => {
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 100%',
        end: 'bottom 5%',
        toggleActions: 'play reverse play reverse',
        id: `${element.className}-stagger`,

        scroller: positionDetailRef.current,
        animation: gsap.from(element, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        })
      });

      scrollTriggers.push(trigger);
    };

    // Helper function to create staggered animations for elements with children
    const createStaggeredAnimation = (parentElement: Element, childSelector: string = '*') => {
      let children: NodeListOf<Element>;

      if (childSelector === '*') {
        // Get direct children only
        children = parentElement.querySelectorAll(':scope > *');
      } else {
        children = parentElement.querySelectorAll(childSelector);
      }

      if (children.length === 0) return;

      const trigger = ScrollTrigger.create({
        trigger: parentElement,
        start: 'top 100%',
        end: 'bottom 5%',
        toggleActions: 'play reverse play reverse',
        id: `${parentElement.className}-stagger`,

        scroller: positionDetailRef.current,
        animation: gsap.from(children, {
          x: -100,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out'
        })
      });

      scrollTriggers.push(trigger);
    };

    // Animate position header components with staggered effect
    const logoElement = positionDetailRef.current.querySelector('.position-company-logo');
    if (logoElement) {
      createSingleElementAnimation(logoElement);
    }
    const titleElement = positionDetailRef.current.querySelector('.position-title');
    if (titleElement) {
      createSingleElementAnimation(titleElement);
    }
    const companyNameElement = positionDetailRef.current.querySelector('.position-company-name');
    if (companyNameElement) {
      createSingleElementAnimation(companyNameElement);
    }
    const metaElement = positionDetailRef.current.querySelector('.position-meta');
    if (metaElement) {
      createStaggeredAnimation(metaElement);
    }

    // Animate timeline items with staggered effect
    const timelineElement = positionDetailRef.current.querySelector('.position-timeline');
    if (timelineElement) {
      createStaggeredAnimation(timelineElement, '.position-timeline-item');
    }

    // Animate abstract section
    const abstractElement = positionDetailRef.current.querySelector('.position-abstract');
    if (abstractElement) {
      createSingleElementAnimation(abstractElement);
    }

    // Animate responsibilities section
    const responsibilitiesElement = positionDetailRef.current.querySelector(
      '.position-responsibilities'
    );
    if (responsibilitiesElement) {
      // Animate the title first
      const title = responsibilitiesElement.querySelector('h3');
      if (title) {
        createSingleElementAnimation(title);
      }

      //   // Then animate responsibility items with stagger
      const responsibilitiesList = responsibilitiesElement.querySelector(
        '.position-responsibilities-list'
      );
      if (responsibilitiesList) {
        const responsibilityItems = responsibilitiesList.querySelectorAll(
          '.position-responsibility-item-container'
        );
        responsibilityItems.forEach(item => {
          createStaggeredAnimation(item);
        });
      }
    }

    // Animate skills section
    const skillsElement = positionDetailRef.current.querySelector('.position-skills');
    if (skillsElement) {
      // Animate the title first
      const title = skillsElement.querySelector('h3');
      if (title) {
        createSingleElementAnimation(title);
      }

      // Then animate skill tags with stagger
      const skillsGrid = skillsElement.querySelector('.position-skills-grid');
      if (skillsGrid) {
        const skillTags = skillsGrid.querySelectorAll('.position-skill-tag');
        skillTags.forEach(tag => {
          createSingleElementAnimation(tag);
        });
      }
    }

    // Animate section navigation
    const sectionNavElement = positionDetailRef.current.querySelector('.position-section-nav');
    if (sectionNavElement) {
      // createSingleElementAnimation(sectionNavElement);
      gsap.from(sectionNavElement, {
        y: 100,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.5
      });
    }

    // Cleanup function
    return () => {
      scrollTriggers.forEach(trigger => trigger.kill());
    };
  }, []);

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
    <section className="position-detail" ref={positionDetailRef}>
      <Helmet>
        <title>{`${position.position} at ${position.company} | Ngo Tran Bao Thach`}</title>
        <meta
          name="description"
          content={`Explore the details of the position ${position.position} at ${position.company}, including responsibilities, skills, and timeline.`}
        />
        <meta property="og:title" content={`${position.position} at ${position.company}`} />
        <meta
          property="og:description"
          content={position.abstract || 'No description available.'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={position.companyLogo} />
        <meta
          property="og:url"
          content={`https://ngo-tran-bao-thach.vercel.app/work-highlights/${positionId}`}
        />
      </Helmet>
      <div id="position" className="position-detail-header">
        <div className="position-company-logo">
          <img
            loading="lazy"
            src={position.companyLogo}
            alt={`${position.company} Logo`}
            className="position-company-logo-image"
          />
        </div>
        <h1 className="position-title">{position.position}</h1>
        <h2 className="position-company-name">{position.company}</h2>
        <div className="position-meta">
          <span className="position-employment-type">{position.employmentType}</span>
          <span className="position-work-type">{position.workType}</span>
          <span className="position-location">{position.location}</span>
        </div>
      </div>
      <div className="position-detail-content">
        <div id="timeline" className="position-timeline">
          <div className="position-timeline-item">
            <label>Start Date</label>
            <span>{position.startDate}</span>
          </div>
          <div className="position-timeline-item">
            <label>End Date</label>
            <span>{position.endDate}</span>
          </div>
          <div className="position-timeline-item">
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
            <div className="position-responsibilities-list">
              {position.responsibilities.map((responsibility, index) => (
                <div key={index} className="position-responsibility-item-container">
                  <div className="position-responsibility-item">
                    <span className="position-responsibility-bullet">•</span>
                    <p>{responsibility}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {position.skills && position.skills.length > 0 && (
          <div id="skills" className="position-skills">
            <h3>Skills & Technologies</h3>
            <div className="position-skills-grid">
              {position.skills.map((skill, index) => {
                return (
                  <div key={index} className="position-skill-tag">
                    {skill}
                  </div>
                );
              })}
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
    </section>
  );
};

export default PositionDetail;
