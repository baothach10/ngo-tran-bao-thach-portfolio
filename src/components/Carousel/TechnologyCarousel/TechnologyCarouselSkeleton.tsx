import React from 'react';
import ContentLoader from 'react-content-loader';

import { isMobileDevice } from '@/utils';

import './TechnologyCarousel.css';

interface ITechnologyCarouselSkeletonProps {
  speed?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  responsive?: boolean;
}

const TechnologyCarouselSkeleton: React.FC<ITechnologyCarouselSkeletonProps> = ({
  speed = 2,
  backgroundColor = '#888888',
  foregroundColor = 'white',
  responsive = true
}) => {
  // Responsive adjustments matching the original component exactly
  const isMobile = responsive ? isMobileDevice() : false;
  const iconSize = isMobile ? 40 : 60;

  // Exact same logic as TechnologyCarousel component
  const slidesPerView = isMobile
    ? typeof document !== 'undefined' && document.documentElement.clientWidth < 768
      ? 4
      : 6
    : 10;

  // Fallback in case of any issues
  const safeSlidesPerView = slidesPerView || (isMobile ? 4 : 10);

  // Size variables for better maintenance
  const sizes = {
    // Section title
    titleWidth: isMobile ? 200 : 300,
    titleHeight: isMobile ? 32 : 48,
    titleMarginBottom: isMobile ? 30 : 50,

    // Individual item dimensions
    itemWidth: isMobile ? 70 : 90,
    itemHeight: isMobile ? 100 : 120,
    itemGap: isMobile ? 10 : 15,

    // Container height
    containerHeight: isMobile ? 120 : 160,

    // Icon dimensions (matching TechnologyItem structure)
    iconSize: iconSize,
    iconBorderRadius: isMobile ? 8 : 12,

    // Text dimensions
    textHeight: isMobile ? 12 : 14,
    textWidth: isMobile ? 50 : 70,
    textBorderRadius: isMobile ? 4 : 6,
    textMarginTop: isMobile ? 8 : 12,

    // Shimmer effects
    shimmerOpacity: 0.4,
    iconOpacity: 0.7,
    textOpacity: 0.6,

    // Border radius
    borderRadius: isMobile ? 4 : 6,

    // Opacities
    titleOpacity: 1
  };

  // Calculate exact container dimensions based on slides per view
  const carouselWidth = (sizes.itemWidth + sizes.itemGap) * safeSlidesPerView - sizes.itemGap;
  const actualContainerWidth = Math.max(carouselWidth, sizes.titleWidth);

  // Calculate total height including title and carousel
  const totalHeight = sizes.titleHeight + sizes.titleMarginBottom + (sizes.containerHeight - 50);

  // Generate exactly the number of technology item skeletons matching slidesPerView
  const generateTechnologyItems = () => {
    const items: React.ReactElement[] = [];
    const carouselStartY = sizes.titleHeight + sizes.titleMarginBottom;
    const carouselCenterX = (actualContainerWidth - carouselWidth) / 2;

    for (let i = 0; i < safeSlidesPerView; i++) {
      const xPosition = carouselCenterX + i * (sizes.itemWidth + sizes.itemGap);

      // Icon placeholder
      items.push(
        <rect
          key={`tech-icon-${i}`}
          x={xPosition + (sizes.itemWidth - sizes.iconSize) / 2}
          y={carouselStartY + 10}
          width={sizes.iconSize}
          height={sizes.iconSize}
          rx={sizes.iconBorderRadius}
          fill={foregroundColor}
          opacity={sizes.iconOpacity}
        />
      );

      // Technology name text placeholder
      items.push(
        <rect
          key={`tech-text-${i}`}
          x={xPosition + (sizes.itemWidth - sizes.textWidth) / 2}
          y={carouselStartY + 10 + sizes.iconSize + sizes.textMarginTop}
          width={sizes.textWidth}
          height={sizes.textHeight}
          rx={sizes.textBorderRadius}
          fill={foregroundColor}
          opacity={sizes.textOpacity}
        />
      );
    }

    return items;
  };

  return (
    <div
      className="carousel-container"
      style={{
        width: '100%',
        height: 'fit-content',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 0'
      }}
    >
      <ContentLoader
        speed={speed}
        width={actualContainerWidth}
        height={totalHeight}
        viewBox={`0 0 ${actualContainerWidth} ${totalHeight}`}
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
          x={(actualContainerWidth - sizes.titleWidth) / 2}
          y="0"
          width={sizes.titleWidth}
          height={sizes.titleHeight}
          rx={sizes.borderRadius}
          fill={foregroundColor}
          opacity={sizes.titleOpacity}
        />

        {/* Technology carousel items */}
        {generateTechnologyItems()}
      </ContentLoader>
    </div>
  );
};

export default TechnologyCarouselSkeleton;
