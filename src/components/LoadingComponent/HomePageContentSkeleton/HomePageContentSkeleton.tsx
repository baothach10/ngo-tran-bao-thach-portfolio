import Skeleton from '@/components/LoadingComponent/Skeleton/Skeleton';
import './HomePageContentSkeleton.css';

const HomePageContentSkeleton = () => {
  return (
    <section className="home-page-content-skeleton">
      {/* Title skeleton */}
      <div className="skeleton-title">
        <Skeleton width="60%" height="2.5rem" />
      </div>

      {/* Name introduction skeleton */}
      <div className="skeleton-name">
        <Skeleton width="80%" height="3rem" />
      </div>

      {/* Description skeleton */}
      <div className="skeleton-description">
        <Skeleton width="90%" height="1.5rem" />
      </div>

      {/* Divider skeleton */}
      <div className="skeleton-divider">
        <Skeleton width="50%" height="1px" />
      </div>

      {/* Contact button skeleton */}
      <div className="skeleton-button">
        <Skeleton width="200px" height="50px" borderRadius="25px" />
      </div>
    </section>
  );
};

export default HomePageContentSkeleton;
