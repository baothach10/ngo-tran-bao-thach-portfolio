import React, { lazy, Suspense } from 'react';

import ThreeSceneSkeleton from '@/components/LoadingComponent/ThreeSceneSkeleton/ThreeSceneSkeleton';
import { useLazyLoading } from '@/hooks/useLazyLoading';

// Lazy load the ThreeScene component
const ThreeScene = lazy(() => import('@/components/scenes/ThreeScene/ThreeScene'));

interface ILazyThreeSceneProps {
  loadingDelay?: number;
  minLoadingTime?: number;
}

const LazyThreeScene: React.FC<ILazyThreeSceneProps> = ({
  loadingDelay = 500,
  minLoadingTime = 1200
}) => {
  const { isLoading, showContent: isContentReady } = useLazyLoading({
    delay: loadingDelay,
    minLoadingTime
  });

  if (isLoading || !isContentReady) {
    return <ThreeSceneSkeleton />;
  }

  return (
    <Suspense fallback={<ThreeSceneSkeleton />}>
      <ThreeScene />
    </Suspense>
  );
};

export default LazyThreeScene;
