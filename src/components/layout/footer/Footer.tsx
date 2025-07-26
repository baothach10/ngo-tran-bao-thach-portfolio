import { Link } from 'react-router-dom';

import ContactMeButton from '@/components/ContactMeButton/ContactMeButton';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-content">

                <div className="upper-footer-section">
                    <div className="footer-column">
                        <h3>Have an big project idea?</h3>
                        <div className='footer-website-information'>
                            <p>Let's transform it to reality.</p>
                            <div className='footer-contact-btn-wrapper'>
                                <ContactMeButton content="Let's talk" />
                            </div>
                        </div>
                    </div>
                    <div className="footer-column">
                        <h3>Services</h3>
                        <ul>
                            <li><span>Web Development</span></li>
                            <li><span>SEO Optimization</span></li>
                            <li><span>AI Integration & Development</span></li>
                            <li><span>Playable Ads & Game Development</span></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Connect</h3>
                        <ul>
                            <li><Link to="mailto:baothach10@gmail.com" target='_blank'>Gmail</Link></li>
                            <li><Link to="https://github.com/baothach10" target='_blank'>GitHub</Link></li>
                            <li><Link to="https://www.upwork.com/freelancers/~01f0eb39f3a608ad31?viewMode=1" target='_blank'>Upwork</Link></li>
                            <li><Link to="https://www.linkedin.com/in/ngotranbaothach/" target='_blank'>LinkedIn</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>More information</h3>
                        <ul>
                            <li><Link to="/work-highlights">Work Highlights</Link></li>
                            <li><Link to="/achievements">Achievements</Link></li>
                            <li><Link to="/contact-me">Contact Me</Link></li>
                            <li><Link to="/about-me">About Me</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-divider"></div>

                <div className="lower-footer-section">
                    <p>&copy; {new Date().getFullYear()} Ngo Tran Bao Thach. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
