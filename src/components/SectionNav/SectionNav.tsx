import React from 'react';
import './SectionNav.css';

export interface ISection {
  id: string;
  label: string;
}

interface ISectionNavProps {
  sections: ISection[];
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
}

const SectionNav: React.FC<ISectionNavProps> = ({ sections, activeSection, onSectionClick }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Call the optional callback
    if (onSectionClick) {
      onSectionClick(sectionId);
    }
  };

  return (
    <div className="section-nav">
      {sections.map(section => (
        <button
          key={section.id}
          className={`section-nav-item`}
          onClick={() => scrollToSection(section.id)}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
};

export default SectionNav;
