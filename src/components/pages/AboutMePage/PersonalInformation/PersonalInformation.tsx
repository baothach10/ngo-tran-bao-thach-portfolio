import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import AnimatedPersonalImage from '../AnimatedPersonalImage/AnimatedPersonalImage';

import './PersonalInformation.css';
import { isMobileDevice } from '@/utils';

gsap.registerPlugin(ScrollTrigger);

const PersonalInformation = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: imageRef.current,
      start: 'top 90%',
      end: 'bottom 10%',

      toggleActions: 'play reverse play reverse',
      animation: gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
    });

    ScrollTrigger.create({
      trigger: textRef.current,
      start: 'top 90%',
      end: 'bottom 10%',

      toggleActions: 'play reverse play reverse',
      animation: gsap.from(textRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
    });
  }, []);

  return (
    <section className="personal-information-section">
      <div className="personal-information-container">
        <div className="personal-information-image" ref={imageRef}>
          <AnimatedPersonalImage
            image1={'./assets/images/portrait1.webp'}
            image2={'./assets/images/portrait2.webp'}
            width={
              isMobileDevice() ? (document.documentElement.clientWidth < 768 ? 200 : 350) : 300
            }
            height={
              isMobileDevice() ? (document.documentElement.clientWidth < 768 ? 200 : 350) : 300
            }
          />
        </div>

        <div className="personal-information-text" ref={textRef}>
          <div className="personal-information-text-wrapper">
            <h2>
              From Code to Insights:
              <br />
              <span>Frontend, Playables & AI Developer</span>
            </h2>
            <p>
              Hi, I’m <strong>Ngo Tran Bao Thach</strong>, a versatile developer based in Ho Chi Minh
              City, Vietnam specializing in <strong>frontend development</strong>,{' '}
              <strong>interactive playable ads</strong>, and <strong>AI-driven data insights</strong>.
              I blend sleek, responsive UI design with engaging ad experiences and intelligent backend
              systems to create products that look great and deliver measurable impact.
            </p>
            <p>
              Whether I’m building a slick web interface, optimizing a playable ad for conversion, or
              weaving AI and analytics behind the scenes, I’m driven by one goal:{' '}
              <strong>to transform code into meaningful insights and experiences.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;

