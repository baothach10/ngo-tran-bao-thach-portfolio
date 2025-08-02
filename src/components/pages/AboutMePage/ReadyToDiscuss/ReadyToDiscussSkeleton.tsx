import React from 'react';
import ContentLoader from 'react-content-loader';

import { isMobileDevice } from '@/utils';

interface IReadyToDiscussSkeletonProps {
  speed?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  responsive?: boolean;
}

const ReadyToDiscussSkeleton: React.FC<IReadyToDiscussSkeletonProps> = ({
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
    containerWidth: isMobile ? 350 : 800,
    containerHeight: isMobile ? 100 : 120,

    // Section title
    titleWidth: isMobile ? 200 : 500,
    titleHeight: isMobile ? 16 : 24,
    titleMarginBottom: isMobile ? 10 : 15,

    // Content paragraph
    contentWidth: isMobile ? 190 : 80, // 80% of container
    paragraphLineHeight: isMobile ? 7 : 10,
    paragraphLineSpacing: isMobile ? 9 : 10,
    paragraphLineWidths: isMobile
      ? [270, 240] // 2 lines on mobile
      : [460], // 1 line on desktop (shorter text)
    paragraphMarginBottom: isMobile ? 12 : 15,

    // Contact button
    buttonWidth: isMobile ? 100 : 90,
    buttonHeight: isMobile ? 30 : 40,
    buttonBorderRadius: isMobile ? 15 : 25,

    // Border radius
    borderRadius: isMobile ? 4 : 6,

    // Opacities
    titleOpacity: 1,
    textOpacity: 0.8,
    buttonOpacity: 0.9
  };

  // Calculate content positions
  const titleY = 0;
  const contentStartY = titleY + sizes.titleHeight + sizes.titleMarginBottom;
  const buttonY =
    contentStartY +
    sizes.paragraphLineWidths.length * sizes.paragraphLineSpacing +
    sizes.paragraphMarginBottom;

  // Generate paragraph lines
  const generateParagraphLines = () => {
    const lines: React.ReactElement[] = [];

    sizes.paragraphLineWidths.forEach((lineWidth, index) => {
      lines.push(
        <rect
          key={`paragraph-line-${index}`}
          x={(sizes.containerWidth - lineWidth) / 2}
          y={contentStartY + index * sizes.paragraphLineSpacing}
          width={lineWidth}
          height={sizes.paragraphLineHeight}
          rx={sizes.borderRadius}
          fill={foregroundColor}
          opacity={sizes.textOpacity}
        />
      );
    });

    return lines;
  };

  return (
    <section
      className="ready-to-discuss-container"
      style={{
        padding: '2rem 0',
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ContentLoader
        speed={speed}
        width={sizes.containerWidth}
        height={sizes.containerHeight}
        viewBox={`0 0 ${sizes.containerWidth} ${sizes.containerHeight}`}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '100%'
        }}
      >
        {/* Section title */}
        <rect
          x={(sizes.containerWidth - sizes.titleWidth) / 2}
          y={titleY}
          width={sizes.titleWidth}
          height={sizes.titleHeight}
          rx={sizes.borderRadius}
          fill={foregroundColor}
          opacity={sizes.titleOpacity}
        />

        {/* Content paragraph lines */}
        {generateParagraphLines()}

        {/* Contact button */}
        <rect
          x={(sizes.containerWidth - sizes.buttonWidth) / 2}
          y={buttonY}
          width={sizes.buttonWidth}
          height={sizes.buttonHeight}
          rx={sizes.buttonBorderRadius}
          fill={foregroundColor}
          opacity={sizes.buttonOpacity}
        />

        {/* Button text placeholder */}
        <rect
          x={(sizes.containerWidth - sizes.buttonWidth * 0.6) / 2}
          y={buttonY + (sizes.buttonHeight - sizes.paragraphLineHeight) / 2}
          width={sizes.buttonWidth * 0.6}
          height={sizes.paragraphLineHeight}
          rx={sizes.borderRadius}
          fill={backgroundColor}
          opacity={0.8}
        />
      </ContentLoader>
    </section>
  );
};

export default ReadyToDiscussSkeleton;
