import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useState, useRef } from 'react';

import './AwardDetail.css';
import SectionNav from '@/components/SectionNav/SectionNav';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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
  const awardDetailRef = useRef<HTMLDivElement>(null);

  const award = data[id];

  // GSAP animations for award detail sections
  useGSAP(() => {
    if (!awardDetailRef.current || !award) return;

    const scrollTriggers: ScrollTrigger[] = [];

    // Helper function to create scroll trigger for single elements
    const createSingleElementAnimation = (element: Element) => {
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 100%',
        end: 'bottom 5%',
        toggleActions: 'play reverse play reverse',
        id: `${element.className}-award-trigger`,
        scroller: awardDetailRef.current,
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
        id: `${parentElement.className}-award-stagger`,
        scroller: awardDetailRef.current,
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

    // Animate award header components
    const logoElement = awardDetailRef.current.querySelector('.award-issuer-logo');
    if (logoElement) {
      createSingleElementAnimation(logoElement);
    }

    const titleElement = awardDetailRef.current.querySelector('.award-title');
    if (titleElement) {
      createSingleElementAnimation(titleElement);
    }

    const issuerElement = awardDetailRef.current.querySelector('.issuer-name');
    if (issuerElement) {
      createSingleElementAnimation(issuerElement);
    }

    const metaElement = awardDetailRef.current.querySelector('.award-meta');
    if (metaElement) {
      createStaggeredAnimation(metaElement);
    }

    // Animate description section
    const descriptionElement = awardDetailRef.current.querySelector('.award-description');
    if (descriptionElement) {
      createSingleElementAnimation(descriptionElement);
    }

    // Animate achievements section
    const achievementsElement = awardDetailRef.current.querySelector('.award-achievements');
    if (achievementsElement) {
      // Animate the title first
      const title = achievementsElement.querySelector('h3');
      if (title) {
        createSingleElementAnimation(title);
      }

      // Then animate achievement items with stagger
      const achievementsGrid = achievementsElement.querySelector('.achievements-grid');
      if (achievementsGrid) {
        const achievementItems = achievementsGrid.querySelectorAll('.achievement-item-container');
        achievementItems.forEach(item => {
          createStaggeredAnimation(item);
        });
      }
    }

    // Animate section navigation
    const sectionNavElement = awardDetailRef.current.querySelector('.award-section-nav');
    if (sectionNavElement) {
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
  }, [award]);

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
    <div className="award-detail" ref={awardDetailRef}>
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
              <img
                loading="lazy"
                src={award.issuerImage}
                alt={award.issuer}
                className="issuer-logo"
              />
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
                <div key={index} className="achievement-item-container">
                  <div className="achievement-item">{achievement}</div>
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
