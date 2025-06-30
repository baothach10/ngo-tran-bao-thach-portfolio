import { useLocation, Outlet } from "react-router-dom";

import PageWrapper from "../animation/PageWrapper";

import Footer from "./footer/Footer";
import Header from "./header/Header";


const Layout: React.FC = () => {
    const location = useLocation();

    return (
        <>
            <Header />
            <PageWrapper key={location.pathname}>
                <Outlet />
            </PageWrapper>
            <Footer />
        </>
    );
};

export default Layout;
