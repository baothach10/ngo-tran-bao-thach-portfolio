import { useState, useEffect } from 'react';

interface IUseLazyLoadingProps {
  delay?: number;
  minLoadingTime?: number;
}

interface IUseLazyLoadingResult {
  isLoading: boolean;
  showContent: boolean;
}

export const useLazyLoading = ({
  delay = 0,
  minLoadingTime = 800
}: IUseLazyLoadingProps = {}): IUseLazyLoadingResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    // Start the delay timer
    const delayTimeout = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    // Ensure minimum loading time
    const minLoadTimeout = setTimeout(
      () => {
        setIsContentReady(true);
      },
      Math.max(delay, minLoadingTime)
    );

    return () => {
      clearTimeout(delayTimeout);
      clearTimeout(minLoadTimeout);
    };
  }, [delay, minLoadingTime]);

  return {
    isLoading: isLoading && !isContentReady,
    showContent: isContentReady
  };
};

export default useLazyLoading;
