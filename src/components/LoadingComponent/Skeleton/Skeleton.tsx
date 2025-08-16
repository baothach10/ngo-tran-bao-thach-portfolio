import './Skeleton.css';

interface ISkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<ISkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = '4px',
  className = '',
  variant = 'rectangular',
  animation = 'pulse'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return {
          height: '1em',
          borderRadius: '4px'
        };
      case 'circular':
        return {
          borderRadius: '50%'
        };
      case 'rectangular':
      default:
        return {};
    }
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    ...getVariantStyles()
  };

  return (
    <div
      className={`skeleton skeleton--${animation} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
