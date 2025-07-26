import './TechnologyCarousel.css'
// Import Swiper React components
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/autoplay';
import 'swiper/css';
import { AdobeIcon } from '../Items/AdobeIcon';
import { AwsIcon } from '../Items/AwsIcon';
import { BlenderIcon } from '../Items/BlenderIcon';
import { FigmaIcon } from '../Items/FigmaIcon';
import { MySqlIcon } from '../Items/MySqlIcon';
import { NextIcon } from '../Items/NextIcon';
import { NuxtIcon } from '../Items/NuxtIcon';
import { PhaserIcon } from '../Items/PhaserIcon';
import { ReactIcon } from '../Items/ReactIcon';
import { ScssIcon } from '../Items/ScssIcon';
import { TailwindIcon } from '../Items/TailwindIcon';
import { ThreeIcon } from '../Items/ThreeIcon';
import { TypescriptIcon } from '../Items/TypescriptIcon';
import { ViteIcon } from '../Items/ViteIcon';
import { VueIcon } from '../Items/VueIcon';
import { WebpackIcon } from '../Items/WebpackIcon';
import { TechnologyItem } from '../TechnologyItem/TechnologyItem';

import { isMobileDevice } from '@/utils';

export const TechnologyCarousel = () => {

    const iconSize = isMobileDevice() ? 40 : 60; // Adjust icon size based on device type
    const slidesPerView = isMobileDevice() ? document.documentElement.clientWidth < 768 ? 4 : 6 : 10;
    return (
        <div className="carousel-container">
            <Swiper
                loop={true}
                autoplay={{
                    delay: 0,              // No delay between transitions
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                }}
                speed={2000}          // Controls the smoothness (higher = smoother)
                allowTouchMove={true}     // Optional: false if you don’t want user interaction
                grabCursor={true}

                slidesPerView={slidesPerView}
                modules={[Autoplay]}
            >
                <SwiperSlide><TechnologyItem name='TypeScript'><TypescriptIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='ReactJS'><ReactIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='NextJS'><NextIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='TailwindCSS'><TailwindIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='Scss'><ScssIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='ThreeJS'><ThreeIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='Vite'><ViteIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='Webpack'><WebpackIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='AWS Services'><AwsIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='MySQL'><MySqlIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='VueJS'><VueIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='NuxtJS'><NuxtIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='PhaserJS'><PhaserIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='Figma'><FigmaIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='Adobe Xd'><AdobeIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
                <SwiperSlide><TechnologyItem name='Blender'><BlenderIcon width={iconSize} height={iconSize} /></TechnologyItem></SwiperSlide>
            </Swiper>
        </div >
    );
};