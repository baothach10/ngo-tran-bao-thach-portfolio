import './Footer.css';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
                <p>
                    Built with <span>React</span>, <span>Three.js</span>, and <span>GSAP</span>
                </p>
            </div>
        </footer>
    );
}
