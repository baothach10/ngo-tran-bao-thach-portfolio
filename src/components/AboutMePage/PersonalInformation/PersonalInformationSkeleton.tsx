import React from 'react';
import ContentLoader from 'react-content-loader';

import './PersonalInformation.css';

import { isMobileDevice } from '@/utils';

interface IPersonalInformationSkeletonProps {
  speed?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  responsive?: boolean;
}

const PersonalInformationSkeleton: React.FC<IPersonalInformationSkeletonProps> = ({
  speed = 2,
  backgroundColor = '#888888',
  foregroundColor = 'white',
  responsive = true
}) => {
  // Responsive adjustments
  const isMobile = responsive ? isMobileDevice() : false;

  // Size variables for better maintenance
  const sizes = {
    // Container dimensions
    containerWidth: isMobile ? (document.documentElement.clientWidth <= 768 ? 350 : 650) : 1000,
    containerHeight: isMobile ? (document.documentElement.clientWidth <= 768 ? 550 : 350) : 370,

    // Image section (left side)
    imageWidth: isMobile ? (document.documentElement.clientWidth <= 768 ? 200 : 220) : 300,
    imageHeight: isMobile ? (document.documentElement.clientWidth <= 768 ? 200 : 220) : 300,
    imageBorderRadius: 16,

    // Text section dimensions
    textWidth: isMobile ? 350 : 500,

    // Title dimensions
    titleLineHeight: isMobile ? 24 : 32,
    titleSpacing: isMobile ? 28 : 36,
    titleLine1Width: isMobile ? 280 : 380,
    titleLine2Width: isMobile ? 320 : 450,

    // Paragraph dimensions
    paragraphLineHeight: isMobile ? 16 : 18,
    paragraphSpacing: isMobile ? 20 : 24,
    paragraphGap: isMobile ? 24 : 28,

    // Text line widths (varied for natural look)
    textLineWidths: isMobile
      ? [300, 280, 320, 250, 310, 270, 290, 240]
      : [480, 450, 470, 420, 460, 440, 480, 380],

    // Border radius for text elements
    textBorderRadius: isMobile ? 4 : 6,
    titleBorderRadius: isMobile ? 6 : 8,

    // Grid gap
    gridGap: isMobile ? 0 : 60,

    // Padding
    sectionPadding: isMobile ? 16 : 20
  };

  // Mobile layout (stacked)
  if (isMobile && document.documentElement.clientWidth <= 768) {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          padding: '2rem 0',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px'
        }}
        className="personal-information-skeleton"
      >
        <ContentLoader
          speed={speed}
          width={sizes.containerWidth}
          height={sizes.containerHeight}
          viewBox={`0 0 ${sizes.containerWidth} ${sizes.containerHeight}`}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
        >
          {/* Image placeholder - centered at top */}
          <rect
            x={(sizes.containerWidth - sizes.imageWidth) / 2}
            y="0"
            width={sizes.imageWidth}
            height={sizes.imageHeight}
            rx={sizes.imageBorderRadius}
            fill={backgroundColor}
          />

          {/* Image shimmer effects */}
          <rect
            x={(sizes.containerWidth - sizes.imageWidth) / 2 + 60}
            y="80"
            width="80"
            height="20"
            rx="10"
            fill={foregroundColor}
            opacity="0.4"
          />
          <rect
            x={(sizes.containerWidth - sizes.imageWidth) / 2 + 120}
            y="140"
            width="60"
            height="15"
            rx="8"
            fill={foregroundColor}
            opacity="0.3"
          />

          {/* Text content starts below image */}
          {/* Title - 2 lines */}
          <rect
            x={(sizes.containerWidth - sizes.titleLine1Width) / 2}
            y={sizes.imageHeight + 40}
            width={sizes.titleLine1Width}
            height={sizes.titleLineHeight}
            rx={sizes.titleBorderRadius}
            fill={foregroundColor}
          />
          <rect
            x={(sizes.containerWidth - sizes.titleLine2Width) / 2}
            y={sizes.imageHeight + 40 + sizes.titleSpacing}
            width={sizes.titleLine2Width}
            height={sizes.titleLineHeight}
            rx={sizes.titleBorderRadius}
            fill={foregroundColor}
            opacity="0.8"
          />

          {/* First paragraph - 4 lines */}
          {sizes.textLineWidths.slice(0, 4).map((width, index) => (
            <rect
              key={`p1-line-${index}`}
              x={(sizes.containerWidth - width) / 2}
              y={
                sizes.imageHeight +
                40 +
                sizes.titleSpacing * 2 +
                30 +
                index * sizes.paragraphSpacing
              }
              width={width}
              height={sizes.paragraphLineHeight}
              rx={sizes.textBorderRadius}
              fill={foregroundColor}
              opacity="0.7"
            />
          ))}

          {/* Second paragraph - 4 lines */}
          {sizes.textLineWidths.slice(4, 8).map((width, index) => (
            <rect
              key={`p2-line-${index}`}
              x={(sizes.containerWidth - width) / 2}
              y={
                sizes.imageHeight +
                40 +
                sizes.titleSpacing * 2 +
                30 +
                4 * sizes.paragraphSpacing +
                sizes.paragraphGap +
                index * sizes.paragraphSpacing
              }
              width={width}
              height={sizes.paragraphLineHeight}
              rx={sizes.textBorderRadius}
              fill={foregroundColor}
              opacity="0.7"
            />
          ))}
        </ContentLoader>
      </div>
    );
  }

  // Desktop layout (side by side)
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '2rem 0',
        justifyContent: 'center'
      }}
      className="personal-information-skeleton"
    >
      <div
        style={{
          width: '80%',
        }}

        className="personal-information-skeleton-wrapper"
      >

        <ContentLoader
          speed={speed}
          width={sizes.containerWidth}
          height={sizes.containerHeight}
          viewBox={`0 0 ${sizes.containerWidth} ${sizes.containerHeight}`}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          style={{ width: '100%', height: 'auto', maxWidth: '100vw' }}
        >
          {/* Left side - Image placeholder */}
          <rect
            x="50"
            y="50"
            width={sizes.imageWidth}
            height={sizes.imageHeight}
            rx={sizes.imageBorderRadius}
            fill={backgroundColor}
          />

          {/* Right side - Text content */}
          {/* Title - 2 lines */}
          <rect
            x={sizes.imageWidth + sizes.gridGap + 100}
            y="50"
            width={sizes.titleLine1Width}
            height={sizes.titleLineHeight}
            rx={sizes.titleBorderRadius}
            fill={foregroundColor}
          />
          <rect
            x={sizes.imageWidth + sizes.gridGap + 100}
            y={50 + sizes.titleSpacing}
            width={sizes.titleLine2Width}
            height={sizes.titleLineHeight}
            rx={sizes.titleBorderRadius}
            fill={foregroundColor}
            opacity="0.8"
          />

          {/* First paragraph - 4 lines */}
          {sizes.textLineWidths.slice(0, 4).map((width, index) => (
            <rect
              key={`p1-line-${index}`}
              x={sizes.imageWidth + sizes.gridGap + 100}
              y={50 + sizes.titleSpacing * 2 + 30 + index * sizes.paragraphSpacing}
              width={width}
              height={sizes.paragraphLineHeight}
              rx={sizes.textBorderRadius}
              fill={foregroundColor}
              opacity="0.7"
            />
          ))}

          {/* Second paragraph - 4 lines */}
          {sizes.textLineWidths.slice(4, 8).map((width, index) => (
            <rect
              key={`p2-line-${index}`}
              x={sizes.imageWidth + sizes.gridGap + 100}
              y={
                50 +
                sizes.titleSpacing * 2 +
                30 +
                4 * sizes.paragraphSpacing +
                sizes.paragraphGap +
                index * sizes.paragraphSpacing
              }
              width={width}
              height={sizes.paragraphLineHeight}
              rx={sizes.textBorderRadius}
              fill={foregroundColor}
              opacity="0.7"
            />
          ))}
        </ContentLoader>
      </div>
    </div>
  );
};

export default PersonalInformationSkeleton;
