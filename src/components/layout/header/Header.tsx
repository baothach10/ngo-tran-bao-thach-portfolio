import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Header.css';
import WebLogo from '@/components/logo/WebLogo';
import { useHeaderScroll } from '@/context/HeaderShownByScrollContext';
import { isMobileDevice } from '@/utils';

export default function Header() {
  const location = useLocation();
  const { isShownByScroll } = useHeaderScroll();
  const [isMobileMenuBarOpened, setIsMobileMenuBarOpened] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const delayCallRef = useRef<gsap.core.Tween | null>(null);

  const hiddenOnPaths = ['/about-me', '/work-highlights', '/achievements', '/contact-me'];

  useEffect(() => {
    if (!isMobileDevice() || !headerRef.current) return;

    // Clear any existing delayed call
    if (delayCallRef.current) {
      delayCallRef.current.kill();
      delayCallRef.current = null;
    }

    if (isMobileMenuBarOpened) {
      setHasBeenOpened(true);
      headerRef.current.style.height = '100%';
      document.body.style.overflow = 'hidden';
    } else if (hasBeenOpened) {
      document.body.style.overflow = 'scroll';
      // Only apply delay if the menu was actually opened before
      delayCallRef.current = gsap.delayedCall(2, () => {
        if (headerRef.current) {
          headerRef.current.style.height = '0%';
        }
        delayCallRef.current = null;
      });
    } else {
      // If never opened, close immediately
      headerRef.current.style.height = '0%';
    }
  }, [isMobileMenuBarOpened, hasBeenOpened]);

  // Cleanup delayed call on unmount
  useEffect(() => {
    return () => {
      if (delayCallRef.current) {
        delayCallRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    const shouldHideInitially = hiddenOnPaths.includes(location.pathname);
    const header = headerRef.current;

    if (!header) return;

    if (shouldHideInitially) {
      gsap.set(header, { y: '-100%', opacity: 0 });
    } else {
      gsap.set(header, { y: '0%', opacity: 1 });
    }
  }, [location.pathname]);

  useEffect(() => {
    const shouldHideInitially = hiddenOnPaths.includes(location.pathname);
    if (isMobileMenuBarOpened) return;
    if (shouldHideInitially)
      if (isShownByScroll) {
        gsap.to(headerRef.current, {
          y: '0%',
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out'
        });
      } else {
        gsap.to(headerRef.current, {
          y: '-100%',
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out'
        });
      }
  }, [isShownByScroll]);

  return (
    <header className="site-header" ref={headerRef}>
      {isMobileDevice() ? (
        <div className="mobile-site-header">
          <input
            className="menu-icon"
            type="checkbox"
            id="menu-icon"
            name="menu-icon"
            aria-label='Menu Toggle'
            checked={isMobileMenuBarOpened}
            onChange={e => setIsMobileMenuBarOpened(e.target.checked)}
          />
          <label htmlFor="menu-icon" aria-label='Menu'></label>
          <div className="nav-mobile-logo logo">
            <Link to="/" aria-label='Home' onClick={() => setIsMobileMenuBarOpened(false)}>
              <WebLogo fillColor="white" strokeColor="white" shadowColor="black" />
            </Link>
          </div>
          <nav className="nav-mobile">
            <ul className="nav-mobile-links">
              <li className={location.pathname === '/about-me' ? 'active' : ''}>
                <Link to="/about-me" aria-label='About Me' onClick={() => setIsMobileMenuBarOpened(false)}>
                  About
                </Link>
              </li>
              <li className={location.pathname === '/work-highlights' ? 'active' : ''}>
                <Link to="/work-highlights" aria-label='Work Highlights' onClick={() => setIsMobileMenuBarOpened(false)}>
                  Work Highlights
                </Link>
              </li>
              <li className={location.pathname === '/achievements' ? 'active' : ''}>
                <Link to="/achievements" aria-label='Achievements' onClick={() => setIsMobileMenuBarOpened(false)}>
                  Achievements
                </Link>
              </li>
              <li className={location.pathname === '/contact-me' ? 'active' : ''}>
                <Link to="/contact-me" aria-label='Contact Me' onClick={() => setIsMobileMenuBarOpened(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <nav className="nav">
          <div className="logo">
            <Link aria-label='Home' to="/">
              <WebLogo haveHoverEffect fillColor="white" strokeColor="white" shadowColor="black" />
            </Link>
          </div>
          <ul className="nav-links">
            <li className={location.pathname === '/about-me' ? 'active' : ''}>
              <Link aria-label='About Me' to="/about-me">About</Link>
            </li>
            <li className={location.pathname === '/work-highlights' ? 'active' : ''}>
              <Link aria-label='Work Highlights' to="/work-highlights">Work Highlights</Link>
            </li>
            <li className={location.pathname === '/achievements' ? 'active' : ''}>
              <Link aria-label='Achievements' to="/achievements">Achievements</Link>
            </li>
            <li className={location.pathname === '/contact-me' ? 'active' : ''}>
              <Link aria-label='Contact Me' to="/contact-me">Contact</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

