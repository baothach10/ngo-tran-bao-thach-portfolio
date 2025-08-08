import { gsap } from 'gsap';
import React from 'react';

import './WorkHighlightsPage.css';
import { SectionTitle } from '@/components/layout/SectionTitle/SectionTitle';

const WorkHighlightsPage: React.FC = () => {
    return (
        <div className="work-highlights-page-container">
            <section className="professional-experience-section">
                <div className="professional-experience-title-container">
                    <SectionTitle content="Professional Experience" />
                    <h4 className="subtitle">
                        A showcase of my professional journey, highlighting key roles and contributions.
                    </h4>
                </div>
                <div className="professional-experience-content">Hello</div>
            </section>

            <section className="projects-section">
                <div className="projects-title-container">
                    <SectionTitle content="Featured Work" />
                    <h4 className="subtitle">
                        A selection of projects that demonstrate my skills and impact in various domains.
                    </h4>
                </div>
                <div className="projects-content">
                    Hello
                </div>
            </section>
        </div>
    );
};

export default WorkHighlightsPage;