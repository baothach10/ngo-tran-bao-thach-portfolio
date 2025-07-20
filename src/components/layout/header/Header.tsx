import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Header.css';
import WebLogo from '@/components/logo/WebLogo';
import { useHeaderScroll } from '@/context/HeaderShownByScrollContext';
import { isMobileDevice } from '@/utils';

export default function Header() {
    const location = useLocation();
    const { isShownByScroll } = useHeaderScroll()

    const headerRef = useRef<HTMLDivElement>(null);

    const hiddenOnPaths = ["/about-me"];

    useEffect(() => {
        const shouldHideInitially = hiddenOnPaths.includes(location.pathname);
        const header = headerRef.current;

        if (!header) return;

        if (shouldHideInitially) {
            gsap.set(header, { y: "-100%", opacity: 0 });
        } else {
            gsap.set(header, { y: "0%", opacity: 1 });
        }
    }, [location.pathname]);

    useEffect(() => {
        const shouldHideInitially = hiddenOnPaths.includes(location.pathname);
        if (shouldHideInitially)
            if (isShownByScroll) {
                gsap.to(headerRef.current, {
                    y: "0%",
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out",
                });
            } else {
                gsap.to(headerRef.current, {
                    y: "-100%",
                    opacity: 0,
                    duration: 0.5,
                    ease: "power3.out",
                });
            }
    }, [isShownByScroll]);


    return (
        <header className="site-header" ref={headerRef}>
            {isMobileDevice() ? (
                <>
                    <input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon" />
                    <label htmlFor="menu-icon"></label>
                    <div className="nav-mobile-logo">
                        <Link to="/"><WebLogo fillColor='white' strokeColor='white' shadowColor='black' /></Link>
                    </div >
                    <nav className="nav-mobile">
                        <ul className="nav-mobile-links">
                            <li className={location.pathname === '/about-me' ? 'active' : ''}>
                                <Link to="/about-me">About</Link>
                            </li>
                            <li className={location.pathname === '/projects' ? 'active' : ''}>
                                <Link to="/projects">Projects</Link>
                            </li>
                            <li className={location.pathname === '/honors-and-awards' ? 'active' : ''}>
                                <Link to="/honors-and-awards">Certificates & Awards</Link>
                            </li>
                            <li className={location.pathname === '/contact-me' ? 'active' : ''}>
                                <Link to="/contact-me">Contact</Link>
                            </li>
                        </ul>
                    </nav>

                </>
            ) :
                (
                    <nav className="nav">
                        <div className="logo">
                            <Link to="/"><WebLogo fillColor='white' strokeColor='white' shadowColor='black' /></Link>
                        </div >
                        <ul className="nav-links">
                            <li className={location.pathname === '/about-me' ? 'active' : ''}>
                                <Link to="/about-me">About</Link>
                            </li>
                            <li className={location.pathname === '/projects' ? 'active' : ''}>
                                <Link to="/projects">Projects</Link>
                            </li>
                            <li className={location.pathname === '/honors-and-awards' ? 'active' : ''}>
                                <Link to="/honors-and-awards">Certificates & Awards</Link>
                            </li>
                            <li className={location.pathname === '/contact-me' ? 'active' : ''}>
                                <Link to="/contact-me">Contact</Link>
                            </li>
                        </ul>
                    </nav >

                )

            }
        </header >
    );
}
