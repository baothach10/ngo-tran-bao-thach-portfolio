import { useCallback, useEffect, useRef } from 'react';
import { useLocation, Outlet } from 'react-router-dom';

import PageWrapper from '../animation/PageWrapper';
import CursorWrapper from '../CursorWrapper/CursorWrapper';

import CVDownloadTab from './CVDownloadTab/CVDownloadTab';
import Footer from './footer/Footer';
import Header from './header/Header';
import ScrollToTopButton from './ScrollToTopButton/ScrollToTopButton';

import './Layout.css';
import { useHeaderScroll } from '@/context/HeaderShownByScrollContext';
import { isMobileDevice } from '@/utils';

const Layout: React.FC = () => {
  const location = useLocation();

  const { setIsShownByScroll, isShownByScroll } = useHeaderScroll();
  const lastScrollY = useRef(0);

  // Get the base path for PageWrapper key, excluding modal routes
  const getBasePathForPageWrapper = (pathname: string) => {
    if (
      pathname.includes('/work-highlights/projects/') ||
      pathname.includes('/work-highlights/positions/')
    ) {
      return '/work-highlights';
    }
    if (
      pathname.includes('/achievements/certificates/') ||
      pathname.includes('/achievements/awards/')
    ) {
      return '/achievements';
    }
    return pathname;
  };

  const pageWrapperKey = getBasePathForPageWrapper(location.pathname);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY > lastScrollY.current) {
      setIsShownByScroll(true);
    } else if (currentScrollY <= lastScrollY.current) {
      setIsShownByScroll(false);
    }

    lastScrollY.current = currentScrollY;
  }, [isShownByScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="layout-container">
      {!isMobileDevice() && <CursorWrapper cubeSpeed={0.1} />}
      <div className="layout-wrapper">
        <Header />
        <PageWrapper key={pageWrapperKey}>
          <Outlet />
        </PageWrapper>
        {location.pathname != '/' && <Footer />}
      </div>
      <ScrollToTopButton />
      <CVDownloadTab />
    </div>
  );
};

export default Layout;

