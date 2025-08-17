import './LoadingPage.css'
import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';


const LoadingPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 0 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section className="loading-page-container" ref={containerRef}>
            <Helmet>
                <title>Loading | Ngo Tran Bao Thach</title>
                <meta name="description" content="Loading my portfolio, please wait..." />
                <meta property="og:title" content="Loading | Ngo Tran Bao Thach" />
                <meta property="og:description" content="Loading my portfolio, please wait..." />
            </Helmet>
            <div className="loading-page-wrapper">
                <h1 className='loading-title'>Loading my porfolio!</h1>
                <p className='loading-name'>Ngo Tran Bao Thach - Thomas Ngo</p>
            </div>
        </section>
    )
}


export default LoadingPage;