import { lazy, Suspense } from 'react';

import { AnimatedNameGraphic } from '@/components/AboutMePage/AnimatedNameGraphic/AnimatedNameGraphic';
import { SectionTitle } from '@/components/layout/SectionTitle/SectionTitle';
import './AboutMePage.css';
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent';

const MainSkillsSection = lazy(() => import('@/components/AboutMePage/MainSkills/MainSkills'));
const PersonalInformationSection = lazy(() => import('@/components/AboutMePage/PersonalInformation/PersonalInformation'));
const TechnologyCarousel = lazy(() => import('@/components/Carousel/TechnologyCarousel/TechnologyCarousel'));
const BeyondWorkSection = lazy(() => import('@/components/AboutMePage/BeyondWork/BeyondWork'));
const ReadyToDiscussSection = lazy(() => import('@/components/AboutMePage/ReadyToDiscuss/ReadyToDiscuss'));
const EducationSection = lazy(() => import('@/components/AboutMePage/Education/Education'));


const AboutMePage = () => {
    return (
        <div className='about-me-page-container' >
            <div className="name-graphic-container">
                <AnimatedNameGraphic className='half-graphic' shadowColor='white' strokeColor='white' />
            </div>
            <div className="about-me-page-content-container">
                <div className="personal-detail">
                    <Suspense fallback={<LoadingComponent />}>
                        <PersonalInformationSection />
                    </Suspense>
                    <SectionTitle content='My Tech Stack' />
                    <div className="tech-stack-container">
                        <Suspense fallback={<LoadingComponent />}>
                            <TechnologyCarousel />
                        </Suspense>
                    </div>
                </div>
                <div className="education">
                    <Suspense fallback={<LoadingComponent />}>
                        <EducationSection />
                    </Suspense>
                </div>
                <div className="main-skills">
                    <Suspense fallback={<LoadingComponent />}>
                        <MainSkillsSection />
                    </Suspense>
                </div>
                <div className="beyond-work">
                    <Suspense fallback={<LoadingComponent />}>
                        <BeyondWorkSection />
                    </Suspense>
                </div>
                <div className="ready-to-discuss">
                    <Suspense fallback={<LoadingComponent />}>
                        <ReadyToDiscussSection />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default AboutMePage;