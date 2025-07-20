
import { gsap } from 'gsap';
import React, { useRef, useEffect } from 'react';


import './AnimatedPersonalImage.css'
type TAnimatedPersonalImage = {
    image1: string;
    image2: string;
    width?: number;
    height?: number;
};

const AnimatedPersonalImage: React.FC<TAnimatedPersonalImage> = ({
    image1,
    image2,
    width = 600,
    height = 600,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const slopeRef = useRef<SVGFEFuncAElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el || !slopeRef.current) return;

        const handleMouseEnter = () => {
            gsap.to(slopeRef.current, {
                attr: { slope: 2 },
                duration: 1.5,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(slopeRef.current, {
                attr: { slope: 0 },
                duration: 1.5,
                ease: 'power2.out',
            });
        };

        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            el.removeEventListener('mouseenter', handleMouseEnter);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={containerRef} style={{ width, height }} className='animated-personal-image-container'>
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <defs>
                    <filter id="dissolve-filter" x="0%" y="0%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.022" />
                        <feColorMatrix type="luminanceToAlpha" />
                        <feComponentTransfer>
                            <feFuncA ref={slopeRef} type="linear" slope="0" />
                        </feComponentTransfer>
                        <feComponentTransfer>
                            <feFuncA type="discrete" tableValues="0 1" />
                        </feComponentTransfer>
                        <feGaussianBlur stdDeviation="1" />
                        <feComposite operator="in" in="SourceGraphic" result="overlay" />
                        <feImage
                            xlinkHref={image2}
                            width={width}
                            height={height}
                            result="underlay"
                            preserveAspectRatio="xMidYMid slice"
                        />
                        <feComposite operator="over" in="overlay" in2="underlay" />
                    </filter>
                </defs>

                <image
                    width={width}
                    height={height}
                    x="0"
                    y="0"
                    xlinkHref={image1}
                    filter="url(#dissolve-filter)"
                    preserveAspectRatio="xMidYMid slice"
                />
            </svg>
        </div>
    );
};

export default AnimatedPersonalImage;
