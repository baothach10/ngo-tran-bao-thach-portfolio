import { AnimatedNameGraphic } from '@/components/AboutMePage/AnimatedNameGraphic/AnimatedNameGraphic';
import { MainSkills } from '@/components/AboutMePage/MainSkills/MainSkills';
import { PersonalInformation } from '@/components/AboutMePage/PersonalInformation/PersonalInformation';
import './AboutMePage.css';
import { TechnologyCarousel } from '@/components/Carousel/TechnologyCarousel/TechnologyCarousel';
import { SectionTitle } from '@/components/layout/SectionTitle/SectionTitle';

const AboutMePage = () => {


    return (
        <div className='about-me-page-container' >
            <div className="name-graphic-container">
                <AnimatedNameGraphic className='half-graphic' shadowColor='white' strokeColor='white' />
            </div>
            <div className="about-me-page-content-container">
                <div className="personal-detail">
                    <PersonalInformation />
                    <SectionTitle content='My Tech Stack' />
                    <div className="tech-stack-container">
                        <TechnologyCarousel  />
                    </div>
                </div>
                <div className="main-skills">
                    <MainSkills />
                </div>
                <div className="tech-stack-container">
                </div>
            </div>
        </div>
    );
};

export default AboutMePage;