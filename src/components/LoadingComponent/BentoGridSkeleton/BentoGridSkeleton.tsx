import Skeleton from '@/components/LoadingComponent/Skeleton/Skeleton';
import './BentoGridSkeleton.css';

const BentoGridSkeleton = () => {
  return (
    <div className="bento-grid-skeleton">
      <div className="skeleton-card-grid">
        {/* Card 1 - Large card */}
        <div className="skeleton-card skeleton-card--large">
          <div className="skeleton-card-header">
            <Skeleton width="30%" height="16px" />
          </div>
          <div className="skeleton-card-content">
            <Skeleton width="50%" height="20px" />
            <Skeleton width="80%" height="14px" />
          </div>
          <div className="skeleton-card-center">
          </div>
        </div>

        {/* Card 2 - Small card */}
        <div className="skeleton-card skeleton-card--small">
          <div className="skeleton-card-header">
            <Skeleton width="40%" height="16px" />
          </div>
          <div className="skeleton-card-content">
            <Skeleton width="60%" height="18px" />
            <Skeleton width="90%" height="12px" />
          </div>
        </div>

        {/* Card 3 - Small card */}
        <div className="skeleton-card skeleton-card--small">
          <div className="skeleton-card-header">
            <Skeleton width="35%" height="16px" />
          </div>
          <div className="skeleton-card-content">
            <Skeleton width="70%" height="18px" />
            <Skeleton width="85%" height="12px" />
          </div>
          <div className="skeleton-card-center">
          </div>
        </div>

        {/* Card 4 - Wide card */}
        <div className="skeleton-card skeleton-card--wide">
          <div className="skeleton-card-header">
            <Skeleton width="25%" height="16px" />
          </div>
          <div className="skeleton-card-content">
            <Skeleton width="45%" height="18px" />
            <Skeleton width="70%" height="12px" />
          </div>
          <div className="skeleton-card-carousel">
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGridSkeleton;
