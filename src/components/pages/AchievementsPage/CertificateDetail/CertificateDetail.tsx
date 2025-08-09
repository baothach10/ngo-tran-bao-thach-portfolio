import React, { useState, useEffect, useMemo } from 'react';

import './CertificateDetail.css';

import SectionNav, { ISection } from '@/components/SectionNav/SectionNav';
import { isMobileDevice } from '@/utils';

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
      <div className="certificate-detail">
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
                  <div key={index} className="skill-tag">
                    {skill}
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
