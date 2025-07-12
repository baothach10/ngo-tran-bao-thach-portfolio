import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';


const AboutMePage = lazy(() => import('./pages/AboutMePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const HonorsAndAwardsPage = lazy(() => import('./pages/HonorsAndAwardsPage'));
const ContactMePage = lazy(() => import('./pages/ContactMePage'));


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="about-me" element={<AboutMePage />} />
                        <Route path="projects" element={<ProjectsPage />} />
                        <Route path="honors-and-awards" element={<HonorsAndAwardsPage />} />
                        <Route path="contact-me" element={<ContactMePage />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;