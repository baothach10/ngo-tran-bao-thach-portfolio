
import { gsap } from "gsap";
import React, {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import './Masonry.css';

const useMedia = (
    queries: string[],
    values: number[],
    defaultValue: number
): number => {
    const get = () =>
        values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

    const [value, setValue] = useState<number>(get);

    useEffect(() => {
        const handler = () => setValue(get);
        queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
        return () =>
            queries.forEach((q) =>
                matchMedia(q).removeEventListener("change", handler)
            );
    }, [queries]);

    return value;
};

const useMeasure = <T extends HTMLElement>() => {
    const ref = useRef<T | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);

    return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
    await Promise.all(
        urls.map(
            (src) =>
                new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = img.onerror = () => resolve();
                })
        )
    );
};

type TItem = {
    id: string;
    img: string;
}

type TMasonryProps = {
    items: TItem[];
    ease?: string;
    duration?: number;
    stagger?: number;
    animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
    scaleOnHover?: boolean;
    hoverScale?: number;
    blurToFocus?: boolean;
    colorShiftOnHover?: boolean;
}

const Masonry: React.FC<TMasonryProps> = ({
    items,
    ease = "power3.out",
    duration = 0.6,
    stagger = 0.05,
    animateFrom = "bottom",
    scaleOnHover = true,
    hoverScale = 0.95,
    blurToFocus = true,
    colorShiftOnHover = false,
}) => {
    const columns = useMedia(
        [
            "(min-width:1500px)",
            "(min-width:1000px)",
            "(min-width:600px)",
            "(min-width:400px)",
        ],
        [5, 4, 3, 2],
        1
    );

    const [containerRef, { width }] = useMeasure<HTMLDivElement>();
    const [imagesReady, setImagesReady] = useState(false);

    useEffect(() => {
        preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true)).catch((e) => console.log(e));
    }, [items]);

    const grid = useMemo(() => {
        if (!width) return [];

        const colHeights = new Array<number>(columns).fill(0);
        const columnWidth = width / columns;

        return items.map((child) => {
            const col = colHeights.indexOf(Math.min(...colHeights));
            const x = columnWidth;
            const height = child.height / 2;
            const y = colHeights[col];

            colHeights[col] += height;

            return { ...child, x, y, w: columnWidth, h: height };
        });
    }, [columns, items, width]);

    const hasMounted = useRef(false);

    useLayoutEffect(() => {
        if (!imagesReady) return;

        grid.forEach((item, index) => {
            const selector = `[data-key="${item.id}"]`;
            const animationProps = {
            };

            if (!hasMounted.current) {
                const initialState = {
                    opacity: 0,
                    ...(blurToFocus && { filter: "blur(10px)" }),
                };

                gsap.fromTo(selector, initialState, {
                    opacity: 1,
                    ...animationProps,
                    ...(blurToFocus && { filter: "blur(0px)" }),
                    duration: 0.8,
                    ease: "power3.out",
                    delay: index * stagger,
                });
            } else {
                gsap.to(selector, {
                    ...animationProps,
                    duration: duration,
                    ease: ease,
                    overwrite: "auto",
                });
            }
        });

        hasMounted.current = true;
    }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

    const handleMouseEnter = (e: React.MouseEvent, item: any) => {
        const element = e.currentTarget as HTMLElement;
        const selector = `[data-key="${item.id}"]`;

        if (scaleOnHover) {
            gsap.to(selector, {
                scale: hoverScale,
                duration: 0.3,
                ease: "power2.out"
            });
        }

        if (colorShiftOnHover) {
            const overlay = element.querySelector(".color-overlay") as HTMLElement;
            if (overlay) {
                gsap.to(overlay, {
                    opacity: 0.3,
                    duration: 0.3,
                });
            }
        }
    };

    const handleMouseLeave = (e: React.MouseEvent, item: any) => {
        const element = e.currentTarget as HTMLElement;
        const selector = `[data-key="${item.id}"]`;

        if (scaleOnHover) {
            gsap.to(selector, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }

        if (colorShiftOnHover) {
            const overlay = element.querySelector(".color-overlay") as HTMLElement;
            if (overlay) {
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.3,
                });
            }
        }
    };

    return (
        <div ref={containerRef} className="list">
            {grid.map((item) => {
                return (
                    <div
                        key={item.id}
                        data-key={item.id}
                        className="item-wrapper"
                        onMouseEnter={(e) => handleMouseEnter(e, item)}
                        onMouseLeave={(e) => handleMouseLeave(e, item)}
                    >
                        <div
                            className="item-img-container"
                        >
                            <img loading="lazy" className="item-img" src={item.img} alt="image" />
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
                    </div>
                );
            })}
        </div>
    );
};

export default Masonry;
