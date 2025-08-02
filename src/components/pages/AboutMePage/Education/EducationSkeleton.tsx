import React from 'react';
import ContentLoader from 'react-content-loader';

import { isMobileDevice } from '@/utils';

import './Education.css';

interface IEducationSkeletonProps {
  speed?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  responsive?: boolean;
  itemCount?: number;
}

const EducationSkeleton: React.FC<IEducationSkeletonProps> = ({
  speed = 2,
  backgroundColor = '#888888',
  foregroundColor = 'white',
  responsive = true,
  itemCount = 6
}) => {
  // Responsive adjustments
  const isMobile = responsive ? isMobileDevice() : false;

  // Size variables for better maintenance
  const sizes = {
    // Container dimensions
    containerWidth: isMobile ? 750 : 1000,

    // Section title
    titleWidth: isMobile ? 200 : 300,
    titleHeight: isMobile ? 32 : 48,
    titleMarginBottom: isMobile ? 30 : 50,

    // Timeline items
    cardWidth: isMobile ? 300 : 400,
    cardHeight: isMobile ? 200 : 250,
    cardSpacing: isMobile ? 40 : 60,

    // Timeline center line
    timelineWidth: 4,
    timelineColor: foregroundColor,

    // Timeline dots
    dotSize: isMobile ? 12 : 16,
    dotBorderWidth: 3,

    // Card content
    cardPadding: isMobile ? 12 : 16,
    cardBorderRadius: 8,

    // Card title
    cardTitleHeight: isMobile ? 16 : 20,
    cardTitleWidth: isMobile ? 200 : 280,
    cardTitleMarginBottom: isMobile ? 8 : 12,

    // Card subtitle
    cardSubtitleHeight: isMobile ? 12 : 16,
    cardSubtitleWidth: isMobile ? 250 : 350,
    cardSubtitleMarginBottom: isMobile ? 12 : 16,

    // Card image
    cardImageWidth: isMobile ? 80 : 100,
    cardImageHeight: isMobile ? 60 : 80,
    cardImageBorderRadius: 6,

    // Card text lines
    textLineHeight: isMobile ? 10 : 12,
    textLineSpacing: isMobile ? 14 : 16,
    textLineCount: 3,
    textLineWidths: isMobile ? [250, 230, 180] : [350, 320, 250],

    // Date/timeline title
    timelineTitleWidth: isMobile ? 80 : 100,
    timelineTitleHeight: isMobile ? 12 : 16,

    // Border radius
    borderRadius: isMobile ? 4 : 6,

    // Opacities
    cardOpacity: 0.8,
    titleOpacity: 1,
    textOpacity: 0.7,
    timelineOpacity: 0.9
  };

  // Calculate total height based on items
  const totalHeight =
    sizes.titleHeight +
    sizes.titleMarginBottom +
    itemCount * (sizes.cardHeight + sizes.cardSpacing);

  // Generate timeline items
  const generateTimelineItems = () => {
    const items: React.ReactElement[] = [];
    const centerX = sizes.containerWidth / 2;
    let currentY = sizes.titleHeight + sizes.titleMarginBottom;

    for (let i = 0; i < itemCount; i++) {
      const isLeft = i % 2 === 0; // Alternating sides for VERTICAL_ALTERNATING mode
      const cardX = isLeft
        ? centerX - sizes.cardWidth - 30 // Left side
        : centerX + 30; // Right side

      const dotY = currentY + sizes.cardHeight / 2 - sizes.dotSize / 2;

      // Timeline date/title (positioned on opposite side of card)
      const timelineTitleX = isLeft
        ? centerX + 15 // Right side when card is on left
        : centerX - sizes.timelineTitleWidth - 15; // Left side when card is on right
      const timelineTitleY = currentY + sizes.cardHeight / 2 - sizes.timelineTitleHeight / 2;

      // Timeline dot
      items.push(
        <circle
          key={`timeline-dot-${i}`}
          cx={centerX}
          cy={dotY + sizes.dotSize / 2}
          r={sizes.dotSize / 2}
          fill={sizes.timelineColor}
          opacity={sizes.timelineOpacity}
        />
      );

      // Timeline date/title
      items.push(
        <rect
          key={`timeline-title-${i}`}
          x={timelineTitleX}
          y={timelineTitleY}
          width={sizes.timelineTitleWidth}
          height={sizes.timelineTitleHeight}
          rx={sizes.borderRadius}
          fill={foregroundColor}
          opacity={sizes.textOpacity}
        />
      );

      // Card container
      items.push(
        <rect
          key={`card-bg-${i}`}
          x={cardX}
          y={currentY}
          width={sizes.cardWidth}
          height={sizes.cardHeight}
          rx={sizes.cardBorderRadius}
          fill={backgroundColor}
          stroke={foregroundColor}
          strokeWidth="1"
          opacity={sizes.cardOpacity}
        />
      );

      // Card image
      items.push(
        <rect
          key={`card-image-${i}`}
          x={cardX + sizes.cardPadding}
          y={currentY + sizes.cardPadding}
          width={sizes.cardImageWidth}
          height={sizes.cardImageHeight}
          rx={sizes.cardImageBorderRadius}
          fill={foregroundColor}
          opacity={0.6}
        />
      );

      // Card title
      items.push(
        <rect
          key={`card-title-${i}`}
          x={cardX + sizes.cardPadding + sizes.cardImageWidth + 12}
          y={currentY + sizes.cardPadding}
          width={sizes.cardTitleWidth - sizes.cardImageWidth - 12}
          height={sizes.cardTitleHeight}
          rx={sizes.borderRadius}
          fill={foregroundColor}
          opacity={sizes.titleOpacity}
        />
      );

      // Card subtitle
      items.push(
        <rect
          key={`card-subtitle-${i}`}
          x={cardX + sizes.cardPadding}
          y={currentY + sizes.cardPadding + sizes.cardImageHeight + 12}
          width={sizes.cardSubtitleWidth}
          height={sizes.cardSubtitleHeight}
          rx={sizes.borderRadius}
          fill={foregroundColor}
          opacity={sizes.textOpacity}
        />
      );

      // Card text lines
      const textStartY =
        currentY +
        sizes.cardPadding +
        sizes.cardImageHeight +
        12 +
        sizes.cardSubtitleHeight +
        sizes.cardSubtitleMarginBottom;
      for (let lineIndex = 0; lineIndex < sizes.textLineCount; lineIndex++) {
        const lineWidth =
          sizes.textLineWidths[lineIndex] ?? sizes.textLineWidths[sizes.textLineWidths.length - 1];
        items.push(
          <rect
            key={`card-text-${i}-${lineIndex}`}
            x={cardX + sizes.cardPadding}
            y={textStartY + lineIndex * sizes.textLineSpacing}
            width={Math.min(lineWidth as number, sizes.cardWidth - sizes.cardPadding * 2)}
            height={sizes.textLineHeight}
            rx={sizes.borderRadius}
            fill={foregroundColor}
            opacity={sizes.textOpacity}
          />
        );
      }

      currentY += sizes.cardHeight + sizes.cardSpacing;
    }

    return items;
  };

  return (
    <div className="education-section-container">
      <div className="education-section-content">
        <ContentLoader
          speed={speed}
          width={sizes.containerWidth}
          height={totalHeight}
          viewBox={`0 0 ${sizes.containerWidth} ${totalHeight}`}
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
            y="0"
            width={sizes.titleWidth}
            height={sizes.titleHeight}
            rx={sizes.borderRadius}
            fill={foregroundColor}
            opacity={sizes.titleOpacity}
          />

          {/* Timeline center line */}
          <rect
            x={sizes.containerWidth / 2 - sizes.timelineWidth / 2}
            y={sizes.titleHeight + sizes.titleMarginBottom}
            width={sizes.timelineWidth}
            height={totalHeight - sizes.titleHeight - sizes.titleMarginBottom}
            fill={sizes.timelineColor}
            opacity={0.3}
          />

          {/* Timeline items */}
          {generateTimelineItems()}
        </ContentLoader>
      </div>
    </div>
  );
};

export default EducationSkeleton;
