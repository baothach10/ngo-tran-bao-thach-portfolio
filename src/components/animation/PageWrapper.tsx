import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './PageWrapper.css'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        gsap.fromTo(
            el,
            { opacity: 0, y: 0 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
    }, [location.pathname]);

    return (
        <div ref={ref} className="page-wrapper">
            {children}
        </div>
    );
}
