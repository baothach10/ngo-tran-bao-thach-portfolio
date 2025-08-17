import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import './Masonry.css';
import MasonryImage from "./MasonryImage";

import { isMobileDevice } from "@/utils";

gsap.registerPlugin(ScrollTrigger);

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
        const resizeObserver = new ResizeObserver(([entry]) => {
            const { width, height } = entry!.contentRect;
            setSize({ width, height });
        });
        resizeObserver.observe(ref.current);
        return () => resizeObserver.disconnect();
    }, []);

    return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<{ src: string; width: number; height: number }[]> => {
    return Promise.all(
        urls.map(
            (src) =>
                new Promise<{ src: string; width: number; height: number }>((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve({ src, width: img.naturalWidth, height: img.naturalHeight });
                    img.onerror = () => resolve({ src, width: 0, height: 0 }); // Fallback
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
    const [imageData, setImageData] = useState<{ src: string; width: number; height: number }[]>([]);

    useEffect(() => {
        preloadImages(items.map((i) => i.img)).then((data) => {
            setImageData(data);
            setImagesReady(true);
        }).catch((e) => console.log(e));
    }, [items]);

    const { gridItems, maxHeight } = useMemo(() => {
        if (!width || !imageData.length) return { gridItems: [], maxHeight: 0 };

        const colHeights = new Array<number>(columns).fill(0);
        const columnWidth = width / columns;

        const gridItems = items.map((child, index) => {
            const { width: imgWidth, height: imgHeight } = imageData[index] || { width: 0, height: 0 };
            const aspectRatio = imgWidth / imgHeight || 1;
            const height = columnWidth / aspectRatio;
            const col = colHeights.indexOf(Math.min(...colHeights));

            colHeights[col] += height;

            return { ...child, imgWidth, imgHeight };
        });

        const maxHeight = Math.max(...colHeights);

        return { gridItems, maxHeight };
    }, [columns, items, width, imageData]);

    const hasMounted = useRef(false);

    useLayoutEffect(() => {
        if (!imagesReady) return;

        gridItems.forEach((item, index) => {
            const selector = `[data-key="${item.id}"]`;
            const animationProps = {
                // Add logic for animateFrom if needed
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

        // Refresh ScrollTrigger after animations and layout stabilization
        ScrollTrigger.refresh(true);
    }, [gridItems, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

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
        <div
            ref={containerRef}
            className="list"
            style={
                isMobileDevice() ? {
                    maxHeight: `${maxHeight}px`
                } : { minHeight: `${maxHeight}px` }}
        >
            {gridItems.map((item) => (
                <div
                    key={item.id}
                    data-key={item.id}
                    className="item-wrapper"
                    onMouseEnter={(e) => handleMouseEnter(e, item)}
                    onMouseLeave={(e) => handleMouseLeave(e, item)}
                >
                    <MasonryImage
                        imgSrc={item.img}
                        colorShiftOnHover={colorShiftOnHover}
                        width={item.imgWidth}
                        height={item.imgHeight}
                    />
                </div>
            ))}
        </div>
    );
};

export default Masonry;