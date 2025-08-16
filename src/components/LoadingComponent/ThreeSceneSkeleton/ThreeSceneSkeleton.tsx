import Skeleton from '@/components/LoadingComponent/Skeleton/Skeleton';
import './ThreeSceneSkeleton.css';

const ThreeSceneSkeleton = () => {
  return (
    <div className="three-scene-skeleton">
      <div className="three-scene-skeleton-container">
        {/* Background */}
        <div className="skeleton-background">
          <Skeleton width="100%" height="100%" borderRadius="0px" animation="wave" />
        </div>

        {/* Center character placeholder */}
        <div className="skeleton-character">
          <Skeleton variant="circular" width="120px" height="120px" animation="pulse" />
          <div className="skeleton-character-body">
            <Skeleton width="80px" height="200px" borderRadius="40px" animation="pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeSceneSkeleton;
