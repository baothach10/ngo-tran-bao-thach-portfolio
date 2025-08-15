import React from 'react';
import ContentLoader from 'react-content-loader';

import './ProfessionalExperienceSection.css';
import { isMobileDevice } from '@/utils';

interface IProfessionalExperienceSkeletonProps {
  speed?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  cardCount?: number;
}

const ProfessionalExperienceSkeleton: React.FC<IProfessionalExperienceSkeletonProps> = ({
  speed = 2,
  backgroundColor = '#888888',
  foregroundColor = 'white',
  cardCount = 2
}) => {
  // Responsive adjustments
  const isMobile = isMobileDevice();

  const isTablet = document.documentElement.clientWidth >= 500;

  // Card sizes
  const sizes = {
    sectionTitleWith: isMobile ? (isTablet ? 400 : 200) : 500,
    sectionTitleHeight: isMobile ? (isTablet ? 30 : 35) : 48,
    cardWidth: isMobile ? (isTablet ? 600 : 320) : 1600,
    cardHeight: isMobile ? (isTablet ? 280 : 200) : 360,
    logoSize: isMobile ? (isTablet ? 80 : 60) : 100,
    logoRadius: 8,
    titleWidth: isMobile ? (isTablet ? 280 : 180) : 560,
    titleHeight: isMobile ? (isTablet ? 20 : 18) : 24,
    companyWidth: isMobile ? (isTablet ? 200 : 120) : 380,
    companyHeight: isMobile ? (isTablet ? 18 : 14) : 24,
    detailWidth: isMobile ? (isTablet ? 80 : 50) : 220,
    detailHeight: isMobile ? (isTablet ? 16 : 12) : 24,
    abstractWidth: isMobile ? (isTablet ? 280 : 160) : 800,
    abstractHeight: isMobile ? (isTablet ? 16 : 12) : 24,
    skillWidth: isMobile ? (isTablet ? 50 : 30) : 100,
    skillHeight: isMobile ? (isTablet ? 16 : 12) : 24,
    skillGap: isMobile ? (isTablet ? 12 : 8) : 16,
    cardGap: isMobile ? (isTablet ? 28 : 24) : 32,
    borderRadius: isMobile ? (isTablet ? 10 : 8) : 12,
    rowGap: isMobile ? (isTablet ? 30 : 20) : 40
  };

  return (
    <section className="professional-experience-section" style={{ width: '100%' }}>
      <div
        className="professional-experience-section-title"
        style={{
          marginBottom: isMobile ? 16 : 48,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <div
          style={{
            width: sizes.cardWidth,
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto'
          }}
        >
          <ContentLoader
            speed={speed}
            width={sizes.cardWidth}
            height={sizes.sectionTitleHeight}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
            style={{ width: '100%' }}
          >
            <rect
              x={(sizes.cardWidth - sizes.sectionTitleWith) / 2}
              y="0"
              rx={sizes.borderRadius}
              width={sizes.sectionTitleWith}
              height={sizes.sectionTitleHeight}
            />
          </ContentLoader>
        </div>
      </div>
      <div
        className="professional-experience-list"
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          gap: sizes.cardGap,
          flexWrap: 'wrap',
          width: '100%'
        }}
      >
        {Array.from({ length: cardCount }).map((_, idx) => (
          <div
            key={idx}
            className="professional-experience-card-wrapper"
            style={{
              width: '100%',
              minWidth: 320,
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <ContentLoader
              speed={speed}
              width={'100%'}
              height={sizes.cardHeight + 60}
              backgroundColor={backgroundColor}
              foregroundColor={foregroundColor}
              style={{ width: '100%' }}
            >
              {/* Company Logo */}
              <rect
                x="24"
                y="24"
                rx={sizes.logoRadius}
                width={sizes.logoSize}
                height={sizes.logoSize}
              />
              {/* Position Title */}
              <rect
                x={sizes.logoSize + 48}
                y="24"
                rx={sizes.borderRadius}
                width={sizes.titleWidth}
                height={sizes.titleHeight}
              />
              {/* Company Name */}
              <rect
                x={sizes.logoSize + 48}
                y={24 + sizes.titleHeight + sizes.rowGap}
                rx={sizes.borderRadius}
                width={sizes.companyWidth}
                height={sizes.companyHeight}
              />
              {/* Employment Details (3 items) */}
              <rect
                x={sizes.logoSize + 48}
                y={24 + sizes.titleHeight + sizes.companyHeight + sizes.rowGap * 2}
                rx={sizes.borderRadius}
                width={sizes.detailWidth}
                height={sizes.detailHeight}
              />
              <rect
                x={sizes.logoSize + 48 + sizes.detailWidth + 16}
                y={24 + sizes.titleHeight + sizes.companyHeight + sizes.rowGap * 2}
                rx={sizes.borderRadius}
                width={sizes.detailWidth}
                height={sizes.detailHeight}
              />
              <rect
                x={sizes.logoSize + 48 + (sizes.detailWidth + 16) * 2}
                y={24 + sizes.titleHeight + sizes.companyHeight + sizes.rowGap * 2}
                rx={sizes.borderRadius}
                width={sizes.detailWidth}
                height={sizes.detailHeight}
              />
              {/* Abstract */}
              <rect
                x={sizes.logoSize + 48}
                y={
                  28 +
                  sizes.titleHeight +
                  sizes.companyHeight +
                  sizes.detailHeight +
                  sizes.rowGap * 3
                }
                rx={sizes.borderRadius}
                width={sizes.abstractWidth}
                height={sizes.abstractHeight}
              />
              {/* Skills (5 items) */}
              {Array.from({ length: 5 }).map((_, skillIdx) => (
                <rect
                  key={skillIdx}
                  x={sizes.logoSize + 48 + skillIdx * (sizes.skillWidth + sizes.skillGap)}
                  y={
                    28 +
                    sizes.titleHeight +
                    sizes.companyHeight +
                    sizes.detailHeight +
                    sizes.abstractHeight +
                    sizes.rowGap * 4
                  }
                  rx={sizes.borderRadius}
                  width={sizes.skillWidth}
                  height={sizes.skillHeight}
                />
              ))}
              {/* Read More Button Skeleton */}
              <rect x={0} y={sizes.cardHeight} width={'100%'} height={60} />
            </ContentLoader>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfessionalExperienceSkeleton;
