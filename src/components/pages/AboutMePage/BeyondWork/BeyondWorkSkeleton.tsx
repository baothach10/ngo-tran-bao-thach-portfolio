import React from 'react';
import ContentLoader from 'react-content-loader';

import { isMobileDevice } from '@/utils';

interface IBeyondWorkSkeletonProps {
  speed?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  responsive?: boolean;
}

const BeyondWorkSkeleton: React.FC<IBeyondWorkSkeletonProps> = ({
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
    containerWidth: isMobile ? 350 : 1000,
    containerHeight: isMobile ? 1200 : 1550,

    // Section title
    titleWidth: isMobile ? 180 : 280,
    titleHeight: isMobile ? 32 : 48,
    titleMarginBottom: isMobile ? 20 : 30,

    // Paragraph section
    paragraphWidth: isMobile ? 280 : 600, // 80% on mobile, 60% on desktop
    paragraphGap: isMobile ? 12 : 16,

    // Individual paragraph
    paragraphLineHeight: isMobile ? 14 : 8,
    paragraphLineSpacing: isMobile ? 18 : 10,
    paragraphLineWidths: {
      // First paragraph (2 lines)
      p1: isMobile ? [270, 250] : [580, 520],
      // Second paragraph (2 lines)
      p2: isMobile ? [280, 240] : [590, 500],
      // Third paragraph (3 lines)
      p3: isMobile ? [260, 275, 230] : [570, 600, 480]
    },

    // Masonry gallery
    masonryContainerWidth: isMobile ? 320 : 800, // 80% width
    masonryTopPadding: isMobile ? 16 : 40,
    masonryItemGap: isMobile ? 8 : 12,

    // Masonry item dimensions (varied heights for masonry effect)
    masonryItemWidths: isMobile ? [100, 95, 105, 90, 110] : [180, 170, 190, 160, 200],
    masonryItemHeights: isMobile
      ? [120, 80, 140, 100, 90, 110, 130, 85, 125, 95, 105, 115]
      : [220, 150, 260, 180, 160, 200, 240, 155, 230, 175, 190, 210],

    // Layout
    masonryColumns: isMobile ? 3 : 4,

    // Border radius
    borderRadius: isMobile ? 4 : 6,
    masonryBorderRadius: isMobile ? 8 : 12,

    // Opacities
    titleOpacity: 1,
    textOpacity: 0.8,
    masonryOpacity: 0.7
  };

  // Generate paragraph skeletons
  const generateParagraphs = () => {
    const paragraphs: React.ReactElement[] = [];
    const paragraphData = [
      sizes.paragraphLineWidths.p1,
      sizes.paragraphLineWidths.p2,
      sizes.paragraphLineWidths.p3
    ];

    let currentY = sizes.titleHeight + sizes.titleMarginBottom;

    paragraphData.forEach((lineWidths, paragraphIndex) => {
      lineWidths.forEach((lineWidth, lineIndex) => {
        paragraphs.push(
          <rect
            key={`paragraph-${paragraphIndex}-line-${lineIndex}`}
            x={(sizes.containerWidth - (isMobile ? lineWidth : sizes.paragraphWidth)) / 2}
            y={currentY}
            width={lineWidth}
            height={sizes.paragraphLineHeight}
            rx={sizes.borderRadius}
            fill={foregroundColor}
            opacity={sizes.textOpacity}
          />
        );
        currentY += sizes.paragraphLineSpacing;
      });

      // Add gap between paragraphs
      currentY += sizes.paragraphGap;
    });

    return paragraphs;
  };

  // Generate masonry gallery skeleton
  const generateMasonryGallery = () => {
    const masonryItems: React.ReactElement[] = [];
    const itemCount = 23; // Based on the items array length

    // Calculate masonry start position
    const masonryStartY =
      sizes.titleHeight +
      sizes.titleMarginBottom +
      sizes.paragraphLineWidths.p1.length * sizes.paragraphLineSpacing +
      sizes.paragraphGap +
      sizes.paragraphLineWidths.p2.length * sizes.paragraphLineSpacing +
      sizes.paragraphGap +
      sizes.paragraphLineWidths.p3.length * sizes.paragraphLineSpacing +
      sizes.paragraphGap +
      sizes.masonryTopPadding;

    const masonryStartX = (sizes.containerWidth - sizes.masonryContainerWidth) / 2;

    // Create columns for masonry layout
    const columnWidth = sizes.masonryContainerWidth / sizes.masonryColumns;
    const columnHeights = new Array(sizes.masonryColumns).fill(0);

    for (let i = 0; i < itemCount; i++) {
      // Find the shortest column
      const minHeight = Math.min(...(columnHeights as number[]));
      const shortestColumnIndex = columnHeights.indexOf(minHeight);

      // Get item dimensions with some variation
      const itemWidth =
        sizes.masonryItemWidths[i % sizes.masonryItemWidths.length] ??
        sizes.masonryItemWidths[0] ??
        100;
      const itemHeight =
        sizes.masonryItemHeights[i % sizes.masonryItemHeights.length] ??
        sizes.masonryItemHeights[0] ??
        120;

      // Calculate position
      const itemX =
        masonryStartX + shortestColumnIndex * columnWidth + (columnWidth - itemWidth) / 2;
      const itemY = masonryStartY + columnHeights[shortestColumnIndex];

      // Add masonry item
      masonryItems.push(
        <rect
          key={`masonry-item-${i}`}
          x={itemX}
          y={itemY}
          width={itemWidth}
          height={itemHeight}
          rx={sizes.masonryBorderRadius}
          fill={foregroundColor}
          opacity={sizes.masonryOpacity}
        />
      );

      // Update column height
      columnHeights[shortestColumnIndex] += itemHeight + sizes.masonryItemGap;
    }

    return masonryItems;
  };

  return (
    <section
      className="beyond-work-container"
      style={{
        padding: '2rem 0rem',
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
          y="0"
          width={sizes.titleWidth}
          height={sizes.titleHeight}
          rx={sizes.borderRadius}
          fill={foregroundColor}
          opacity={sizes.titleOpacity}
        />

        {/* Paragraph content */}
        {generateParagraphs()}

        {/* Masonry gallery */}
        {generateMasonryGallery()}
      </ContentLoader>
    </section>
  );
};

export default BeyondWorkSkeleton;
