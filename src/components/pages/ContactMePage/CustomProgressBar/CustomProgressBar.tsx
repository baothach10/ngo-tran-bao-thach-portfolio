import React, { useEffect, useRef } from 'react';

type TCustomProgressBarProps = {
    isPaused: boolean;
    onAnimationEnd: () => void;
    duration?: number;
};

const CustomProgressBar: React.FC<TCustomProgressBarProps> = ({ duration = 5000, isPaused, onAnimationEnd }) => {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let animationFrame: number;
        let start: number | null = null;
        let progress = 0;

        const step = (timestamp: number) => {
            if (start === null) start = timestamp;
            const elapsed = timestamp - start;

            if (!isPaused) {
                progress = Math.min((elapsed / duration) * 100, 100);
                if (barRef.current) {
                    barRef.current.style.width = `${progress}%`;
                }
            }

            if (progress < 100) {
                animationFrame = requestAnimationFrame(step);
            } else {
                onAnimationEnd();
            }
        };

        animationFrame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrame);
    }, [isPaused]);

    return (
        <div style={{
            height: '4px',
            background: '#ddd',
            width: '100%',
            marginTop: '8px',
            overflow: 'hidden',
            borderRadius: '2px',
        }}>
            <div
                ref={barRef}
                style={{
                    height: '100%',
                    background: '#222222',
                    width: '0%',
                    transition: isPaused ? 'none' : 'width 0.1s linear',
                }}
            />
        </div>
    );
};

export default CustomProgressBar;