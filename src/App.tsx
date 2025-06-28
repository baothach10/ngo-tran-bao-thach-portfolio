import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageWrapper from './components/animation/PageWrapper';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';


const AboutMePage = lazy(() => import('./pages/AboutMePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const HonorsAndAwardsPage = lazy(() => import('./pages/HonorsAndAwardsPage'));
const ContactMePage = lazy(() => import('./pages/ContactMePage'));


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div className="loading">Loading portfolio...</div>}>
                <Routes>
                    <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
                    <Route path="/about-me" element={<PageWrapper><AboutMePage /></PageWrapper>} />
                    <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
                    <Route path="/honors-and-awards" element={<PageWrapper><HonorsAndAwardsPage /></PageWrapper>} />
                    <Route path="/contact-me" element={<PageWrapper><ContactMePage /></PageWrapper>} />
                    <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;