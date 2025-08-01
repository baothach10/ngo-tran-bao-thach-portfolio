import React from 'react';
import ContentLoader from 'react-content-loader';

import './MainSkills.css';

import { isMobileDevice } from '@/utils';

interface IMainSkillsSkeletonProps {
  speed?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  responsive?: boolean;
}

const MainSkillsSkeleton: React.FC<IMainSkillsSkeletonProps> = ({
  speed = 2,
  backgroundColor = '#888888',
  foregroundColor = 'white',
  responsive = true
}) => {
  // Responsive adjustments
  const isMobile = responsive ? isMobileDevice() : false;
  const iconSize = isMobile ? 40 : 60;

  // Size variables for better maintenance
  const sizes = {
    // Container dimensions
    containerWidth: isMobile ? 350 : 950,
    containerHeight: isMobile ? 1550 : 930,

    // Section title
    titleWidth: isMobile ? 180 : 280,
    titleHeight: isMobile ? 32 : 48,
    titleMarginBottom: isMobile ? 40 : 60,

    // Grid layout
    gridGap: isMobile ? 20 : 50,
    gridColumns: isMobile ? 1 : 2,

    // Expertise block dimensions
    blockWidth: isMobile ? 350 : 450,
    blockHeight: isMobile ? 350 : 380,
    blockPadding: isMobile ? 20 : 25,
    blockBorderRadius: 12,

    // Icon dimensions
    iconSize: iconSize,
    iconBorderRadius: isMobile ? 8 : 12,
    iconMarginBottom: isMobile ? 16 : 20,

    // Title dimensions
    blockTitleHeight: isMobile ? 20 : 24,
    blockTitleWidth: isMobile ? 200 : 280,
    blockTitleMarginBottom: isMobile ? 12 : 16,

    // Description dimensions
    descriptionLineHeight: isMobile ? 12 : 14,
    descriptionLineSpacing: isMobile ? 16 : 18,
    descriptionLineCount: 3,
    descriptionLineWidths: isMobile ? [300, 280, 250] : [400, 380, 320],
    descriptionMarginBottom: isMobile ? 20 : 24,

    // Tools section
    toolsLabelHeight: isMobile ? 14 : 16,
    toolsLabelWidth: isMobile ? 60 : 80,
    toolsLabelMarginBottom: isMobile ? 8 : 12,

    // Tool tags
    toolTagHeight: isMobile ? 24 : 28,
    toolTagSpacing: isMobile ? 8 : 10,
    toolTagWidths: isMobile ? [60, 70, 55, 80, 45, 65, 50, 75] : [80, 90, 70, 100, 60, 85, 65, 95],

    // Border radius
    borderRadius: isMobile ? 4 : 6,

    // Opacities
    blockOpacity: 0.9,
    titleOpacity: 1,
    iconOpacity: 0.8,
    textOpacity: 0.7,
    toolOpacity: 0.6
  };

  // Generate expertise blocks
  const generateExpertiseBlocks = () => {
    const blocks: React.ReactElement[] = [];

    for (let i = 0; i < 4; i++) {
      // Calculate position based on grid layout
      const col = isMobile ? 0 : i % 2;
      const row = isMobile ? i : Math.floor(i / 2);

      const blockX = isMobile
        ? (sizes.containerWidth - sizes.blockWidth) / 2
        : col * (sizes.blockWidth + sizes.gridGap);

      const blockY =
        sizes.titleHeight + sizes.titleMarginBottom + row * (sizes.blockHeight + sizes.gridGap);

      // Block background
      blocks.push(
        <rect
          key={`block-bg-${i}`}
          x={blockX}
          y={blockY}
          width={sizes.blockWidth}
          height={sizes.blockHeight}
          rx={sizes.blockBorderRadius}
          fill={backgroundColor}
          stroke={foregroundColor}
          strokeWidth="1"
          opacity={sizes.blockOpacity}
        />
      );

      // Icon placeholder
      blocks.push(
        <rect
          key={`block-icon-${i}`}
          x={blockX + sizes.blockPadding}
          y={blockY + sizes.blockPadding}
          width={sizes.iconSize}
          height={sizes.iconSize}
          rx={sizes.iconBorderRadius}
          fill={foregroundColor}
          opacity={sizes.iconOpacity}
        />
      );

      // Block title
      blocks.push(
        <rect
          key={`block-title-${i}`}
          x={blockX + sizes.blockPadding}
          y={blockY + sizes.blockPadding + sizes.iconSize + sizes.iconMarginBottom}
          width={sizes.blockTitleWidth}
          height={sizes.blockTitleHeight}
          rx={sizes.borderRadius}
          fill={foregroundColor}
          opacity={sizes.titleOpacity}
        />
      );

      // Description lines
      const descriptionStartY =
        blockY +
        sizes.blockPadding +
        sizes.iconSize +
        sizes.iconMarginBottom +
        sizes.blockTitleHeight +
        sizes.blockTitleMarginBottom;

      for (let lineIndex = 0; lineIndex < sizes.descriptionLineCount; lineIndex++) {
        const lineWidth =
          sizes.descriptionLineWidths[lineIndex] ??
          sizes.descriptionLineWidths[sizes.descriptionLineWidths.length - 1] ??
          200;

        blocks.push(
          <rect
            key={`block-desc-${i}-${lineIndex}`}
            x={blockX + sizes.blockPadding}
            y={descriptionStartY + lineIndex * sizes.descriptionLineSpacing}
            width={Math.min(lineWidth, sizes.blockWidth - sizes.blockPadding * 2)}
            height={sizes.descriptionLineHeight}
            rx={sizes.borderRadius}
            fill={foregroundColor}
            opacity={sizes.textOpacity}
          />
        );
      }

      // Tools label
      const toolsStartY =
        descriptionStartY +
        sizes.descriptionLineCount * sizes.descriptionLineSpacing +
        sizes.descriptionMarginBottom;

      blocks.push(
        <rect
          key={`tools-label-${i}`}
          x={blockX + sizes.blockPadding}
          y={toolsStartY}
          width={sizes.toolsLabelWidth}
          height={sizes.toolsLabelHeight}
          rx={sizes.borderRadius}
          fill={foregroundColor}
          opacity={sizes.textOpacity}
        />
      );

      // Tool tags (arranged in rows)
      const toolsTagStartY = toolsStartY + sizes.toolsLabelHeight + sizes.toolsLabelMarginBottom;
      let currentX = blockX + sizes.blockPadding;
      let currentY = toolsTagStartY;
      const maxWidth = sizes.blockWidth - sizes.blockPadding * 2;

      for (let toolIndex = 0; toolIndex < 8; toolIndex++) {
        const toolWidth = sizes.toolTagWidths[toolIndex] ?? 60;

        // Check if we need to wrap to next line
        if (currentX + toolWidth > blockX + maxWidth) {
          currentX = blockX + sizes.blockPadding;
          currentY += sizes.toolTagHeight + sizes.toolTagSpacing;
        }

        blocks.push(
          <rect
            key={`tool-tag-${i}-${toolIndex}`}
            x={currentX}
            y={currentY}
            width={toolWidth}
            height={sizes.toolTagHeight}
            rx={sizes.toolTagHeight / 2}
            fill={foregroundColor}
            opacity={sizes.toolOpacity}
          />
        );

        currentX += toolWidth + sizes.toolTagSpacing;
      }
    }

    return blocks;
  };

  return (
    <section className="main-skills-section">
      <div className="main-skills-skeleton">
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
          <rect
            x={(sizes.containerWidth - sizes.titleWidth) / 2}
            y="0"
            width={sizes.titleWidth}
            height={sizes.titleHeight}
            rx={sizes.borderRadius}
            fill={foregroundColor}
            opacity={sizes.titleOpacity}
          />

          {generateExpertiseBlocks()}
        </ContentLoader>
      </div>
    </section>
  );
};

export default MainSkillsSkeleton;
