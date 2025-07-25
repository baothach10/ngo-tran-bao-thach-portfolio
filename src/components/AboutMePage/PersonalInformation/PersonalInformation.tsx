import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

import AnimatedPersonalImage from '../AnimatedPersonalImage/AnimatedPersonalImage';
import './PersonalInformation.css';

export const PersonalInformation = () => {
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            defaults: { duration: 1.5, ease: 'power3.out' }
        });

        tl.from(imageRef.current, { x: -200, opacity: 0 })
            .from(textRef.current, { x: 200, opacity: 0 }, '<'); // '<' means animate simultaneously
    }, []);

    return (
        <section className="personal-information-section">
            <div className="personal-information-container">

                <div className="personal-information-image" ref={imageRef}>
                    <AnimatedPersonalImage image1={'./assets/images/portrait1.webp'} image2={'./assets/images/portrait2.webp'} width={300} height={300} />
                </div>


                <div className="personal-information-text" ref={textRef}>
                    <h1>From Code to Insights:<br /><span>Frontend, Playables & AI Developer</span></h1>
                    <p>
                        Hi, I’m <strong>Ngo Tran Bao Thach</strong>, a versatile developer based in Ho Chi Minh City, Vietnam specializing in <strong>frontend development</strong>, <strong>interactive playable ads</strong>, and <strong>AI-driven data insights</strong>.
                        I blend sleek, responsive UI design with engaging ad experiences and intelligent backend
                        systems to create products that look great and deliver measurable impact.
                    </p>
                    <p>
                        Whether I’m building a slick web interface, optimizing a playable ad for conversion,
                        or weaving AI and analytics behind the scenes, I’m driven by one goal: <strong>to transform code
                            into meaningful insights and experiences.</strong>
                    </p>
                </div>
            </div>
        </section>
    )
}