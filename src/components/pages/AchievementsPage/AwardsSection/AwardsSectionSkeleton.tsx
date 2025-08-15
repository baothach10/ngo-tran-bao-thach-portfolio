import React from 'react';
import ContentLoader from 'react-content-loader';

import './AwardsSection.css';
import { isMobileDevice } from '@/utils';

interface IAwardsSectionSkeletonProps {
  speed?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  cardCount?: number;
}

const AwardsSectionSkeleton: React.FC<IAwardsSectionSkeletonProps> = ({
  speed = 2,
  backgroundColor = '#888888',
  foregroundColor = 'white',
  cardCount = 3
}) => {
  // Responsive adjustments
  const isMobile = isMobileDevice();

  const isTablet = document.documentElement.clientWidth >= 500;

  // Card sizes
  const sizes = {
    sectionTitleWith: isMobile ? (isTablet ? 300 : 150) : 400,
    sectionTitleHeight: isMobile ? (isTablet ? 30 : 35) : 48,
    cardWidth: isMobile ? (isTablet ? 650 : 320) : document.documentElement.clientWidth < 1600 ? 1200 : 1600,
    cardHeight: isMobile ? (isTablet ? 440 : 360) : 400,
    logoSize: isMobile ? (isTablet ? 120 : 60) : 100,
    logoRadius: 8,
    titleWidth: isMobile ? (isTablet ? 480 : 180) : 560,
    titleHeight: isMobile ? (isTablet ? 20 : 18) : 24,
    issuerWidth: isMobile ? (isTablet ? 300 : 120) : 380,
    issuerHeight: isMobile ? (isTablet ? 18 : 14) : 24,
    detailWidth: isMobile ? (isTablet ? 180 : 70) : 220,
    detailHeight: isMobile ? (isTablet ? 16 : 12) : 24,
    achievementWidth: isMobile ? (isTablet ? 80 : 40) : 100,
    achievementHeight: isMobile ? (isTablet ? 16 : 12) : 24,
    achievementGap: isMobile ? (isTablet ? 12 : 10) : 16,
    cardGap: isMobile ? (isTablet ? 28 : 24) : 32,
    borderRadius: isMobile ? (isTablet ? 10 : 8) : 12,
    rowGap: isMobile ? (isTablet ? 30 : 25) : 40,
    viewButtonHeight: isMobile ? (isTablet ? 60 : 38) : 48
  };

  return (
    <section className="awards-section-container" style={{ width: '100%' }}>
      <div
        className="awards-section-title"
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
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto'
          }}
        >
          <ContentLoader
            speed={speed}
            width={'100%'}
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
      <div className="awards-section-content">
        <div
          className="awards-list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: sizes.cardGap,
            marginTop: isMobile ? 8 : 32,
            width: '100%'
          }}
        >
          {Array.from({ length: cardCount }).map((_, idx) => (
            <div
              key={idx}
              className="awards-card-wrapper"
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
                height={sizes.cardHeight}
                backgroundColor={backgroundColor}
                foregroundColor={foregroundColor}
                style={{ width: '100%' }}
              >
                {isMobile ? (
                  // Mobile/Tablet Column Layout
                  <>
                    {/* Issuer Logo - Centered */}
                    <rect
                      x={(sizes.cardWidth - sizes.logoSize) / 2}
                      y="24"
                      rx={sizes.logoRadius}
                      width={sizes.logoSize}
                      height={sizes.logoSize}
                    />
                    {/* Award Title - Centered */}
                    <rect
                      x={(sizes.cardWidth - sizes.titleWidth) / 2}
                      y={24 + sizes.logoSize + sizes.rowGap}
                      rx={sizes.borderRadius}
                      width={sizes.titleWidth}
                      height={sizes.titleHeight}
                    />
                    {/* Issuer Name - Centered */}
                    <rect
                      x={(sizes.cardWidth - sizes.issuerWidth) / 2}
                      y={24 + sizes.logoSize + sizes.titleHeight + sizes.rowGap * 2}
                      rx={sizes.borderRadius}
                      width={sizes.issuerWidth}
                      height={sizes.issuerHeight}
                    />
                    {/* Award Details (Issue Date) - Centered */}
                    <rect
                      x={(sizes.cardWidth - sizes.detailWidth) / 2}
                      y={
                        24 +
                        sizes.logoSize +
                        sizes.titleHeight +
                        sizes.issuerHeight +
                        sizes.rowGap * 3
                      }
                      rx={sizes.borderRadius}
                      width={sizes.detailWidth}
                      height={sizes.detailHeight}
                    />
                    {/* Achievements Label - Centered */}
                    <rect
                      x={(sizes.cardWidth - 100) / 2}
                      y={
                        24 +
                        sizes.logoSize +
                        sizes.titleHeight +
                        sizes.issuerHeight +
                        sizes.detailHeight +
                        sizes.rowGap * 4
                      }
                      rx={sizes.borderRadius}
                      width={100}
                      height={14}
                    />
                    {/* Achievements - Centered Grid */}
                    {Array.from({ length: isMobile ? 3 : 5 }).map((_, achievementIdx) => {
                      const totalWidth =
                        (isMobile ? 3 : 5) * sizes.achievementWidth +
                        (isMobile ? 2 : 4) * sizes.achievementGap;
                      const startX = (sizes.cardWidth - totalWidth) / 2;
                      return (
                        <rect
                          key={achievementIdx}
                          x={
                            startX +
                            achievementIdx * (sizes.achievementWidth + sizes.achievementGap)
                          }
                          y={
                            24 +
                            sizes.logoSize +
                            sizes.titleHeight +
                            sizes.issuerHeight +
                            sizes.detailHeight +
                            sizes.rowGap * 6
                          }
                          rx={sizes.borderRadius}
                          width={sizes.achievementWidth}
                          height={sizes.achievementHeight}
                        />
                      );
                    })}
                    {/* Read More Button Skeleton */}
                    <rect
                      x={0}
                      y={sizes.cardHeight - sizes.viewButtonHeight}
                      width={'100%'}
                      height={sizes.viewButtonHeight}
                    />
                  </>
                ) : (
                  // Desktop Row Layout
                  <>
                    {/* Issuer Logo */}
                    <rect
                      x="24"
                      y="24"
                      rx={sizes.logoRadius}
                      width={sizes.logoSize}
                      height={sizes.logoSize}
                    />
                    {/* Award Title */}
                    <rect
                      x={sizes.logoSize + 48}
                      y="24"
                      rx={sizes.borderRadius}
                      width={sizes.titleWidth}
                      height={sizes.titleHeight}
                    />
                    {/* Issuer Name */}
                    <rect
                      x={sizes.logoSize + 48}
                      y={24 + sizes.titleHeight + sizes.rowGap}
                      rx={sizes.borderRadius}
                      width={sizes.issuerWidth}
                      height={sizes.issuerHeight}
                    />
                    {/* Award Details (Issue Date) */}
                    <rect
                      x={sizes.logoSize + 48}
                      y={24 + sizes.titleHeight + sizes.issuerHeight + sizes.rowGap * 2}
                      rx={sizes.borderRadius}
                      width={sizes.detailWidth}
                      height={sizes.detailHeight}
                    />
                    {/* Achievements Label */}
                    <rect
                      x={sizes.logoSize + 48}
                      y={
                        28 +
                        sizes.titleHeight +
                        sizes.issuerHeight +
                        sizes.detailHeight +
                        sizes.rowGap * 3
                      }
                      rx={sizes.borderRadius}
                      width={100}
                      height={14}
                    />
                    {/* Achievements (3-5 items) */}
                    {Array.from({ length: 5 }).map((_, achievementIdx) => (
                      <rect
                        key={achievementIdx}
                        x={
                          sizes.logoSize +
                          48 +
                          achievementIdx * (sizes.achievementWidth + sizes.achievementGap)
                        }
                        y={
                          28 +
                          sizes.titleHeight +
                          sizes.issuerHeight +
                          sizes.detailHeight +
                          14 +
                          sizes.rowGap * 4
                        }
                        rx={sizes.borderRadius}
                        width={sizes.achievementWidth}
                        height={sizes.achievementHeight}
                      />
                    ))}
                    {/* Read More Button Skeleton */}
                    <rect
                      x={0}
                      y={sizes.cardHeight - sizes.viewButtonHeight}
                      width={'100%'}
                      height={sizes.viewButtonHeight}
                    />
                  </>
                )}
              </ContentLoader>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSectionSkeleton;
