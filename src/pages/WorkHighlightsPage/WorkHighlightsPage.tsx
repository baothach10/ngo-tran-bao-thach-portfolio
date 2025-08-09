import React, { useState, useEffect } from 'react';

import './WorkHighlightsPage.css';
import KeyProjectsSection from '@/components/pages/WorkHighlightsPage/KeyProjectsSection';
import ProfessionalExperienceSection from '@/components/pages/WorkHighlightsPage/ProfessionalExperienceSection';

interface IProject {
  name: string;
  owner: string;
  startDate: string;
  endDate: string;
  type: string;
  thumbnail?: string;
  roles: string[];
}

interface IPosition {
  position: string;
  company: string;
  companyLogo: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  workType: string;
  abstract: string;
  skills: string[];
}

interface IDataStructure {
  projects: { [key: string]: IProject };
  experience: { [key: string]: IPosition };
}

const WorkHighlightsPage: React.FC = () => {
  const [data, setData] = useState<IDataStructure | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/data.json');
        const jsonData = (await response.json()) as IDataStructure;
        setData(jsonData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    void loadData();
  }, []);

  if (isLoading) {
    return <div className="work-highlights-page loading">Loading...</div>;
  }

  if (!data) {
    return <div className="work-highlights-page error">Error loading data</div>;
  }

  return (
    <div className="work-highlights-page-container">
      <div className="work-highlights-page-wrapper">
        <ProfessionalExperienceSection experience={data.experience} />
        <KeyProjectsSection projects={data.projects} />
      </div>
    </div>
  );
};

export default WorkHighlightsPage;
