import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
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
      <Helmet>
        <title>Achievements | Ngo Tran Bao Thach</title>
        <meta
          name="description"
          content="Explore the awards and certifications earned by Ngo Tran Bao Thach, showcasing achievements in education, technology, and career growth."
        />
        <meta property="og:title" content="Achievements | Ngo Tran Bao Thach" />
        <meta
          property="og:description"
          content="Discover certifications and awards earned by Ngo Tran Bao Thach, including IELTS, Google Analytics, and frontend development."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://ngo-tran-bao-thach.vercel.app/achievements"
        />
      </Helmet>
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

