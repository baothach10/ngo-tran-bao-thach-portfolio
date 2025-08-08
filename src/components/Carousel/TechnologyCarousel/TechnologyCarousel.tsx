import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import './TechnologyCarousel.css';
// Import Swiper React components
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/autoplay';
import 'swiper/css';
import { AdobeIcon } from '../../svgIcons/AdobeIcon';
import { AwsIcon } from '../../svgIcons/AwsIcon';
import { BlenderIcon } from '../../svgIcons/BlenderIcon';
import { FigmaIcon } from '../../svgIcons/FigmaIcon';
import { MySqlIcon } from '../../svgIcons/MySqlIcon';
import { NextIcon } from '../../svgIcons/NextIcon';
import { NuxtIcon } from '../../svgIcons/NuxtIcon';
import { PhaserIcon } from '../../svgIcons/PhaserIcon';
import { ReactIcon } from '../../svgIcons/ReactIcon';
import { ScssIcon } from '../../svgIcons/ScssIcon';
import { TailwindIcon } from '../../svgIcons/TailwindIcon';
import { ThreeIcon } from '../../svgIcons/ThreeIcon';
import { TypescriptIcon } from '../../svgIcons/TypescriptIcon';
import { ViteIcon } from '../../svgIcons/ViteIcon';
import { VueIcon } from '../../svgIcons/VueIcon';
import { WebpackIcon } from '../../svgIcons/WebpackIcon';
import { TechnologyItem } from '../TechnologyItem/TechnologyItem';

import { isMobileDevice } from '@/utils';

const TechnologyCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const iconSize = isMobileDevice() ? 40 : 60; // Adjust icon size based on device type
  const slidesPerView = isMobileDevice()
    ? document.documentElement.clientWidth < 768
      ? 4
      : 6
    : 10;

  useEffect(() => {
    if (!carouselRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        carouselRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }, carouselRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="carousel-container" ref={carouselRef}>
      <Swiper
        loop={true}
        autoplay={{
          delay: 0, // No delay between transitions
          disableOnInteraction: false,
          pauseOnMouseEnter: false
        }}
        speed={2000} // Controls the smoothness (higher = smoother)
        allowTouchMove={true} // Optional: false if you don’t want user interaction
        grabCursor={true}
        slidesPerView={slidesPerView}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <TechnologyItem name="TypeScript">
            <TypescriptIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="ReactJS">
            <ReactIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="NextJS">
            <NextIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="TailwindCSS">
            <TailwindIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="Scss">
            <ScssIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="ThreeJS">
            <ThreeIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="Vite">
            <ViteIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="Webpack">
            <WebpackIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="AWS Services">
            <AwsIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="MySQL">
            <MySqlIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="VueJS">
            <VueIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="NuxtJS">
            <NuxtIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="PhaserJS">
            <PhaserIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="Figma">
            <FigmaIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="Adobe Xd">
            <AdobeIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
        <SwiperSlide>
          <TechnologyItem name="Blender">
            <BlenderIcon width={iconSize} height={iconSize} />
          </TechnologyItem>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default TechnologyCarousel;

