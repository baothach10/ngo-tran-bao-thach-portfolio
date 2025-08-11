import { useGSAP } from '@gsap/react';
import { projects } from '@public/data/data.json'; // Assuming you have a projects data file
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useState, useEffect, useMemo, useRef } from 'react';

import './ProjectDetail.css';

import SectionNav, { ISection } from '@/components/SectionNav/SectionNav';
import { isMobileDevice, isValidUrl } from '@/utils';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface IProjectDetailProps {
  projectId: string;
  onNavigate?: (sections: ISection[]) => void;
}

interface IProjectData {
  name: string;
  owner: string;
  startDate: string;
  endDate: string;
  type: string;
  description: string;
  roles: string[];
  techStack: string[];
  thumbnail?: string;
  liveLink: string;
  highlights?: IHighlight[];
  responsibilities: string[];
}

interface IHighlight {
  image: string;
  title: string;
  subtitle: string;
}

// Mock data - you can replace this with API call or props
const getProjectData = (id: string): IProjectData | null => {
  const fetchedProjects: Record<string, IProjectData> = projects;
  return fetchedProjects[id] || null;
};

const ProjectDetail: React.FC<IProjectDetailProps> = ({ projectId, onNavigate }) => {
  const project = getProjectData(projectId);
  const [activeSection, setActiveSection] = useState<string>('name');
  const projectDetailRef = useRef<HTMLDivElement>(null);

  const sections: ISection[] = useMemo(
    () => [
      { id: 'name', label: 'Overview' },
      { id: 'startDate', label: 'Timeline' },
      { id: 'description', label: 'Description' },
      { id: 'highlights', label: 'Highlights' },
      { id: 'roles', label: 'Roles' },
      { id: 'techStack', label: 'Tech Stack' },
      { id: 'liveLink', label: 'Live Link' },
      { id: 'responsibilities', label: 'Responsibilities' }
    ],
    []
  );

  // GSAP animations for project detail sections
  useGSAP(() => {
    if (!projectDetailRef.current) return;

    const scrollTriggers: ScrollTrigger[] = [];

    // Helper function to create scroll trigger for single elements
    const createSingleElementAnimation = (element: Element) => {
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 100%',
        end: 'bottom 5%',
        toggleActions: 'play reverse play reverse',
        id: `${element.className}-project-trigger`,
        scroller: projectDetailRef.current,
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
        id: `${parentElement.className}-project-stagger`,
        scroller: projectDetailRef.current,
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

    // Animate project header components with staggered effect
    const imageElement = projectDetailRef.current.querySelector('.project-image');
    if (imageElement) {
      createSingleElementAnimation(imageElement);
    }

    const titleElement = projectDetailRef.current.querySelector('.project-title');
    if (titleElement) {
      createSingleElementAnimation(titleElement);
    }

    const metaElement = projectDetailRef.current.querySelector('.project-meta');
    if (metaElement) {
      createStaggeredAnimation(metaElement);
    }

    // Animate timeline items with staggered effect
    const timelineElement = projectDetailRef.current.querySelector('.project-timeline');
    if (timelineElement) {
      createStaggeredAnimation(timelineElement, '.project-timeline-item');
    }

    // Animate description section
    const descriptionElement = projectDetailRef.current.querySelector('.project-description');
    if (descriptionElement) {
      createSingleElementAnimation(descriptionElement);
    }

    // Animate highlights section
    const highlightsElement = projectDetailRef.current.querySelector('.project-highlights');
    if (highlightsElement) {
      // Animate the title first
      const title = highlightsElement.querySelector('h3');
      if (title) {
        createSingleElementAnimation(title);
      }

      // Then animate highlight items with stagger
      const highlightsGrid = highlightsElement.querySelector('.project-highlights-grid');
      if (highlightsGrid) {
        createStaggeredAnimation(highlightsGrid, '.project-highlight-item');
      }
    }

    // Animate roles section
    const rolesElement = projectDetailRef.current.querySelector('.project-roles');
    if (rolesElement) {
      // Animate the title first
      const title = rolesElement.querySelector('h3');
      if (title) {
        createSingleElementAnimation(title);
      }

      // Then animate role tags with stagger
      const rolesGrid = rolesElement.querySelector('.project-roles-grid');
      if (rolesGrid) {
        createStaggeredAnimation(rolesGrid, '.project-role-tag');
      }
    }

    // Animate tech stack section
    const techStackElement = projectDetailRef.current.querySelector('.project-tech-stack');
    if (techStackElement) {
      // Animate the title first
      const title = techStackElement.querySelector('h3');
      if (title) {
        createSingleElementAnimation(title);
      }

      // Then animate tech tags with stagger
      const techGrid = techStackElement.querySelector('.project-tech-grid');
      if (techGrid) {
        createStaggeredAnimation(techGrid, '.project-tech-tag');
      }
    }

    // Animate live link section
    const liveLinkElement = projectDetailRef.current.querySelector('.project-live-link');
    if (liveLinkElement) {
      createSingleElementAnimation(liveLinkElement);
    }

    // Animate responsibilities section
    const responsibilitiesElement = projectDetailRef.current.querySelector(
      '.project-responsibilities'
    );
    if (responsibilitiesElement) {
      // Animate the title first
      const title = responsibilitiesElement.querySelector('h3');
      if (title) {
        createSingleElementAnimation(title);
      }

      // Then animate responsibility items with stagger
      const responsibilitiesList = responsibilitiesElement.querySelector(
        '.project-responsibilities-list'
      );
      if (responsibilitiesList) {
        createStaggeredAnimation(responsibilitiesList, '.project-responsibility-item');
      }
    }

    // Animate section navigation
    const sectionNavElement = projectDetailRef.current.querySelector('.project-section-nav');
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

  if (!project) {
    return (
      <div className="project-detail-error">
        <h2>Project Not Found</h2>
        <p>The project with ID "{projectId}" could not be found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="project-detail" ref={projectDetailRef}>
        <div id="name" className="project-detail-header">
          <div className="project-image-container">
            <img
              loading="lazy"
              src={`${project.thumbnail}`}
              alt={`${project.name} Thumbnail`}
              className="project-image"
            />
          </div>
          <h1 className="project-title">{project.name}</h1>
          <div className="project-meta">
            <span className="project-type">{project.type}</span>
            <span className="project-owner">by {project.owner}</span>
          </div>
        </div>
        <div className="project-detail-content">
          <div id="startDate" className="project-timeline">
            <div className="project-timeline-item">
              <label>Start Date</label>
              <span>{project.startDate}</span>
            </div>
            <div className="project-timeline-item">
              <label>End Date</label>
              <span>{project.endDate}</span>
            </div>
          </div>

          <div id="description" className="project-description">
            <h3>Description</h3>
            <p>{project.description}</p>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div id="highlights" className="project-highlights">
              <h3>Project Highlights</h3>
              <div className="project-highlights-grid">
                {project.highlights.map((highlight, index) => (
                  <div key={index} className="project-highlight-item">
                    <div className="highlight-image-container">
                      <img
                        loading="lazy"
                        src={highlight.image}
                        alt={highlight.title}
                        className="highlight-image"
                      />
                      <div className="highlight-overlay">
                        <div className="highlight-content">
                          <h4 className="highlight-title">{highlight.title}</h4>
                          <p className="highlight-subtitle">{highlight.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div id="roles" className="project-roles">
            <h3>My Roles</h3>
            <div className="project-roles-grid">
              {project.roles.map((role, index) => (
                <div key={index} className="project-role-tag">
                  {role}
                </div>
              ))}
            </div>
          </div>

          <div id="techStack" className="project-tech-stack">
            <h3>Tech Stack</h3>
            <div className="project-tech-grid">
              {project.techStack.map((tech, index) => (
                <div key={index} className="project-tech-tag">
                  {tech}
                </div>
              ))}
            </div>
          </div>

          <div id="liveLink" className="project-live-link">
            <h3>Live Link</h3>
            <div className="live-link-container">
              {!isValidUrl(project.liveLink) ? (
                <span className="link-placeholder">{project.liveLink}</span>
              ) : (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-link-button"
                >
                  View Live Project
                </a>
              )}
            </div>
          </div>

          <div id="responsibilities" className="project-responsibilities">
            <h3>Responsibilities</h3>
            <div className="project-responsibilities-list">
              {project.responsibilities.map((responsibility, index) => (
                <div key={index} className="project-responsibility-item-container">
                  <div className="project-responsibility-item">
                    <span className="project-responsibility-bullet">•</span>
                    <p>{responsibility}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Section Navigation */}
        <div className="project-section-nav">
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

export default ProjectDetail;
