import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';

import TechnologyCarouselSkeleton from '@/components/Carousel/TechnologyCarousel/TechnologyCarouselSkeleton';
import { AnimatedNameGraphic } from '@/components/pages/AboutMePage/AnimatedNameGraphic/AnimatedNameGraphic';
import BeyondWorkSkeleton from '@/components/pages/AboutMePage/BeyondWork/BeyondWorkSkeleton';
import EducationSkeleton from '@/components/pages/AboutMePage/Education/EducationSkeleton';
import MainSkillsSkeleton from '@/components/pages/AboutMePage/MainSkills/MainSkillsSkeleton';
import PersonalInformationSkeleton from '@/components/pages/AboutMePage/PersonalInformation/PersonalInformationSkeleton';
import ReadyToDiscussSkeleton from '@/components/pages/AboutMePage/ReadyToDiscuss/ReadyToDiscussSkeleton';
import './AboutMePage.css';
import { isMobileDevice } from '@/utils';

const MainSkillsSection = lazy(() => import('@/components/pages/AboutMePage/MainSkills/MainSkills'));
const PersonalInformationSection = lazy(
  () => import('@/components/pages/AboutMePage/PersonalInformation/PersonalInformation')
);
const TechStackSection = lazy(
  () => import('@/components/Carousel/TechnologyCarousel/TechStackSection')
);
const BeyondWorkSection = lazy(() => import('@/components/pages/AboutMePage/BeyondWork/BeyondWork'));
const ReadyToDiscussSection = lazy(
  () => import('@/components/pages/AboutMePage/ReadyToDiscuss/ReadyToDiscuss')
);
const EducationSection = lazy(() => import('@/components/pages/AboutMePage/Education/Education'));

const AboutMePage = () => {
  const animatedNameHeight = isMobileDevice() ? document.documentElement.clientWidth < 768 ? "4rem" : "7rem" : '10rem'
  return (
    <div className="about-me-page-container">
      <Helmet>
        <title>About Me | Ngo Tran Bao Thach</title>
        <meta
          name="description"
          content="Learn more about Ngo Tran Bao Thach, a frontend developer passionate about React, Three.js, and interactive web experiences."
        />
        <meta property="og:title" content="About Me | Ngo Tran Bao Thach" />
        <meta
          property="og:description"
          content="Discover Ngo Tran Bao Thach’s background, skills, and journey as a frontend developer."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ngo-tran-bao-thach.vercel.app/about-me" />
        <meta property="og:image" content="/assets/images/portrait1.webp" />
      </Helmet>

      <div className="name-graphic-container">
        <AnimatedNameGraphic className="half-graphic" shadowColor="white" strokeColor="white" height={animatedNameHeight} />
      </div>

      <div className="about-me-page-content-container">
        <div className="personal-detail">
          <Suspense fallback={<PersonalInformationSkeleton />}>
            <PersonalInformationSection />
          </Suspense>
          <div className="tech-stack-container">
            <Suspense fallback={<TechnologyCarouselSkeleton />}>
              <TechStackSection />
            </Suspense>
          </div>
        </div>

        <div className="education">
          <Suspense fallback={<EducationSkeleton />}>
            <EducationSection />
          </Suspense>
        </div>

        <div className="main-skills">
          <Suspense fallback={<MainSkillsSkeleton />}>
            <MainSkillsSection />
          </Suspense>
        </div>

        <div className="beyond-work">
          <Suspense fallback={<BeyondWorkSkeleton />}>
            <BeyondWorkSection />
          </Suspense>
        </div>

        <div className="ready-to-discuss">
          <Suspense fallback={<ReadyToDiscussSkeleton />}>
            <ReadyToDiscussSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;