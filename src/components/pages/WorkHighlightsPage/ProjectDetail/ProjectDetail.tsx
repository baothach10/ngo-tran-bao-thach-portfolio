import { projects } from '@public/data/data.json'; // Assuming you have a projects data file
import React, { useState, useEffect, useMemo } from 'react';

import './ProjectDetail.css';

import SectionNav, { ISection } from '@/components/SectionNav/SectionNav';
import { isMobileDevice, isValidUrl } from '@/utils';

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
      <div className="project-detail">
        <div id="name" className="project-detail-header">
          <div className="project-image">
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
            <div className="timeline-item">
              <label>Start Date</label>
              <span>{project.startDate}</span>
            </div>
            <div className="timeline-item">
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
              <div className="highlights-grid">
                {project.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
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
            <div className="roles-grid">
              {project.roles.map((role, index) => (
                <div key={index} className="role-tag">
                  {role}
                </div>
              ))}
            </div>
          </div>

          <div id="techStack" className="project-tech-stack">
            <h3>Tech Stack</h3>
            <div className="tech-grid">
              {project.techStack.map((tech, index) => (
                <div key={index} className="tech-tag">
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
            <div className="responsibilities-list">
              {project.responsibilities.map((responsibility, index) => (
                <div key={index} className="responsibility-item">
                  <span className="responsibility-bullet">•</span>
                  <p>{responsibility}</p>
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
