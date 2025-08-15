import React from 'react';
import ContentLoader from 'react-content-loader';

import './KeyProjectsSection.css';
import { isMobileDevice } from '@/utils';

interface IKeyProjectsSkeletonProps {
  speed?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  cardCount?: number;
}

const KeyProjectsSkeleton: React.FC<IKeyProjectsSkeletonProps> = ({
  speed = 2,
  backgroundColor = '#888888',
  foregroundColor = 'white',
  cardCount = 2
}) => {
  const isMobile = isMobileDevice();
  const isTablet = document.documentElement.clientWidth >= 500;

  // Sizing logic matches ProfessionalExperienceSkeleton
  const sizes = {
    sectionTitleWidth: isMobile ? (isTablet ? 400 : 200) : 500,
    sectionTitleHeight: isMobile ? (isTablet ? 30 : 35) : 48,
    gridGap: isMobile ? (isTablet ? 28 : 24) : 48,
    cardWidth: isMobile ? (isTablet ? 600 : 320) : document.documentElement.clientWidth < 1600 ? 520 : 720,
    cardHeight: isMobile ? (isTablet ? 480 : 350) : 600,
    thumbSize: isMobile ? (isTablet ? 300 : 200) : 400,
    thumbRadius: isMobile ? (isTablet ? 10 : 8) : 12,
    titleWidth: isMobile ? (isTablet ? 380 : 160) : 420,
    titleHeight: isMobile ? (isTablet ? 20 : 16) : 32,
    ownerWidth: isMobile ? (isTablet ? 120 : 100) : 160,
    ownerHeight: isMobile ? (isTablet ? 16 : 12) : 20,
    typeWidth: isMobile ? (isTablet ? 120 : 100) : 160,
    typeHeight: isMobile ? (isTablet ? 16 : 12) : 20,
    roleWidth: isMobile ? (isTablet ? 80 : 60) : 120,
    roleHeight: isMobile ? (isTablet ? 16 : 12) : 20,
    roleGap: isMobile ? (isTablet ? 12 : 8) : 16,
    buttonHeight: isMobile ? (isTablet ? 40 : 32) : 48,
    buttonRadius: isMobile ? (isTablet ? 10 : 8) : 25,
    buttonWidth: isMobile ? (isTablet ? 200 : 150) : 200,
    borderRadius: isMobile ? (isTablet ? 10 : 8) : 12
  };

  // Layout: grid for desktop, column for mobile
  const gridStyle: React.CSSProperties = isMobile
    ? { display: 'flex', flexDirection: 'column', gap: sizes.gridGap, width: '100%' }
    : { display: 'grid', gridTemplateColumns: `repeat(2, 1fr)`, gap: sizes.gridGap, width: '100%' };

  return (
    <section className="key-projects-section" style={{ width: '100%' }}>
      <div
        className="key-projects-section-title"
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
            width: sizes.sectionTitleWidth,
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto'
          }}
        >
          <ContentLoader
            speed={speed}
            width={sizes.sectionTitleWidth}
            height={sizes.sectionTitleHeight}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
            style={{ width: '100%' }}
          >
            <rect
              x={0}
              y={0}
              rx={sizes.borderRadius}
              width={sizes.sectionTitleWidth}
              height={sizes.sectionTitleHeight}
            />
          </ContentLoader>
        </div>
      </div>
      <div className="key-projects-grid" style={gridStyle}>
        {Array.from({ length: cardCount }).map((_, idx) => {
          // For desktop, add marginTop to right-side items (idx % 2 === 1)
          const isRight = !isMobile && idx % 2 === 1;
          return (
            <div
              key={idx}
              className="key-project-card"
              style={{
                width: sizes.cardWidth,
                minWidth: 280,
                margin: '0 auto',
                borderRadius: sizes.borderRadius,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'none',
                marginTop: isRight ? 96 : undefined
              }}
            >
              <ContentLoader
                speed={speed}
                width={sizes.cardWidth}
                height={sizes.cardHeight}
                backgroundColor={backgroundColor}
                foregroundColor={foregroundColor}
                style={{ width: '100%' }}
              >
                {/* Thumbnail */}
                <rect
                  x={0}
                  y={0}
                  rx={sizes.thumbRadius}
                  width={sizes.cardWidth}
                  height={sizes.thumbSize}
                />
                {/* Project Title */}
                <rect
                  x={(sizes.cardWidth - sizes.titleWidth) / 2}
                  y={sizes.thumbSize + 24}
                  rx={sizes.borderRadius}
                  width={sizes.titleWidth}
                  height={sizes.titleHeight}
                />
                {/* Owner */}
                <rect
                  x={(sizes.cardWidth - (sizes.ownerWidth + sizes.typeWidth + 16)) / 2}
                  y={sizes.thumbSize + 24 + sizes.titleHeight + 12}
                  rx={sizes.borderRadius}
                  width={sizes.ownerWidth}
                  height={sizes.ownerHeight}
                />
                {/* Type */}
                <rect
                  x={
                    (sizes.cardWidth - (sizes.ownerWidth + sizes.typeWidth + 16)) / 2 +
                    sizes.ownerWidth +
                    16
                  }
                  y={sizes.thumbSize + 24 + sizes.titleHeight + 12}
                  rx={sizes.borderRadius}
                  width={sizes.typeWidth}
                  height={sizes.typeHeight}
                />
                {/* Roles (3 items) */}
                {Array.from({ length: 3 }).map((_, roleIdx) => (
                  <rect
                    key={roleIdx}
                    x={
                      (sizes.cardWidth - (3 * sizes.roleWidth + 2 * sizes.roleGap)) / 2 +
                      roleIdx * (sizes.roleWidth + sizes.roleGap)
                    }
                    y={sizes.thumbSize + 24 + sizes.titleHeight + sizes.ownerHeight + 32}
                    rx={sizes.borderRadius}
                    width={sizes.roleWidth}
                    height={sizes.roleHeight}
                  />
                ))}
                {/* View Project Button Skeleton */}
                <rect
                  x={(sizes.cardWidth - sizes.buttonWidth) / 2}
                  y={sizes.cardHeight - sizes.buttonHeight}
                  rx={sizes.buttonRadius}
                  width={sizes.buttonWidth}
                  height={sizes.buttonHeight}
                />
              </ContentLoader>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default KeyProjectsSkeleton;
