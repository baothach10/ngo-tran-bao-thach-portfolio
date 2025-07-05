// src/components/Header.tsx
import { Link, useLocation } from 'react-router-dom';

import './Header.css';
import WebLogo from '@/components/logo/WebLogo';

export default function Header() {
    const location = useLocation();

    return (
        <header className="site-header">
            <nav className="nav">
                <div className="logo">
                    <Link to="/"><WebLogo fillColor='black' strokeColor='black' shadowColor='white' /></Link>
                </div>
                <ul className="nav-links">
                    <li className={location.pathname === '/about-me' ? 'active' : ''}>
                        <Link to="/about-me">About</Link>
                    </li>
                    <li className={location.pathname === '/projects' ? 'active' : ''}>
                        <Link to="/projects">Projects</Link>
                    </li>
                    <li className={location.pathname === '/honors-and-awards' ? 'active' : ''}>
                        <Link to="/honors-and-awards">Awards</Link>
                    </li>
                    <li className={location.pathname === '/contact-me' ? 'active' : ''}>
                        <Link to="/contact-me">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
