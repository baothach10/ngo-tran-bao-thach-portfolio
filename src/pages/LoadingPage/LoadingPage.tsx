import './LoadingPage.css'
import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';


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
        <div className="loading-page-container" ref={containerRef}>
            <div className="loading-page-wrapper">
                <h1 className='loading-title'>Loading my porfolio!</h1>
                <p className='loading-name'>Ngo Tran Bao Thach - Thomas Ngo</p>
            </div>
        </div>
    )
}


export default LoadingPage;