import { AnimatedNameGraphic } from '@/components/AboutMePage/AnimatedNameGraphic/AnimatedNameGraphic';
import { PersonalInformation } from '@/components/AboutMePage/PersonalInformation/PersonalInformation';
import './AboutMePage.css';

const AboutMePage = () => {


    return (
        <div className='about-me-page-container' >
            <div className="name-graphic-container">
                <AnimatedNameGraphic className='half-graphic' shadowColor='white' strokeColor='white' />
            </div>
            <div className="about-me-page-content-container">
                <div className="personal-detail">
                    <PersonalInformation />
                </div>
            </div>
        </div>
    );
};

export default AboutMePage;