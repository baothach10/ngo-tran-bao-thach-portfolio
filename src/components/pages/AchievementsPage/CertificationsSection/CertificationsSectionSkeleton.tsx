import React from 'react';
import ContentLoader from 'react-content-loader';

import './CertificationsSection.css';
import { isMobileDevice } from '@/utils';

interface ICertificationsSectionSkeletonProps {
  speed?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  categoryCount?: number;
  certificationCount?: number;
}

const CertificationsSectionSkeleton: React.FC<ICertificationsSectionSkeletonProps> = ({
  speed = 2,
  backgroundColor = '#333333',
  foregroundColor = '#555555',
  categoryCount = 2,
  certificationCount = 3
}) => {
  // Responsive adjustments
  const isMobile = isMobileDevice();
  const isTablet = document.documentElement.clientWidth >= 768;

  // Responsive sizes
  const sizes = {
    sectionTitleWidth: isMobile ? (isTablet ? 300 : 200) : 400,
    sectionTitleHeight: isMobile ? (isTablet ? 35 : 30) : 48,
    categoryTitleWidth: isMobile ? (isTablet ? 250 : 180) : 350,
    categoryTitleHeight: isMobile ? (isTablet ? 28 : 24) : 36,
    categoryDescWidth: isMobile ? (isTablet ? 400 : 280) : 600,
    categoryDescHeight: isMobile ? (isTablet ? 20 : 16) : 24,
    certCardWidth: isMobile ? '100%' : 600,
    certCardHeight: isMobile ? (isTablet ? 120 : 100) : 140,
    certImageSize: isMobile ? (isTablet ? 60 : 50) : 80,
    certTitleWidth: isMobile ? (isTablet ? 200 : 150) : 300,
    certTitleHeight: isMobile ? (isTablet ? 18 : 16) : 20,
    certIssuerWidth: isMobile ? (isTablet ? 150 : 100) : 200,
    certIssuerHeight: isMobile ? (isTablet ? 16 : 14) : 18,
    certDateWidth: isMobile ? (isTablet ? 100 : 80) : 120,
    certDateHeight: isMobile ? (isTablet ? 14 : 12) : 16,
    certDescWidth: isMobile ? (isTablet ? 250 : 180) : 400,
    certDescHeight: isMobile ? (isTablet ? 16 : 14) : 18,
    readMoreWidth: isMobile ? (isTablet ? 100 : 80) : 120,
    readMoreHeight: isMobile ? (isTablet ? 32 : 28) : 36,
    interactiveShapeSize: isMobile ? (isTablet ? 300 : 200) : 500,
    borderRadius: isMobile ? (isTablet ? 12 : 8) : 16,
    cardGap: isMobile ? (isTablet ? 16 : 12) : 24,
    categoryGap: isMobile ? (isTablet ? 32 : 24) : 48
  };

  const renderCertificationCard = (cardIndex: number, certCardWidth: string | number) => (
    <div
      key={cardIndex}
      style={{
        width: '100%',
        marginBottom: sizes.cardGap,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <ContentLoader
        speed={speed}
        width={certCardWidth}
        height={sizes.certCardHeight}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        style={{ width: '100%', borderRadius: sizes.borderRadius }}
      >
        {/* Certification Image */}
        <rect x="16" y="16" rx={8} width={sizes.certImageSize} height={sizes.certImageSize} />

        {/* Certification Title */}
        <rect
          x={sizes.certImageSize + 32}
          y="16"
          rx={4}
          width={sizes.certTitleWidth}
          height={sizes.certTitleHeight}
        />

        {/* Certification Issuer */}
        <rect
          x={sizes.certImageSize + 32}
          y={16 + sizes.certTitleHeight + 8}
          rx={4}
          width={sizes.certIssuerWidth}
          height={sizes.certIssuerHeight}
        />

        {/* Issue Date */}
        <rect
          x={sizes.certImageSize + 32}
          y={16 + sizes.certTitleHeight + sizes.certIssuerHeight + 16}
          rx={4}
          width={sizes.certDateWidth}
          height={sizes.certDateHeight}
        />

        {/* Description */}
        <rect
          x={sizes.certImageSize + 32}
          y={16 + sizes.certTitleHeight + sizes.certIssuerHeight + sizes.certDateHeight + 24}
          rx={4}
          width={sizes.certDescWidth}
          height={sizes.certDescHeight}
        />

        {/* Read More Button */}
        <rect
          x={
            typeof certCardWidth === 'number'
              ? certCardWidth - sizes.readMoreWidth - 16
              : `calc(100% - ${sizes.readMoreWidth}px - 16px)`
          }
          y={sizes.certCardHeight - sizes.readMoreHeight - 16}
          rx={8}
          width={sizes.readMoreWidth}
          height={sizes.readMoreHeight}
        />
      </ContentLoader>
    </div>
  );

  const renderCategorySection = (categoryIndex: number) => (
    <div
      key={categoryIndex}
      style={{
        width: '100%',
        marginBottom: sizes.categoryGap,
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: sizes.borderRadius,
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '24px' : '48px',
          width: '100%'
        }}
      >
        {/* Category Content */}
        <div style={{ flex: 1 }}>
          {/* Category Title */}
          <ContentLoader
            speed={speed}
            width="100%"
            height={sizes.categoryTitleHeight}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
            style={{ marginBottom: '16px' }}
          >
            <rect
              x="0"
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: `${sizes.cardGap}px` }}>
            {Array.from({ length: certificationCount }).map((_, certIndex) =>
              renderCertificationCard(certIndex, sizes.certCardWidth)
            )}
          </div>
        </div>

        {/* Interactive Shapes Placeholder */}
        <div
          style={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isMobile ? '100%' : sizes.interactiveShapeSize,
            height: sizes.interactiveShapeSize
          }}
        >
          <ContentLoader
            speed={speed}
            width={sizes.interactiveShapeSize}
            height={sizes.interactiveShapeSize}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
          >
            {/* Interactive Shapes Container */}
            <rect
              x="0"
              y="0"
              rx={sizes.borderRadius}
              width={sizes.interactiveShapeSize}
              height={sizes.interactiveShapeSize}
            />

            {/* Mock shapes */}
            <circle
              cx={sizes.interactiveShapeSize * 0.3}
              cy={sizes.interactiveShapeSize * 0.3}
              r="20"
            />
            <circle
              cx={sizes.interactiveShapeSize * 0.7}
              cy={sizes.interactiveShapeSize * 0.4}
              r="15"
            />
            <circle
              cx={sizes.interactiveShapeSize * 0.5}
              cy={sizes.interactiveShapeSize * 0.6}
              r="18"
            />
            <circle
              cx={sizes.interactiveShapeSize * 0.2}
              cy={sizes.interactiveShapeSize * 0.8}
              r="12"
            />
            <circle
              cx={sizes.interactiveShapeSize * 0.8}
              cy={sizes.interactiveShapeSize * 0.7}
              r="16"
            />
          </ContentLoader>
        </div>
      </div>
    </div>
  );

  return (
    <section className="certifications-section-container">
      {/* Section Title */}
      <div
        className="certifications-section-title skeleton"
        style={{
          marginBottom: isMobile ? '24px' : '48px',
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <ContentLoader
          speed={speed}
          width={sizes.sectionTitleWidth}
          height={sizes.sectionTitleHeight}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
        >
          <rect
            x="0"
            y="0"
            rx={sizes.borderRadius}
            width={sizes.sectionTitleWidth}
            height={sizes.sectionTitleHeight}
          />
        </ContentLoader>
      </div>
      {/* Category Sections */}
      <div className="certifications-section-content">
        {Array.from({ length: categoryCount }).map((_, categoryIndex) =>
          renderCategorySection(categoryIndex)
        )}
      </div>
    </section>
  );
};

export default CertificationsSectionSkeleton;
