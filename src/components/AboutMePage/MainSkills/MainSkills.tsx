import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

import './MainSkills.css';
import { ExpertiseBlock } from '../ExpertiseBlock/ExpertiseBlock';

import { AiIcon } from './SkillIcons/AiIcon';
import { DevelopmentIcon } from './SkillIcons/DevelopmentIcon';
import { GameIcon } from './SkillIcons/GameIcon';
import { SeoIcon } from './SkillIcons/SeoIcon';

import AuroraBackground from '@/components/backgrounds/AuroraBackground/AuroraBackground';
import { SectionTitle } from '@/components/layout/SectionTitle/SectionTitle';
import { isMobileDevice } from '@/utils';


const MainSkills = () => {
    const iconSize = isMobileDevice() ? 40 : 60; // Adjust icon size based on device type

    const expertiseBlock1 = useRef<HTMLDivElement>(null);
    const expertiseBlock2 = useRef<HTMLDivElement>(null);
    const expertiseBlock3 = useRef<HTMLDivElement>(null);
    const expertiseBlock4 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            defaults: { duration: 1.5, ease: 'power3.out' }
        });

        tl.from(expertiseBlock1.current, { x: -200, opacity: 0 })
            .from(expertiseBlock2.current, { x: 200, opacity: 0 }, '<') // '<' means animate simultaneously
            .from(expertiseBlock3.current, { x: -200, opacity: 0 }, '<') // '<' means animate simultaneously
            .from(expertiseBlock4.current, { x: 200, opacity: 0 }, '<'); // '<' means animate simultaneously
    }, []);

    return (
        <section className='main-skills-section'>
            {/* <div className="background-container">
                <AuroraBackground colorStops={['#ffffff', '#cccccc', '#8c8c8c']} />
            </div> */}
            <div className="main-skills-title-container">
                <SectionTitle content='My Expertise' />
            </div>

            <div className="main-skills-container">
                <div className="expertise-block-container" ref={expertiseBlock1}>

                    <ExpertiseBlock
                        icon={<DevelopmentIcon width={iconSize} height={iconSize} />}
                        title='Frontend Expertise'
                        description='I bring pixel perfect designs to life with web libraries and animation frameworks, ensuring smooth, accessible user experiences—
                    guided by top industry portfolio practices.'
                        tools={['ReactJS', 'NextJS', 'ThreeJS', 'TailwindCSS', 'GSAP', 'VueJS', 'NuxtJS', 'Adobe Xd', 'Figma', 'Vite', 'Webpack']}
                    />
                </div>
                <div className="expertise-block-container" ref={expertiseBlock2}>
                    <ExpertiseBlock
                        icon={<GameIcon width={iconSize} height={iconSize} />}
                        title='Playable Ads & Game Development'
                        description='I craft mini-interactive demos that captivate users—designing intuitive tutorials, engaging gameplay, and high performing end cards,
                    following proven design patterns in ad tech.'
                        tools={['ReactJS', 'PhaserJS', 'ThreeJS', 'TailwindCSS', 'GSAP', 'Blender', 'Vite', 'Adobe Xd', 'Figma', 'Interactive End Card (IEC)']}
                    />
                </div>
                <div className="expertise-block-container" ref={expertiseBlock3}>
                    <ExpertiseBlock
                        icon={<AiIcon width={iconSize} height={iconSize} />}
                        title='AI & Data Analytics'
                        description='I integrate smart automation, predictive models, and real time data viz into projects—turning raw numbers into actionable insights and helping
                    stakeholders make data driven decisions.'
                        tools={['Python', 'SQL', 'NoSQL', 'Tableau', "Kaggle", 'Google Colab', 'Large Language Models (LLMs)', 'Statistical Testing', "Machine Learning", 'Deep Learning']}
                    />
                </div>
                <div className="expertise-block-container" ref={expertiseBlock4}>
                    <ExpertiseBlock
                        icon={<SeoIcon width={iconSize} height={iconSize} />}
                        title='SEO Optimization'
                        description="I build SEO-optimized, mobile-first websites using semantic HTML, fast-loading assets, and structured data—ensuring high performance, voice search readiness, and strong search visibility."
                        tools={['Image Optimization', 'Accessibility', 'Technical SEO', 'Metadata Management', 'Responsive Design', 'Lighthouse Performance', 'Google Search Console']}
                    />
                </div>
            </div>
        </section>
    )
}

export default MainSkills;