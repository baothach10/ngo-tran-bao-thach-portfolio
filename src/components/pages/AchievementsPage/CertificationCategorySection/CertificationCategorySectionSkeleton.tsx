import React from 'react';
import ContentLoader from 'react-content-loader';

import './CertificationCategorySection.css';
import { isMobileDevice } from '@/utils';

interface ICertificationCategorySectionSkeletonProps {
  speed?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  certificationCount?: number;
}

const CertificationCategorySectionSkeleton: React.FC<
  ICertificationCategorySectionSkeletonProps
> = ({
  speed = 2,
  backgroundColor = '#333333',
  foregroundColor = '#555555',
  certificationCount = 2
}) => {
    // Responsive adjustments
    const isMobile = isMobileDevice();
    const isTablet = document.documentElement.clientWidth >= 500;

    // Responsive sizes
    const sizes = {
      categoryTitleWidth: isMobile ? (isTablet ? 250 : 180) : 350,
      categoryTitleHeight: isMobile ? (isTablet ? 28 : 24) : 36,
      categoryDescWidth: isMobile ? (isTablet ? 400 : 280) : 600,
      categoryDescHeight: isMobile ? (isTablet ? 20 : 16) : 24,
      certCardWidth: '100%',
      certCardHeight: isMobile ? (isTablet ? 120 : 100) : 160,
      certImageSize: isMobile ? (isTablet ? 60 : 50) : 80,
      certTitleWidth: isMobile ? (isTablet ? 200 : 150) : 300,
      certTitleHeight: isMobile ? (isTablet ? 18 : 16) : 20,
      certIssuerWidth: isMobile ? (isTablet ? 150 : 100) : 200,
      certIssuerHeight: isMobile ? (isTablet ? 16 : 14) : 18,
      certDateWidth: isMobile ? (isTablet ? 100 : 80) : 120,
      certDateHeight: isMobile ? (isTablet ? 14 : 12) : 16,
      readMoreWidth: isMobile ? (isTablet ? 100 : 80) : 120,
      readMoreHeight: isMobile ? (isTablet ? 32 : 28) : 24,
      interactiveShapeSize: isMobile ? (isTablet ? 300 : 200) : 700,
      borderRadius: isMobile ? (isTablet ? 12 : 8) : 16,
      cardGap: isMobile ? (isTablet ? 16 : 12) : 24
    };

    const renderCertificationCard = (cardIndex: number) => (
      <div
        key={cardIndex}
        style={{
          width: '100%',
          // marginBottom: sizes.cardGap,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <ContentLoader
          speed={speed}
          width="100%"
          height={sizes.certCardHeight}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          style={{
            width: '100%',
            borderRadius: sizes.borderRadius,
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Certification Image */}
          <rect
            x="24"
            y={isMobile ? '16' : '30'}
            rx={8}
            width={sizes.certImageSize}
            height={sizes.certImageSize}
          />

          {/* Certification Title */}
          <rect
            x={sizes.certImageSize + 48}
            y={isMobile ? '16' : '30'}
            rx={4}
            width={sizes.certTitleWidth}
            height={sizes.certTitleHeight}
          />

          {/* Certification Issuer */}
          <rect
            x={sizes.certImageSize + 48}
            y={isMobile ? 16 + sizes.certTitleHeight + 8 : 30 + sizes.certTitleHeight + 8}
            rx={4}
            width={sizes.certIssuerWidth}
            height={sizes.certIssuerHeight}
          />

          {/* Issue Date */}
          <rect
            x={sizes.certImageSize + 48}
            y={
              isMobile
                ? 16 + sizes.certTitleHeight + sizes.certIssuerHeight + 16
                : 30 + sizes.certTitleHeight + sizes.certIssuerHeight + 16
            }
            rx={4}
            width={sizes.certDateWidth}
            height={sizes.certDateHeight}
          />

          {/*  Read More Button */}
          <rect
            x={sizes.certImageSize + 48}
            y={
              isMobile
                ? 16 + sizes.certTitleHeight + sizes.certIssuerHeight + sizes.certDateHeight + 24
                : 30 + sizes.certTitleHeight + sizes.certIssuerHeight + sizes.certDateHeight + 24
            }
            rx={4}
            width={sizes.readMoreWidth}
            height={sizes.readMoreHeight}
          />
        </ContentLoader>
      </div>
    );

    return (
      <div className="certification-category-section">
        <div className="certification-category-content">
          {/* Category Title */}
          <ContentLoader
            speed={speed}
            width={sizes.categoryTitleWidth}
            height={sizes.categoryTitleHeight}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
            style={{ marginBottom: '16px' }}
          >
            <rect
              x='0'
              y="0"
              rx={4}
              width={sizes.categoryTitleWidth}
              height={sizes.categoryTitleHeight}
            />
          </ContentLoader>


          {/* Category Description */}
          <ContentLoader
            speed={speed}
            width="100%"
            height={sizes.categoryDescHeight}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
            style={{ marginBottom: '32px' }}
          >
            <rect
              x="0"
              y="0"
              rx={4}
              width={sizes.categoryDescWidth}
              height={sizes.categoryDescHeight}
            />
          </ContentLoader>

          {/* Certification Cards */}
          <div className="certification-list">
            {Array.from({ length: certificationCount }).map((_, certIndex) =>
              renderCertificationCard(certIndex)
            )}
          </div>
        </div>

        {/* Interactive Shapes Chart Placeholder */}
        <div className="certification-category-chart">
          <ContentLoader
            speed={speed}
            width={sizes.interactiveShapeSize}
            height={sizes.interactiveShapeSize}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
            style={{
              borderRadius: sizes.borderRadius,
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            {/* Interactive Shapes Container Background */}
            <rect
              x="0"
              y="0"
              rx={sizes.borderRadius}
              width={sizes.interactiveShapeSize}
              height={sizes.interactiveShapeSize}
            />
          </ContentLoader>
        </div>
      </div>
    );
  };

export default CertificationCategorySectionSkeleton;
