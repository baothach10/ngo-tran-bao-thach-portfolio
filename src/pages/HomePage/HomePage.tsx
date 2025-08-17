import { Suspense } from 'react';
import { Helmet } from 'react-helmet';

import AuroraBackground from '@/components/backgrounds/AuroraBackground/AuroraBackground';
import BentoGrid, { IBentoCardProps } from '@/components/BentoGrid/BentoGrid';
import TechnologyCarousel from '@/components/Carousel/TechnologyCarousel/TechnologyCarousel';
import HomePageContent from '@/components/HomePage/HomePageContent/HomePageContent';
import RoleIntroduction from '@/components/HomePage/RoleIntroduction/RoleIntroduction';
import BentoGridSkeleton from '@/components/LoadingComponent/BentoGridSkeleton/BentoGridSkeleton';
import HomePageContentSkeleton from '@/components/LoadingComponent/HomePageContentSkeleton/HomePageContentSkeleton';
import LazyThreeScene from '@/components/LoadingComponent/LazyThreeScene/LazyThreeScene';
import { isMobileDevice } from '@/utils';

import './HomePage.css';

const HomePage = () => {
  const cardData: IBentoCardProps[] = [
    {
      description: 'Interact to say hi!',
      title: 'Mini me',
      children: <LazyThreeScene loadingDelay={800} minLoadingTime={1500} />
    },
    {
      color: 'rgba(0, 0, 0, 0.95)',
      title: 'Versatile',
      description: 'Work in various areas',
      label: 'Professional Experience',
      children: <RoleIntroduction />
    },
    {
      color: 'rgba(0, 0, 0, 0.95)',
      title: 'Vietnam',
      label: 'Location',
      description: 'Based in Ho Chi Minh City',
      children: (
        <div className="vietnam-icon-container">
          <img src="/assets/images/vietnam.svg" alt="vietnam flag" />
        </div>
      )
    },
    {
      color: 'rgba(0, 0, 0, 0.95)',
      title: 'Collaboration',
      description: 'Work together seamlessly',
      label: 'Tech Stack',
      children: (
        <TechnologyCarousel
          numberOfItems={
            isMobileDevice() ? (document.documentElement.clientWidth >= 500 ? 4 : 3) : 8
          }
        />
      )
    }
  ];
  return (
    <div className="home-page-container">
      <Helmet>
        <title>Home | Ngo Tran Bao Thach</title>
        <meta name="description" content="Welcome to my portfolio. Explore my work and skills." />
        <link rel="canonical" href="https://ngo-tran-bao-thach.vercel.app" />
        <meta property="og:title" content="Home | Ngo Tran Bao Thach" />
        <meta property="og:description" content="Welcome to my portfolio. Explore my work and skills." />
        <meta property="og:url" content="https://ngo-tran-bao-thach.vercel.ap" />
      </Helmet>
      <div className="squares-background-wrapper">
        <AuroraBackground
          blend={0.5}
          colorStops={[
            '#A0A0A0', // Cloud
            '#B4B4B4', // Mist
            '#C8C8C8', // Light Frost
            '#DCDCDC', // Pale Glow
            '#F0F0F0', // Moonlight
            '#FFFFFF', // Pure White
            '#000000', // Pure Black
            '#0A0A0A', // Near-Black
            '#141414', // Heavy Charcoal
            '#1E1E1E', // Dark Graphite
            '#282828', // Smoky Gray
            '#323232', // Storm Gray
            '#3C3C3C', // Steel
            '#464646', // Industrial Gray
            '#505050', // Medium Gray
            '#5A5A5A', // Pewter
            '#646464', // Silver Shadow
            '#787878', // Ice Metal
            '#8C8C8C', // Frost Gray
            '#A0A0A0', // Cloud
            '#B4B4B4', // Mist
            '#C8C8C8', // Light Frost
            '#DCDCDC', // Pale Glow
            '#F0F0F0', // Moonlight
            '#FFFFFF' // Pure White
          ]}
        />
      </div>
      <div className="home-page-wrapper">
        <div className="home-content-wrapper">
          <Suspense fallback={<HomePageContentSkeleton />}>
            <HomePageContent />
          </Suspense>
        </div>
        <div className="bento-grid-wrapper">
          <Suspense fallback={<BentoGridSkeleton />}>
            <BentoGrid
              cards={cardData}
              enableStars={false}
              enableTilt={false}
              enableMagnetism={false}
              textAutoHide={false}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

