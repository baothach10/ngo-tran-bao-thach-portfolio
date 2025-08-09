import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import './KeyProjectsSection.css';
import GlareHoverCard from '@/components/GlareHoverCard/GlareHoverCard';
import { SectionTitle } from '@/components/layout/SectionTitle/SectionTitle';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface IProject {
  name: string;
  owner: string;
  startDate: string;
  endDate: string;
  type: string;
  thumbnail?: string;
  roles: string[];
}

interface IKeyProjectsSectionProps {
  projects: { [key: string]: IProject };
}

const KeyProjectsSection: React.FC<IKeyProjectsSectionProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = sectionRef.current.querySelectorAll('.key-project-card');

      cards.forEach(card => {
        const isOffset = card.classList.contains('offset');
        ScrollTrigger.create({
          trigger: card,
          start: 'top 95%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse',
          animation: gsap.from(card, {
            x: isOffset ? 50 : -50,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.out'
          })
        });
      });
    },
    { scope: sectionRef, dependencies: [projects] }
  );

  return (
    <section className="key-projects-section" ref={sectionRef}>
      <div className="key-projects-section-title">
        <SectionTitle content="Key Projects" />
      </div>
      <div className="key-projects-grid">
        {Object.entries(projects).map(([projectId, project], index) => (
          <div key={projectId} className={`key-project-card ${index % 2 === 1 ? 'offset' : ''}`}>
            <div className="key-project-thumbnail">
              <img
                src={project.thumbnail || '/assets/images/testing.png'}
                alt={project.name}
                loading="lazy"
              />
            </div>
            <div className="key-project-info">
              <h3 className="key-project-name">{project.name}</h3>
              <div className="key-project-meta">
                <span className="key-project-owner">{project.owner}</span>
                <span className="key-project-type">{project.type}</span>
              </div>
              <div className="key-project-roles">
                {project.roles.slice(0, 3).map((role, index) => (
                  <div key={index} className="key-project-role-item">
                    <GlareHoverCard>
                      <span className="key-project-role-text">{role}</span>
                    </GlareHoverCard>
                  </div>
                ))}
                {project.roles.length > 3 && (
                  <div className="key-project-remaining-roles">+{project.roles.length - 3}</div>
                )}
              </div>
              <Link
                to={`/work-highlights/projects/${projectId}`}
                className="key-project-view-button"
              >
                View Project
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyProjectsSection;
