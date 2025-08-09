import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import { SectionTitle } from '@/components/layout/SectionTitle/SectionTitle';
import './BeyondWork.css';
import Masonry from '@/components/Masonry/Masonry';

gsap.registerPlugin(ScrollTrigger);

const BeyondWork = () => {
  const items = [
    {
      id: '1',
      img: './assets/images/masonry1.webp'
    },
    {
      id: '4',
      img: './assets/images/masonry4.webp'
    },
    {
      id: '6',
      img: './assets/images/masonry21.webp'
    },
    {
      id: '2',
      img: './assets/images/masonry2.webp'
    },
    {
      id: '3',
      img: './assets/images/masonry3.webp'
    },

    {
      id: '5',
      img: './assets/images/masonry19.webp'
    },
    {
      id: '8',
      img: './assets/images/masonry7.webp'
    },
    {
      id: '9',
      img: './assets/images/masonry8.webp'
    },
    {
      id: '10',
      img: './assets/images/masonry9.webp'
    },
    {
      id: '11',
      img: './assets/images/masonry10.webp'
    },
    {
      id: '12',
      img: './assets/images/masonry11.webp'
    },
    {
      id: '13',
      img: './assets/images/masonry12.webp'
    },
    {
      id: '23',
      img: './assets/images/masonry22.webp'
    },
    {
      id: '14',
      img: './assets/images/masonry13.webp'
    },
    {
      id: '15',
      img: './assets/images/masonry14.webp'
    },
    {
      id: '16',
      img: './assets/images/masonry15.webp'
    },
    {
      id: '17',
      img: './assets/images/masonry16.webp'
    },
    {
      id: '18',
      img: './assets/images/masonry17.webp'
    },

    {
      id: '20',
      img: './assets/images/masonry5.webp'
    },
    {
      id: '21',
      img: './assets/images/masonry20.webp'
    },
    {
      id: '22',
      img: './assets/images/masonry6.webp'
    },
    {
      id: '7',
      img: './assets/images/masonry23.webp'
    },
    {
      id: '19',
      img: './assets/images/masonry18.webp'
    }
  ];

  const contentRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;
    const contentParagraphs = contentRef.current.querySelectorAll('.beyond-work__paragraph');

    const observer = new MutationObserver(() => {
      observer.disconnect();

      ScrollTrigger.create({
        trigger: contentParagraphs,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play reverse play reverse',
        animation: gsap.from(contentParagraphs, {
          y: 50,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.2
        })
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }, []);

  return (
    <section className="beyond-work-container">
      <div className="beyond-work-title">
        <SectionTitle content="Beyond Work" />
      </div>
      <div className="beyond-work-content" ref={contentRef}>
        <p className="beyond-work__paragraph">
          When I'm not coding, you'll find me exploring new technologies, mentoring aspiring
          developers and students. I believe in continuous learning and giving back to the community
          that has supported my growth.
        </p>
        <p className="beyond-work__paragraph">
          I'm also passionate about traveling and playing sports like basketball, swimming, going to
          the gym and so on. These activities help me maintain a fresh perspective and bring
          creative energy to my work.
        </p>
        <p className="beyond-work__paragraph">
          My background in both AI and web development gives me a unique perspective on developing
          projects with AI integration. I understand the challenges and opportunities from multiple
          angles, which helps me create solutions that are both beautiful and functional.
        </p>
      </div>
      <div className="masonry-container" ref={masonryRef}>
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="random"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={true}
        />
      </div>
    </section>
  );
};

export default BeyondWork;
