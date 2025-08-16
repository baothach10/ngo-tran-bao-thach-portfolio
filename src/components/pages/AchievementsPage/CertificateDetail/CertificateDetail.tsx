import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useState, useEffect, useMemo, useRef } from 'react';

import './CertificateDetail.css';

import SectionNav, { ISection } from '@/components/SectionNav/SectionNav';
import { isMobileDevice } from '@/utils';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ICertificateDetailProps {
  certificateId: string;
  onNavigate?: (sections: ISection[]) => void;
}

interface ICertificateData {
  title: string;
  issuer: string;
  issuerImage: string;
  issueDate: string;
  description: string;
  skillsLearned: string[];
}

// Get certificate data from the data.json directly
const getCertificateData = async (id: string): Promise<ICertificateData | null> => {
  try {
    const response = await fetch('/data/data.json');
    const data = await response.json();
    const certificate = data.certifications[id];
    return certificate || null;
  } catch (error) {
    console.error('Error loading certificate data:', error);
    return null;
  }
};

const CertificateDetail: React.FC<ICertificateDetailProps> = ({ certificateId, onNavigate }) => {
  const [certificate, setCertificate] = useState<ICertificateData | null>(null);
  const [activeSection, setActiveSection] = useState<string>('certificate');
  const [isLoading, setIsLoading] = useState(true);
  const certificateDetailRef = useRef<HTMLDivElement>(null);

  // Load certificate data
  useEffect(() => {
    const loadCertificate = async () => {
      setIsLoading(true);
      const data = await getCertificateData(certificateId);
      setCertificate(data);
      setIsLoading(false);
    };
    void loadCertificate();
  }, [certificateId]);

  const sections: ISection[] = useMemo(() => {
    const baseSections = [
      { id: 'certificate', label: 'Overview' },
      { id: 'description', label: 'Description' }
    ];

    // Only add skills section if there are skills to display
    if (certificate && certificate.skillsLearned && certificate.skillsLearned.length > 0) {
      baseSections.push({ id: 'skills', label: 'Skills Learned' });
    }

    return baseSections;
  }, [certificate]);

  // GSAP animations for certificate detail sections
  useGSAP(() => {
    if (!certificateDetailRef.current || !certificate) return;

    const scrollTriggers: ScrollTrigger[] = [];

    // Helper function to create scroll trigger for single elements
    const createSingleElementAnimation = (element: Element) => {
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 100%',
        end: 'bottom 5%',
        toggleActions: 'play reverse play reverse',
        id: `${element.className}-certificate-trigger`,
        scroller: certificateDetailRef.current,
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
        id: `${parentElement.className}-certificate-stagger`,
        scroller: certificateDetailRef.current,
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

    // Animate certificate header components
    const logoElement = certificateDetailRef.current.querySelector('.certificate-issuer-logo');
    if (logoElement) {
      createSingleElementAnimation(logoElement);
    }

    const titleElement = certificateDetailRef.current.querySelector('.certificate-title');
    if (titleElement) {
      createSingleElementAnimation(titleElement);
    }

    const issuerElement = certificateDetailRef.current.querySelector('.issuer-name');
    if (issuerElement) {
      createSingleElementAnimation(issuerElement);
    }

    const metaElement = certificateDetailRef.current.querySelector('.certificate-meta');
    if (metaElement) {
      createStaggeredAnimation(metaElement);
    }

    // Animate description section
    const descriptionElement = certificateDetailRef.current.querySelector(
      '.certificate-description'
    );
    if (descriptionElement) {
      createSingleElementAnimation(descriptionElement);
    }

    // Animate skills section
    const skillsElement = certificateDetailRef.current.querySelector('.certificate-skills');
    if (skillsElement) {
      // Animate the title first
      const title = skillsElement.querySelector('h3');
      if (title) {
        createSingleElementAnimation(title);
      }

      // Then animate skill tags with stagger
      const skillsGrid = skillsElement.querySelector('.skills-grid');
      if (skillsGrid) {
        const skillItems = skillsGrid.querySelectorAll('.skill-tag-item');
        skillItems.forEach(item => {
          createStaggeredAnimation(item);
        });
      }
    }

    // Animate section navigation
    const sectionNavElement = certificateDetailRef.current.querySelector(
      '.certificate-section-nav'
    );
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
  }, [certificate]);

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

  if (isLoading) {
    return (
      <div className="certificate-detail-error">
        <h2>Loading...</h2>
        <p>Loading certificate details...</p>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="certificate-detail-error">
        <h2>Certificate Not Found</h2>
        <p>The certificate with ID "{certificateId}" could not be found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="certificate-detail" ref={certificateDetailRef}>
        <div id="certificate" className="certificate-detail-header">
          <div className="certificate-issuer-logo">
            <img
              loading="lazy"
              src={certificate.issuerImage}
              alt={`${certificate.issuer} Logo`}
              className="issuer-logo"
            />
          </div>
          <h1 className="certificate-title">{certificate.title}</h1>
          <h2 className="issuer-name">{certificate.issuer}</h2>
          <div className="certificate-meta">
            <span className="issue-date">Issued: {certificate.issueDate}</span>
          </div>
        </div>

        <div className="certificate-detail-content">
          <div id="description" className="certificate-description">
            <h3>Certificate Description</h3>
            <p>{certificate.description}</p>
          </div>

          {certificate.skillsLearned && certificate.skillsLearned.length > 0 && (
            <div id="skills" className="certificate-skills">
              <h3>Skills Learned</h3>
              <div className="skills-grid">
                {certificate.skillsLearned.map((skill, index) => (
                  <div className="skill-tag-item" key={index}>
                    <div className="skill-tag">{skill}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section Navigation */}
        <div className="certificate-section-nav">
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

export default CertificateDetail;
