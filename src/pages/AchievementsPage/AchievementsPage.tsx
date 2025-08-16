import React, { Suspense } from 'react';
import './AchievementsPage.css';

import { AnimatedNameGraphic } from '@/components/pages/AboutMePage/AnimatedNameGraphic/AnimatedNameGraphic';
import AwardsSectionSkeleton from '@/components/pages/AchievementsPage/AwardsSection/AwardsSectionSkeleton';
import CertificationsSection from '@/components/pages/AchievementsPage/CertificationsSection/CertificationsSection';
import { isMobileDevice } from '@/utils';

const AwardsSection = React.lazy(
  () => import('@/components/pages/AchievementsPage/AwardsSection/AwardsSection')
);

const AchievementsPage: React.FC = () => {
  const animatedNameHeight = isMobileDevice()
    ? document.documentElement.clientWidth < 1024
      ? '4rem'
      : '7rem'
    : '10rem';
  return (
    <div className="achievements-page-container">
      <div className="achievements-page-wrapper">
        <div className="name-graphic-container">
          <AnimatedNameGraphic
            className="half-graphic"
            shadowColor="white"
            strokeColor="white"
            height={animatedNameHeight}
          />
        </div>
        <div className="awards-section">
          <Suspense fallback={<AwardsSectionSkeleton />}>
            <AwardsSection />
          </Suspense>
        </div>
        <div className="certifications-section">
          <CertificationsSection />
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;

