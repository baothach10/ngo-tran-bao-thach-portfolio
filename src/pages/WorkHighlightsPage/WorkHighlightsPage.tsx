import data from '@public/data/data.json';
import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';

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


const WorkHighlightsPage: React.FC = () => {

  const animatedNameHeight = isMobileDevice()
    ? document.documentElement.clientWidth < 768
      ? '4rem'
      : '7rem'
    : '10rem';

  if (!data) {
    return <div className="work-highlights-page error">Error loading data</div>;
  }

  return (
    <div className="work-highlights-page-container">
      <Helmet>
        <title>Work Highlights | Ngo Tran Bao Thach</title>
        <meta
          name="description"
          content="Explore the professional experience and key projects of Ngo Tran Bao Thach, showcasing expertise in web development, game development and AI Development & Research."
        />
        <meta property="og:title" content="Work Highlights | Ngo Tran Bao Thach" />
        <meta
          property="og:description"
          content="Discover the professional journey of Ngo Tran Bao Thach, including key projects and work experience in web development, game development and AI Development & Research."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://ngo-tran-bao-thach.vercel.app/work-highlights"
        />
      </Helmet>
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
