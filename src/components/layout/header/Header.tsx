import { Link, useLocation } from 'react-router-dom';

import './Header.css';
import WebLogo from '@/components/logo/WebLogo';
import { isMobileDevice } from '@/utils';

export default function Header() {
    const location = useLocation();
    return (
        <header className="site-header">
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
