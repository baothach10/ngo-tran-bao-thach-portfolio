import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Header.css';
import WebLogo from '@/components/logo/WebLogo';
import { useHeaderScroll } from '@/context/HeaderShownByScrollContext';
import { isMobileDevice } from '@/utils';

export default function Header() {
    const location = useLocation();
    const { isShownByScroll } = useHeaderScroll()
    const [isMobileMenuBarOpened, setIsMobileMenuBarOpened] = useState(false)

    const headerRef = useRef<HTMLDivElement>(null);

    const hiddenOnPaths = ["/about-me"];

    useEffect(() => {
        if (!isMobileDevice() || !headerRef.current) return
        if (isMobileMenuBarOpened) {
            headerRef.current.style.height = '100%'
        } else {
            gsap.delayedCall(2, () => {
                headerRef.current!.style.height = '0%'
            })
        }
    }, [isMobileMenuBarOpened]);

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
                <div className='mobile-site-header'>
                    <input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon" checked={isMobileMenuBarOpened} onChange={(e) => setIsMobileMenuBarOpened(e.target.checked)} />
                    <label htmlFor="menu-icon" ></label>
                    <div className="nav-mobile-logo">
                        <Link to="/" onClick={() => setIsMobileMenuBarOpened(false)}><WebLogo fillColor='white' strokeColor='white' shadowColor='black' /></Link>
                    </div >
                    <nav className="nav-mobile">
                        <ul className="nav-mobile-links">
                            <li className={location.pathname === '/about-me' ? 'active' : ''} >
                                <Link to="/about-me" onClick={() => setIsMobileMenuBarOpened(false)}>About</Link>
                            </li>
                            <li className={location.pathname === '/projects' ? 'active' : ''} >
                                <Link to="/projects" onClick={() => setIsMobileMenuBarOpened(false)}>Projects</Link>
                            </li>
                            <li className={location.pathname === '/honors-and-awards' ? 'active' : ''}>
                                <Link to="/honors-and-awards" onClick={() => setIsMobileMenuBarOpened(false)} >Certificates & Awards</Link>
                            </li>
                            <li className={location.pathname === '/contact-me' ? 'active' : ''}>
                                <Link to="/contact-me" onClick={() => setIsMobileMenuBarOpened(false)}>Contact</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

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
