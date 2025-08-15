import React, { Suspense, lazy, useState, useEffect } from 'react';

import './WorkHighlightsPage.css';

import { AnimatedNameGraphic } from '@/components/pages/AboutMePage/AnimatedNameGraphic/AnimatedNameGraphic';
import KeyProjectsSkeleton from '@/components/pages/WorkHighlightsPage/KeyProjectsSection/KeyProjectsSkeleton';
import ProfessionalExperienceSkeleton from '@/components/pages/WorkHighlightsPage/ProfessionalExperienceSection/ProfessionalExperienceSkeleton';
import { isMobileDevice } from '@/utils';

const ProfessionalExperienceSection = lazy(
  () => import('@/components/pages/WorkHighlightsPage/ProfessionalExperienceSection')
);
const KeyProjectsSection = lazy(
  () => import('@/components/pages/WorkHighlightsPage/KeyProjectsSection')
);

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

  const animatedNameHeight = isMobileDevice()
    ? document.documentElement.clientWidth < 768
      ? '4rem'
      : '7rem'
    : '10rem';

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
    return (
      <div className="work-highlights-page-container">
        <div className="name-graphic-container">
          <AnimatedNameGraphic
            className="half-graphic"
            shadowColor="white"
            strokeColor="white"
            height={animatedNameHeight}
          />
        </div>
        <div className="work-highlights-page-wrapper">
          <ProfessionalExperienceSkeleton cardCount={2} />
          <KeyProjectsSkeleton cardCount={2} />
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="work-highlights-page error">Error loading data</div>;
  }

  return (
    <div className="work-highlights-page-container">
      <div className="name-graphic-container">
        <AnimatedNameGraphic
          className="half-graphic"
          shadowColor="white"
          strokeColor="white"
          height={animatedNameHeight}
        />
      </div>
      <div className="work-highlights-page-wrapper">
        <Suspense fallback={<ProfessionalExperienceSkeleton cardCount={3} />}>
          <ProfessionalExperienceSection experience={data.experience} />
        </Suspense>
        <Suspense fallback={<KeyProjectsSkeleton cardCount={4} />}>
          <KeyProjectsSection projects={data.projects} />
        </Suspense>
      </div>
    </div>
  );
};

export default WorkHighlightsPage;
