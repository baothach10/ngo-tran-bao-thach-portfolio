import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { Chrono } from 'react-chrono';

import { SectionTitle } from '@/components/layout/SectionTitle/SectionTitle';
import './Education.css';
import { isMobileDevice } from '@/utils';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const items = [
    {
      title: 'June 2021',
      cardTitle: 'Highschool Graduation',
      cardSubtitle: 'Graduated from Luong The Vinh High School with top-class performance.',
      cardDetailedText:
        'I proudly graduated from Luong The Vinh High School with a GPA of <strong>9.6/10</strong>, reflecting <strong>top-tier academic performance</strong>. Throughout my high school years, I consistently maintained excellent grades while actively participating in a range of extracurricular activities, including science competitions, sports, and other enrichment programs—demonstrating a well-rounded commitment to both academic and personal growth.',
      media: {
        type: 'IMAGE',
        source: {
          url: './assets/images/ltv.webp'
        }
      }
    },
    {
      title: 'October 2021',
      cardTitle: 'Embark On The Tech Journey',
      cardSubtitle:
        'Chose to pursue a Bachelor of Information Technology at RMIT University Vietnam.',
      cardDetailedText:
        'I pursued a Bachelor of Information Technology at RMIT University Vietnam, where I am expanding my expertise in <strong>software development, data analytics, and artificial intelligence</strong>. The program’s hands-on, industry-focused curriculum is equipping me with the technical skills and problem-solving mindset needed to thrive in fast-evolving tech environments. At RMIT, I am actively engaging in collaborative projects, real-world simulations, and cutting-edge coursework that aligns with my passion for frontend development, AI integration, and scalable digital solutions.',
      media: {
        type: 'IMAGE',
        source: {
          url: './assets/images/rmit.webp'
        }
      }
    },
    {
      title: 'December 2022',
      cardTitle: 'Dual Focus: Business & Technology',
      cardSubtitle:
        'Explored the business side of tech to become a more versatile and impactful developer.',
      cardDetailedText:
        'I have enrolled in the Diploma of Business and Sales Management through remote learning at Kingston College, Singapore. The program has equipped me with foundational knowledge in <strong>marketing, logistics, business management, and sales strategy</strong>. Studying remotely has strengthened my self-discipline and adaptability while deepening my understanding of how businesses operate, engage customers, and drive growth—complementing my technical expertise with a strong commercial perspective.',
      media: {
        type: 'IMAGE',
        source: {
          url: './assets/images/kingston.webp'
        }
      }
    },
    {
      title: 'July 2023',
      cardTitle: 'Cross-Campus Exchange – RMIT Vietnam to RMIT Melbourne',
      cardSubtitle:
        'Gained cross-cultural experience while advancing my technical skills and academic knowledge at RMIT Melbourne.',
      cardDetailedText:
        'I focused on advanced courses in Artificial Intelligence, Data Analytics, and Blockchain Technology to deepen my expertise in emerging digital systems. The experience broadened my technical perspective and exposed me to globally relevant tools and practices. I successfully completed the semester with a GPA of <strong>3.8/4.0</strong>, reflecting strong academic performance in a rigorous, innovation-driven environment.',
      media: {
        type: 'IMAGE',
        source: {
          url: './assets/images/rmit_mel.webp'
        }
      }
    },
    {
      title: 'December 2023',
      cardTitle: 'Strategic Business Skills Certified',
      cardSubtitle:
        'Gained practical knowledge in marketing, logistics, and sales strategy through remote study at Kingston College, Singapore.',
      cardDetailedText:
        'I successfully completed the Diploma in Business and Sales Management with a GPA of <strong>3.9/4.0</strong>, earning recognition as <strong>one of the valedictorians of my cohort</strong>. The program provided in-depth training in marketing, logistics, business operations, and sales strategy, sharpening my commercial awareness and strategic thinking. Studying remotely cultivated a strong sense of self-motivation and adaptability, while equipping me with business skills that perfectly complement my background in technology and development.',
      media: {
        type: 'IMAGE',
        source: {
          url: './assets/images/kingston_grad.webp'
        }
      }
    },
    {
      title: 'April 2025',
      cardTitle: 'Bachelor of Information Technology – Class of 2025',
      cardSubtitle:
        'Completed at RMIT Vietnam with a focus on frontend development, AI integration, and data analytics',
      cardDetailedText:
        'I graduated with a GPA of <strong>3.7/4.0</strong>, placing in the <strong>top 5% on the RMIT Scholar’s List for Academic Excellence</strong>. Throughout the program, I gained hands-on experience in modern web technologies, AI-powered systems, and data-driven application design. My studies combined practical development work with theoretical insight, preparing me to build scalable, high-performance solutions across a range of tech environments. This academic foundation continues to shape my approach to intelligent, user-centric software development.',
      media: {
        type: 'IMAGE',
        source: {
          url: './assets/images/rmit.webp'
        }
      }
    }
  ];

  const customDarkTheme = {
    primary: 'white',
    secondary: '#000000',
    cardTitleColor: '#000000'
  };

  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!timelineRef.current) return;

    const observer = new MutationObserver(() => {
      const leftCards = timelineRef.current!.querySelectorAll('.card-content-wrapper.left .custom-card');
      const rightCards = timelineRef.current!.querySelectorAll('.card-content-wrapper.right .custom-card');
      const timelineItems = timelineRef.current!.querySelectorAll('.timeline-item-title');

      if (leftCards.length && rightCards.length) {

        observer.disconnect();

        leftCards.forEach((card) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 95%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
            animation: gsap.from(card, { x: -100, opacity: 0, duration: 1, ease: 'power3.out' })
          });
        });

        rightCards.forEach((card) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 95%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
            animation: gsap.from(card, { x: 100, opacity: 0, duration: 1, ease: 'power3.out' })
          });
        });

        timelineItems.forEach((item) => {
          ScrollTrigger.create({
            trigger: item,
            start: 'top 95%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
            animation: gsap.from(item, { opacity: 0, y: 100, duration: 1, ease: 'power3.out' })
          });
        });
      }
    });

    observer.observe(timelineRef.current, { childList: true, subtree: true });
  }, []);

  return (
    <section className="education-section-container">
      <div className="education-section-title">
        <SectionTitle content="Education" />
      </div>

      <div className="education-section-content" ref={timelineRef}>
        <Chrono
          items={items}
          theme={customDarkTheme}
          semanticTags={{
            cardTitle: 'h3',
            cardSubtitle: 'h4'
          }}
          classNames={{
            card: 'custom-card',
            cardMedia: 'card-media',
            cardSubTitle: 'card-subtitle',
            cardText: 'card-text',
            cardTitle: 'card-title',
            title: 'timeline-title',

          }}
          cardWidth={isMobileDevice() ? 300 : 400}
          parseDetailsAsHTML
          disableToolbar
          useReadMore
          contentDetailsHeight={50}
          mode="VERTICAL_ALTERNATING"
        >
        </Chrono>
      </div>
    </section>
  );
};

export default Education;

