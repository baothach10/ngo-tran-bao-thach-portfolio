import { useCallback, useEffect, useRef } from "react";
import { useLocation, Outlet } from "react-router-dom";

import PageWrapper from "../animation/PageWrapper";

import Footer from "./footer/Footer";
import Header from "./header/Header";
import ScrollToTopButton from "./ScrollToTopButton/ScrollToTopButton";

import './Layout.css';
import { useHeaderScroll } from "@/context/HeaderShownByScrollContext";


const Layout: React.FC = () => {
    const location = useLocation();

    const { setIsShownByScroll, isShownByScroll } = useHeaderScroll()
    const lastScrollY = useRef(0);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.pageYOffset;

        if (currentScrollY > lastScrollY.current) {
            setIsShownByScroll(true)
        } else if (currentScrollY <= lastScrollY.current) {
            setIsShownByScroll(false)
        }

        lastScrollY.current = currentScrollY
    }, [isShownByScroll]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className="layout-container">
            <div className="layout-wrapper">
                <Header />
                <PageWrapper key={location.pathname}>
                    <Outlet />
                </PageWrapper>
                {location.pathname != '/' && <Footer />}
            </div>
            <ScrollToTopButton />
        </div>
    );
};

export default Layout;
