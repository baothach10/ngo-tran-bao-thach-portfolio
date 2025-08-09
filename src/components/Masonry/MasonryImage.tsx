import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const MasonryImage = ({ imgSrc, colorShiftOnHover, width, height }: { imgSrc: string; width: number; height: number; colorShiftOnHover?: boolean }) => {

    const containerRef = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        const observer = new MutationObserver(() => {
            if (containerRef.current) {
                observer.disconnect();
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: 'top 95%',
                    end: 'bottom 5%',
                    toggleActions: 'play reverse play reverse',
                    animation: gsap.from(containerRef.current, {
                        y: 100,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power3.out'
                    })
                });
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }, []);

    return (
        <div
            className="item-img-container"
            ref={containerRef}
        >
            <img loading="lazy" className="item-img" src={imgSrc} alt="image" width={width} height={height} />
            {colorShiftOnHover && (
                <div
                    className="color-overlay"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        width: "100%",
                        height: "100%",
                        background:
                            "linear-gradient(45deg, rgba(255,255,255,0.8), rgba(0,0,0,0.8))",
                        opacity: 0,
                        pointerEvents: "none",
                        borderRadius: "8px",
                    }}
                />
            )}
        </div>
    )
}

export default MasonryImage;