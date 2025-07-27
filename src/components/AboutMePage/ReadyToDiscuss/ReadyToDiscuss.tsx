import ContactMeButton from '@/components/ContactMeButton/ContactMeButton'
import { SectionTitle } from '@/components/layout/SectionTitle/SectionTitle'
import './ReadyToDiscuss.css'

const ReadyToDiscuss = () => {
    return (
        <section className="ready-to-discuss-container">
            <div className="ready-to-discuss-title">
                <SectionTitle content='Ready To Discuss About Your Project?' />
            </div>
            <div className="ready-to-discuss-content">
                <p>
                    Just send an email to explore how I can help you achieve your digital goals.
                </p>

            </div>
            <div className="contact-button-container">
                <ContactMeButton content='Get in touch' />
            </div>
        </section>
    )
}

export default ReadyToDiscuss