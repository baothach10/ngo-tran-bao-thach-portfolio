import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import './SectionTitle.css';

type TSectionTitle = {
    content: string
}

export const SectionTitle = ({ content }: TSectionTitle) => {
    const titleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                }
            );
        }
    }, [])
    return (
        <div className="section-title-container" ref={titleRef}>
            <h2 className="section-title-content">{content}</h2>
        </div>
    )
}