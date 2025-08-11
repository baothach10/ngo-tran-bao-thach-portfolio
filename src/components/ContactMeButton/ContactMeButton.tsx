import { Link } from 'react-router-dom';
import './ContactMeButton.css';

type TContactMeButton = {
    content?: string;
}

const ContactMeButton = ({ content = 'Contact Me' }: TContactMeButton) => {
    return (
        <div id="contact-me-wrapper">

            <Link className="contact-me-btn" to={'/contact-me'} aria-label="Contact Me">
                <span className="contact-me-text">{content}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.66669 11.3334L11.3334 4.66669" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.66669 4.66669H11.3334V11.3334" stroke="white" strokeWidth="1.33333" strokeLinecap="round" /></svg>
            </Link>

        </div>
    );
};

export default ContactMeButton;