import { lazy } from 'react';

import { AnimatedNameGraphic } from '@/components/AboutMePage/AnimatedNameGraphic/AnimatedNameGraphic';
import BeyondWorkSkeleton from '@/components/AboutMePage/BeyondWork/BeyondWorkSkeleton';
import EducationSkeleton from '@/components/AboutMePage/Education/EducationSkeleton';
import MainSkillsSkeleton from '@/components/AboutMePage/MainSkills/MainSkillsSkeleton';
import PersonalInformationSkeleton from '@/components/AboutMePage/PersonalInformation/PersonalInformationSkeleton';
import ReadyToDiscussSkeleton from '@/components/AboutMePage/ReadyToDiscuss/ReadyToDiscussSkeleton';
import TechnologyCarouselSkeleton from '@/components/Carousel/TechnologyCarousel/TechnologyCarouselSkeleton';
import LazyOnScroll from '@/components/layout/LazyOnScroll';
import './AboutMePage.css';

const MainSkillsSection = lazy(() => import('@/components/AboutMePage/MainSkills/MainSkills'));
const PersonalInformationSection = lazy(
  () => import('@/components/AboutMePage/PersonalInformation/PersonalInformation')
);
const TechStackSection = lazy(
  () => import('@/components/Carousel/TechnologyCarousel/TechStackSection')
);
const BeyondWorkSection = lazy(() => import('@/components/AboutMePage/BeyondWork/BeyondWork'));
const ReadyToDiscussSection = lazy(
  () => import('@/components/AboutMePage/ReadyToDiscuss/ReadyToDiscuss')
);
const EducationSection = lazy(() => import('@/components/AboutMePage/Education/Education'));

const AboutMePage = () => {
  return (
    <div className="about-me-page-container">
      <div className="name-graphic-container">
        <AnimatedNameGraphic className="half-graphic" shadowColor="white" strokeColor="white" />
      </div>
      <div className="about-me-page-content-container">
        <div className="personal-detail">
          <LazyOnScroll
            Component={PersonalInformationSection}
            fallback={<PersonalInformationSkeleton />}
            estimatedHeight="400px"
            autoAdjustHeight={true}
            placeholder={<PersonalInformationSkeleton />}
          />
          <div className="tech-stack-container">
            <LazyOnScroll
              Component={TechStackSection}
              fallback={<TechnologyCarouselSkeleton />}
              estimatedHeight="300px"
              autoAdjustHeight={true}
              placeholder={<TechnologyCarouselSkeleton />}
            />
          </div>
        </div>
        <div className="education">
          <LazyOnScroll
            Component={EducationSection}
            fallback={<EducationSkeleton />}
            estimatedHeight="100vh"
            autoAdjustHeight={true}
            placeholder={<EducationSkeleton />}
          />
        </div>
        <div className="main-skills">
          <LazyOnScroll
            Component={MainSkillsSection}
            fallback={<MainSkillsSkeleton />}
            estimatedHeight="500px"
            autoAdjustHeight={true}
            placeholder={<MainSkillsSkeleton />}
          />
        </div>
        <div className="beyond-work">
          <LazyOnScroll
            Component={BeyondWorkSection}
            fallback={<BeyondWorkSkeleton />}
            estimatedHeight="100px"
            autoAdjustHeight={true}
            placeholder={<BeyondWorkSkeleton />}
          />
        </div>
        <div className="ready-to-discuss">
          <LazyOnScroll
            Component={ReadyToDiscussSection}
            fallback={<ReadyToDiscussSkeleton />}
            estimatedHeight="200px"
            autoAdjustHeight={true}
            placeholder={<ReadyToDiscussSkeleton />}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;