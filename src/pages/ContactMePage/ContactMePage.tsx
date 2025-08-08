import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

import LightRayBackground from '@/components/backgrounds/LightRayBackground/LightRayBackground';
import LazyOnScroll from '@/components/layout/LazyOnScroll';
import './ContactMePage.css';
import ConnectLogo from '@/components/pages/ContactMePage/ConnectLogo/ConnectLogo';
import ContactMeForm from '@/components/pages/ContactMePage/ContactMeForm/ContactMeForm';
import { isMobileDevice } from '@/utils';

// const LazyTesting = React.lazy(() => import('@/components/Testing/Testing'));

const ContactMePage: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(backgroundRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(formRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.5 });
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, delay: 1 }
    );
  }, [])
  return (
    <section className="contact-me-page-container">
      <div className="contact-me-page-background-container" ref={backgroundRef}>
        <LightRayBackground
          fadeDistance={isMobileDevice() ? 2 : 0.5}
          lightSpread={isMobileDevice() ? 1 : 2}
          rayLength={isMobileDevice() ? 3 : 1.5}
        />
      </div>
      <div className="contact-me-page-title" ref={titleRef}>
        <ConnectLogo className='connect-logo' />
      </div>
      <div className="contact-me-page-content" ref={formRef}>
        <ContactMeForm />
      </div>
    </section>
  );
};
export default ContactMePage;

