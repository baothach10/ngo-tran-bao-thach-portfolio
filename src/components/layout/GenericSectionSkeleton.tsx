import React from 'react';
import ContentLoader from 'react-content-loader';

import { isMobileDevice } from '@/utils';

interface IGenericSectionSkeletonProps {
  speed?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  height?: number | string;
  width?: number | string;
  includeTitle?: boolean;
  includeImage?: boolean;
  includeSubtitle?: boolean;
  textLines?: number;
  padding?: number;
  responsive?: boolean;
  autoHeight?: boolean; // NEW: automatically calculate height based on content
}

const GenericSectionSkeleton: React.FC<IGenericSectionSkeletonProps> = ({
  speed = 2,
  backgroundColor = '#888888',
  foregroundColor = 'white',
  height = '100%',
  width = '100%',
  includeTitle = true,
  includeImage = false,
  includeSubtitle = false,
  textLines = 3,
  padding = 20,
  responsive = true,
  autoHeight = false
}) => {
  // Responsive adjustments
  const isMobile = responsive ? isMobileDevice() : false;

  // Size variables for better maintenance
  const sizes = {
    // Base dimensions
    defaultWidth: isMobile ? 320 : 400,
    defaultHeight: isMobile ? 300 : 400,

    // Padding and spacing
    basePadding: isMobile ? padding * 0.7 : padding,
    lineHeight: isMobile ? 10 : 12,
    lineSpacing: isMobile ? 12 : 15,

    // Title dimensions
    titleHeight: isMobile ? 16 : 20,
    titleSpacing: isMobile ? 28 : 35,
    titleWidthRatio: isMobile ? 0.8 : 0.6,
    titleMaxWidth: isMobile ? 200 : 300,
    titleBorderRadius: isMobile ? 8 : 10,

    // Subtitle dimensions
    subtitleHeight: isMobile ? 12 : 14,
    subtitleSpacing: isMobile ? 20 : 25,
    subtitleWidthRatio: isMobile ? 0.6 : 0.4,
    subtitleMaxWidth: isMobile ? 150 : 200,
    subtitleBorderRadius: isMobile ? 6 : 7,

    // Image dimensions
    imageWidthRatio: isMobile ? 0.4 : 0.3,
    imageMaxWidth: isMobile ? 100 : 120,
    imageAspectRatio: 80 / 120, // height/width ratio
    imageSpacing: isMobile ? 15 : 20,
    imageBorderRadius: 8,

    // Text line dimensions
    textMinWidthRatio: isMobile ? 0.4 : 0.3,
    textMaxWidthRatio: isMobile ? 0.95 : 0.9,
    textBorderRadius: isMobile ? 4 : 6,
    textLastLineRatio: 0.5, // How much shorter the last line should be
    textOpacity: 0.7,

    // Element opacities
    subtitleOpacity: 0.8
  };

  const adjustedPadding = sizes.basePadding;
  const adjustedLineHeight = sizes.lineHeight;
  const adjustedSpacing = sizes.lineSpacing;

  // Convert width to number for calculations, default to sizes.defaultWidth if it's a percentage
  const numericWidth =
    typeof width === 'string' && width.includes('%')
      ? sizes.defaultWidth
      : Number(width) || sizes.defaultWidth;

  // Convert height to number for calculations, default to sizes.defaultHeight if it's a string
  const numericHeight =
    typeof height === 'string'
      ? height.includes('%') || height.includes('vh') || height.includes('auto')
        ? sizes.defaultHeight // Default fallback for relative units
        : parseInt(height) || sizes.defaultHeight
      : Number(height) || sizes.defaultHeight;

  const contentWidth = numericWidth - adjustedPadding * 2; // Account for padding on both sides

  // Calculate minimum required height based on content using size variables
  const titleHeight = includeTitle ? sizes.titleHeight + sizes.titleSpacing : 0;
  const subtitleHeight = includeSubtitle ? sizes.subtitleHeight + sizes.subtitleSpacing : 0;
  const imageHeight = includeImage
    ? Math.min(contentWidth * sizes.imageWidthRatio, sizes.imageMaxWidth) * sizes.imageAspectRatio +
      sizes.imageSpacing
    : 0;
  const textHeight = textLines * (adjustedLineHeight + adjustedSpacing);
  const minRequiredHeight =
    adjustedPadding * 2 + titleHeight + subtitleHeight + imageHeight + textHeight;

  // Use the larger of provided height or minimum required height
  const effectiveHeight = autoHeight
    ? minRequiredHeight // Use calculated height when autoHeight is true
    : Math.max(numericHeight, minRequiredHeight); // Ensure minimum height when autoHeight is false

  let currentY = adjustedPadding;
  const spacing = adjustedSpacing;
  const lineHeight = adjustedLineHeight;

  const elements: React.ReactElement[] = [];

  // Title
  if (includeTitle) {
    const titleWidth = Math.min(contentWidth * sizes.titleWidthRatio, sizes.titleMaxWidth);
    elements.push(
      <rect
        key="title"
        x={adjustedPadding}
        y={currentY}
        width={titleWidth}
        height={sizes.titleHeight}
        rx={sizes.titleBorderRadius}
        fill={foregroundColor}
      />
    );
    currentY += sizes.titleSpacing;
  }

  // Subtitle
  if (includeSubtitle) {
    const subtitleWidth = Math.min(contentWidth * sizes.subtitleWidthRatio, sizes.subtitleMaxWidth);
    elements.push(
      <rect
        key="subtitle"
        x={adjustedPadding}
        y={currentY}
        width={subtitleWidth}
        height={sizes.subtitleHeight}
        rx={sizes.subtitleBorderRadius}
        fill={foregroundColor}
        opacity={sizes.subtitleOpacity}
      />
    );
    currentY += sizes.subtitleSpacing;
  }

  // Image placeholder
  if (includeImage) {
    const imageWidth = Math.min(contentWidth * sizes.imageWidthRatio, sizes.imageMaxWidth);
    const imageHeight = imageWidth * sizes.imageAspectRatio;
    elements.push(
      <rect
        key="image"
        x={adjustedPadding}
        y={currentY}
        width={imageWidth}
        height={imageHeight}
        rx={sizes.imageBorderRadius}
        fill={foregroundColor}
      />
    );
    currentY += imageHeight + sizes.imageSpacing;
  }

  // Text lines
  for (let i = 0; i < textLines; i++) {
    const isLastLine = i === textLines - 1;
    const minWidth = contentWidth * sizes.textMinWidthRatio;
    const maxWidth = contentWidth * sizes.textMaxWidthRatio;
    const lineWidth = isLastLine
      ? minWidth + Math.random() * (maxWidth - minWidth) * sizes.textLastLineRatio // Last line is shorter
      : minWidth + Math.random() * (maxWidth - minWidth);

    elements.push(
      <rect
        key={`text-${i}`}
        x={adjustedPadding}
        y={currentY}
        width={lineWidth}
        height={lineHeight}
        rx={sizes.textBorderRadius}
        fill={foregroundColor}
        opacity={sizes.textOpacity}
      />
    );
    currentY += lineHeight + spacing;
  }

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <ContentLoader
        speed={speed}
        width={width}
        height={autoHeight ? effectiveHeight : height} // Use calculated height or original
        viewBox={`0 0 ${numericWidth} ${effectiveHeight}`}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '100%'
        }}
      >
        {elements}
      </ContentLoader>
    </div>
  );
};

export default GenericSectionSkeleton;
