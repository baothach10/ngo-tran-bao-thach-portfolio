import { useRef } from "react";
import { useLocation, Outlet } from "react-router-dom";

import PageWrapper from "../animation/PageWrapper";

import Footer from "./footer/Footer";
import Header from "./header/Header";

import './Layout.css';
import { useHeaderScroll } from "@/context/HeaderShownByScrollContext";


const Layout: React.FC = () => {
    const location = useLocation();

    const { setIsShownByScroll } = useHeaderScroll()
    const lastScrollY = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="layout-container" ref={containerRef} onScroll={() => {
            if (!containerRef.current) return;
            const currentScrollY = containerRef.current.scrollTop
            if (currentScrollY > lastScrollY.current) {
                setIsShownByScroll(true)
            } else if (currentScrollY <= lastScrollY.current) {
                setIsShownByScroll(false)
            }
            lastScrollY.current = currentScrollY
        }}>
            <div className="layout-wrapper" >
                <Header />
                <PageWrapper key={location.pathname}>
                    <Outlet />
                </PageWrapper>
                {location.pathname != '/' && <Footer />}
            </div>
        </div>
    );
};

export default Layout;
