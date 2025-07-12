import './ContactMeButton.css';

const ContactMeButton = () => {
    return (
        <div id="contact-me-wrapper">

            <a className="contact-me-btn" target='_blank' href="https://www.upwork.com/freelancers/~01f0eb39f3a608ad31?viewMode=1">
                <span className="contact-me-text">Contact Me</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.66669 11.3334L11.3334 4.66669" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.66669 4.66669H11.3334V11.3334" stroke="white" strokeWidth="1.33333" strokeLinecap="round" /></svg>
            </a>

        </div>
    );
};

export default ContactMeButton;